// import * as express from 'express';
const express = require('express');
// import * as mongoose from 'mongoose';
// const mongoose = require('mongoose');
const fs = require('fs');
const request = require('request');

const router = express.Router();
const User = require('../models/users');
const Post = require('../models/posts');
const Comment = require('../models/comments');
const Productos = require('../models/productos');
const Ultnro = require('../models/ultnro');
const Categorias = require('../config/categorias');




let ultNro = {};
(() => {
  Ultnro.findOne({}, (err, result) => {
    ultNro = result;
  });
})();
function* myIdImg() {
  while (true) {
    ultNro.value += 1;
    ultNro.save();
    yield ultNro.value;
  }
}
const idimg = myIdImg();

//
// FUNCIONES
//
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
  console.log('token',req.cookies.id_token)
  req.generateToken = false;
  if (typeof req.cookies.id_token != 'object') { 
    req.generateToken = true;
    next();
    return;
  }
  User.findOne({ token: (req.cookies.id_token.token_ || 'blank') }, (err, result) => {
    if (!err || result) {
      return res.send({msj:'usted se encuentra logueado'});    
    }
    req.generateToken = true;    
    next();
  });
};


const verificaUsuario = (req, res, next) => {
   console.log('pasa por aca 1')
  User.findOne({ username: req.body.username }, (err, result) => {
    if (err || !result) {
      res.send({error: true, msj: 'Usuario inexistente', registrar: true });
      return;
    }
    req.user = result;
    next();
  });
};

const verificaUserByUsername = (req, res, next) => {
   // console.log('pasa por aca 1')
  User.findOne({ username: req.body.username }, (err, result) => {
    if (err || !result) {
      res.send({error: true, msj: 'Usuario inexistente', registrar: true });
      return;
    }
    req.user = result;
    next();
  });
};

const responseToken = (req,res,next) => {
    res.statusCode = 200;
    const token_ = req.user.token;
    res.cookie('id_token', { token_ , secure: true, expires: new Date(Date.now() + 10), httpOnly: true });  
    next();
};

const autUser = (req, res, next) => {
  if (!req.user.authenticate(req.body.pwd)) {
    res.send({error: true, msj:'contraseña incorrecta'});
  } else {
   if (req.generateToken){
        req.user.token = req.user.generateToken();
        req.user.save((err,result) => {
          if (!err) {
            responseToken(req,res,next);
          }            
        });
    } else {
      responseToken(req,res,next);
    }
  }
};


const newPost = (req, res, next) => {
  Post.create({
      author: req.user._id,
      title:  req.body.title,
      body:  req.body.body,
      date:  req.body.date,
      }, (err, result) => {
        if (!err) {
          req.post = result;
          next();
        }else{
          res.send({error: true, msj:'Error al guardar el post '});
        }
  });
};

const newComment = (req, res, next) => {
  Comment.create({
      author: req.body.user_id,
      body:  req.body.body,
      post:  req.params.postid,
      }, (err, result) => {
        if (!err) {
          req.comment = result;
          next();
        }else{
          res.send({error: true, msj:'Error al guardar el comentario '});
        }
  });
};


router.get('/',  (req, res) => {
  res.send({ error: false, msj:'Welcome to ForumApp'});
});

router.post('/login', verificaToken,verificaUsuario, autUser, (req, res) => {
  res.send(req.user);
});

router.post('/login/registrar', validaExistencia, addUser, (req, res) => {
  console.log('Responde ',req.user)
  res.send(req.user);
});

//  LECTURA DE TODOS LOS POST
router.get('/posts',  (req, res) => {
  User.find({ }).populate('author comments').exec((err, result) => {
    if (err || !result) {
      res.send({ error: true, msj: 'Error al acceder a los posts' });
      return;
    }
      res.send(result);
  });
});

// LECTURA DE LOS POSTS DE UN USUARIO : USERNAME
router.get('/posts/:username',  (req, res) => {
  User.findOne({ username: req.params.username }).populate('posts').exec((err, result) => {
    if (err || !result) {
      res.send({ error: true, msj: 'Error al acceder al los post de => '+req.params.username });
      return;
    }
    res.send(result);
  });
});

//  ALTA DEL POST DEL USUARIO
router.post('/posts/:username', verificaUserByUsername, newPost, (req, res) => {
  res.send(req.post);
});

// ALTA DEL COMENTARIO PARA EL POST Y USER DEL PARAMETRO
router.post('/posts/newcomment/:postId', newComment, (req, res) => {
  res.send(req.comment);
});


module.exports = router;
