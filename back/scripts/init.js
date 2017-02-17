let mongoose = require('mongoose');
let Productos = require('../models/productos.js');

mongoose.connect('mongodb://localhost/webstore');

let productos = [
	{
    nombre: 'Mesa antigua',
    descripcion: 'Mesa tallada a mano en el siglo IV',
    imagen: '/images/mesa_antigua' ,
    precioLista: 40000,
    precioContado: 35000,
    categoria: 'Muebles',
  },{
    nombre: 'Banco antiguo',
    descripcion: 'Banco del imperio Otomano',
    imagen: '/images/banco_antigo' ,
    precioLista: 44000,
    precioContado: 39000,
    categoria: 'Muebles',
  },{
    nombre: 'Lavarropa de Dios',
    descripcion: 'Lavarropa que pertenecia a Jesus',
    imagen: '/images/lavarropas' ,
    precioLista: 41500,
    precioContado: 32000,
    categoria: 'Electro',
  },{
    nombre: 'Mysterious thing',
    descripcion: 'Animate a comprarlo, no te vas a arrepentir',
    imagen: '/images/misterious' ,
    precioLista: 4000,
    precioContado: 3500,
    categoria: 'Electro',
  },{
    nombre: 'Pc de escritorio',
    descripcion: 'Especial para codear en God mode',
    imagen: '/images/god_pc' ,
    precioLista: 400,
    precioContado: 350,
    categoria: 'Computacion',
  },{
    nombre: 'Vestido',
    descripcion: 'Vestido semi transparente',
    imagen: '/images/ropa' ,
    precioLista: 4000,
    precioContado: 3999,
    categoria: 'Ropa',
  },{
    nombre: 'Pelota',
    descripcion: 'Pelota de fubol color naranja',
    imagen: '/images/pelota' ,
    precioLista: 400,
    precioContado: 350,
    categoria: 'Deporte',
  },{
    nombre: 'Llanta de aleacion',
    descripcion: 'Llanta de aleacion para auto de rally',
    imagen: '/images/rueda' ,
    precioLista: 2750,
    precioContado: 2750,
    categoria: 'Automotor',
  }
];

Productos.remove({}, function(err){
  Productos.create(productos, function(err, results){
    if(err) console.log(err);
    console.log(results);
  })
})