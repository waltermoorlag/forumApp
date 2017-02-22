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
//
// FUNCIONES
//
router.get('/',  (req, res) => {

  
  console.log(' PASO POR AQUI ')
  // res.send({ msj:'Welcome to ForumApp'});
});



module.exports = router;
