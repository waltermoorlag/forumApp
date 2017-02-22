const express = require('express');
const fs = require('fs');
const request = require('request');
const router = express.Router();

const User = require('../models/users');

/* GET users listing. */

const addUser = (req, res, next) => {
  console.log('Tira el add')
  console.log(req.body) 
  User.create({
    // email: req.body.email,
    username: req.body.username,
    name: req.body.name,

    // posts:[]
  }, (err, result) => {
    if (!err) {
      console.log('Tira el pass')
      result.password = req.body.pwd
      result.save( (err, result) => {
        req.user=result;
        next();
      });
    }else{
      console.log(err);
      res.send({error:true, msj:'fallo el alta de usuario', err});

    }

  });
};

const validaExistencia = (req, res, next) => {
  // console.log(req.body)
  if (req.body.pwd !== req.body.pwdrepeat) {
    res.send({error:true, msj:'las password no coinciden',registroOk:false});
  } else {
      console.log('Tira el find')

    User.findOne({ username: req.body.username }, (err, result) => {
      if (err || !result) {
      console.log('Tira el next')

        next();
      } else {
      
        res.send({error:true,msj:'Usuario ya registrado',registroOk:false});
      }
    });
  }
};

const verificaToken = (req, res, next) => {
  console.log('token del verifiar token => ',req.cookies.id_token)
  if (typeof req.cookies.id_token != 'object') { 
    res.send({error: true, msj: 'Usuario no logueado ' });
    // next();
    return;
  }
  User.findOne({ token: (req.cookies.id_token.token_ || 'blank') }, (err, result) => {
    if (!err || result) {
      req.user=result
      next();
    } else {
   	  res.send({error: true, msj: 'Usuario no logueado ' });
	  return;
    }
  });
};


const verificaUsuario = (req, res, next) => {
   console.log('pasa por aca 1')
  User.findOne({ username: req.body.username }, (err, result) => {
    if (err || !result) {
      res.send({error: true, msj: 'Usuario inexistente', registrar: true });
      return;
    } else {
    	req.user = result;
    	next();
    }
  });
};


const responseToken = (req,res,next) => {
    res.statusCode = 200;
    const token_ = req.user.token;
    res.cookie('id_token', { token_ , secure: true, expires: new Date(Date.now() + 10), httpOnly: true });  
    next();
};


const verificaPass = (req, res, next)=>{
  if (!req.user.authenticate(req.body.pwd)) {
    res.send({error: true, msj:'contraseña incorrecta'});
  } else {
  	next();
  }

}
const autUser = (req, res, next) => {
        req.user.token = req.user.generateToken();
        req.user.save((err,result) => {
          if (!err) {
            responseToken(req,res,next);
          }            
        });
};

const logout = (req, res, next) => {
	// var query = {'username':req.body.username};
	req.user.token='--------';
	req.user.save((err, result)=>{
        if (!err) {
        	console.log('result del borrado del token', result);
        	req.user=result;
        	next();
        } else {
		    res.send({error: true, msj:'Error al desloguear'});
        }
	})
}


router.post('/', verificaUsuario,verificaPass, autUser, (req, res) => {
  res.send(req.user);
});

router.post('/registrar', validaExistencia, addUser, (req, res) => {
  console.log('Responde ',req.user)
  res.send(req.user);
});

router.post('/logout', verificaUsuario, logout, (req, res) => {
  console.log('Responde ',req.user)
  res.send(req.user);
});

router.post('/verificauser', verificaToken, (req, res) => {
  console.log('Responde ',req.user)
  res.send(req.user);
});

module.exports = router;
