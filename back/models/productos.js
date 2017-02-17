// import * as mongoose from 'mongoose';
const mongoose = require('mongoose');

// import * as categoria from '../config/categorias';
const categoria = require('../config/categorias');

const ObjectId = mongoose.Schema.Types.ObjectId;
const Productos = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagen: { type: String },
  precioLista: { type: Number, min: 0 },
  precioContado: { type: Number, min: 0 },
  categoria: { type: String, enum: categoria.categorias },
  stock: { type: Number, min: 0 },
  botones: { type: [
    { label: { type: String },
      href: { type: String },
      estilo: { type: String } }] },
  user: { type: ObjectId, ref: 'users' },
});

module.exports = mongoose.model('productos', Productos);
