const express = require('express');
const fs = require('fs');
const request = require('request');
const router = express.Router();

const User = require('../models/users');
const Post = require('../models/posts');
//
const verificaUserByUsername = (req, res, next) => {
 console.log('cookies ',req.cookies)
  User.findOne({ username: req.params.username }, (err, result) => {
    if (err || !result) {
      res.send({error: true, msj: 'Usuario inexistente', registrar: true });
      return;
    }
    req.user = result;
    next();
  });
};

const findPostPopulate=(req, res, next)=>{
	Post.findOne({_id: req.idPost}).populate('author comments').exec((err, result)=>{
		if (!err) {
		  req.post=result
	   	  next();	
		}else {
   		  res.send({error: true, msj:'Error al recuperar el post'});
		}
	})

}


const newPost = (req, res, next) => {
  Post.create({
      author: req.user._id,
      title:  req.body.title,
      body:  req.body.body,
      date:  new Date(),
      }, (err, result) => {
        if (!err) {
          req.post = result;
          req.user.posts.push(result._id)
          const idPost=result._id;
          req.user.save((err, result)=>{
             if (!err){
             	req.idPost=idPost;
             	next(); 
              } else {
                res.send({error: true, msj:'Error al guardar el post  en el usuario'});
              }
          });
        }else{
          res.send({error: true, msj:'Error al guardar el post '});
        }
  });
};

const editPost = (req, res, next) => {
	console.log('Edit Post => ',req.body)
   Post.findOneAndUpdate({_id:req.params.postId}, req.body, function (err, result) {
    if (!err){
      req.idPost = result._id;
      next();
    } else {
      res.send({error: true, msj:'Error al actualizar el post '});
    }
  });
};

const removePost = (req, res, next) => {
   Post.remove({_id:req.params.postId}, function (err, result) {
    if (!err){
      req.post = result;
      next();
    } else {
      res.send({error: true, msj:'Error al eliminar el post '});
    }
  });
};

const findPostById = (req, res, next) => {
  Post.findOne({_id: req.params.postId },(err, result) => {
    if (err || !result) {
      res.send({ error: true, msj: 'Error al acceder al post' });
      return;
    }
      req.post=result;
      next();
  });
}
const verificaPermisos = (req, res, next) => {
   console.log(req.user._id.toString())
   console.log(req.post.author.toString())
   if (req.user._id.toString()==req.post.author.toString()){ 
      next();
    }else{
      res.send({ error: true, msj: 'El usuario actual no tiene permisos para eliminar el post' });
      return;
      
    }
}


//  LECTURA DE TODOS LOS POST
router.get('/',  (req, res) => {
 console.log('cookies ',req.cookies)
  Post.find({ }).populate('author comments', null, null, { populate: 'author' }).sort('-date').exec((err, result) => {
    if (err || !result) {
      res.send({ error: true, msj: 'Error al acceder a los posts' });
      return;
    }
      res.send(result);
  });
});

// LECTURA DE LOS POSTS DE UN USUARIO : USERNAME
router.get('/:username',  (req, res) => {
 console.log('cookies ',req.cookies)
  User.findOne({ username: req.params.username }).populate('posts' , null, null, {sort: { date: -1 }}).exec((err, result) => {
    if (err || !result) {
      res.send({ error: true, msj: 'Error al acceder al los post de => '+req.params.username });
      return;
    }
    res.send(result);
  });
});

//  ALTA DEL POST DEL USUARIO
router.post('/:username', verificaUserByUsername, newPost, findPostPopulate,(req, res) => {
  res.send(req.post);
});

router.put('/:postId/:username',verificaUserByUsername, findPostById, verificaPermisos, editPost, findPostPopulate,(req, res) => {
  res.send(req.post);
});

router.delete('/:postId/:username', verificaUserByUsername, findPostById, verificaPermisos, removePost, (req, res) => {
  res.send(req.post);
});



module.exports = router;