// import * as mongoose from 'mongoose';
const mongoose = require('mongoose');

// import * as categoria from '../config/categorias';
const Ultnro = new mongoose.Schema({
  value: { type: Number, required: true, min: 0, default: 0 },
},
  {
    collection: 'ultnro',
  });

module.exports = mongoose.model('ultnro', Ultnro);
