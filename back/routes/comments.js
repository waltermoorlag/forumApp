const express = require('express');
const fs = require('fs');
const request = require('request');
const router = express.Router();
const User = require('../models/users');
const Post = require('../models/posts');
const Comment = require('../models/comments');
//

const findPostById = (req, res, next) => {
  Post.findById( req.params.postId , (err, result) => {
    if (!err) {
    	req.post= result;
    	next();
    } else {
      res.send({error: true, msj: 'Error al buscar el post para el comentario' });
      return;
    }
  })
}
const findUserByUsername = (req, res, next) => {
	console.log(req.body)
  User.findOne({ username: req.body.author }, (err, result) => {
    if (err || !result) {
      res.send({error: true, msj: 'Usuario inexistente', registrar: true });
      return;
    }
    req.user = result;
    next();
  });
};

const newComment = (req, res, next) => {
  Comment.create({
      author: req.user._id,
      body:  req.body.body,
      }, (err, result) => {
        if (!err) {
          req.comment = result;
          req.post.comments.push(result._id)
          req.post.save((err, result)=>{
            if(!err){
			  Comment.findOne( {_id:req.comment._id} ).populate('author').exec((err, result) => {
			  	if (!err) {
			  		req.comment=result;
			  		console.log(req.comment)
			  		next()
			  	}else{
					res.send({error: true, msj:'Error al obtener nombre del usuario del comentario'});
			  	}
			  })
            } else {
	          res.send({error: true, msj:'Error al guardar el comentario en el post'});
            }
          })	
        }else{
          res.send({error: true, msj:'Error al guardar el comentario '});
        }
  });
};

const editComment = (req, res, next) => {
	console.log('id de comment ',req.params.comentId)
	console.log('body de comment ',req.body)

   Comment.findOneAndUpdate({_id:req.params.comentId}, { body: req.body.body }, function (err, result) {
    if (!err){
	  Comment.findOne( {_id:req.params.comentId } ).populate('author').exec((err, result) => {
	  	if (!err) {
	  		req.comment=result;
	  		console.log(req.comment)
	  		next()
	  	}else{
			res.send({error: true, msj:'Error al obtener nombre del usuario del comentario'});
	  	}
	  })
    } else {
      res.send({error: true, msj:'Error al actualizar comentario '});
    }
  });
};

const removeComment = (req, res, next) => {
   Comment.remove({_id:req.params.comentId}, function (err, result) {
    if (!err){
      req.comment = result;
      next();
    } else {
      res.send({error: true, msj:'Error al eliminar comentario '});
    }
  });
};

// ALTA DEL COMENTARIO PARA EL POST Y USER DEL PARAMETRO
router.post('/:postId',findUserByUsername,findPostById,newComment, (req, res) => {
  res.send(req.comment);
});
router.put('/:comentId', editComment, (req, res) => {
  res.send(req.comment);
});
router.delete('/:comentId', removeComment, (req, res) => {
  res.send(req.comment);
});


module.exports = router;