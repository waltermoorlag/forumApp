// import * as mongoose from 'mongoose';
const mongoose = require('mongoose');
const crypto = require('crypto');
// import * as categoria from '../config/categorias';
// const categoria = require('../config/categorias');
// mongoose.connect('mongodb://localhost/webstore');
var ObjectId=mongoose.Schema.Types.ObjectId;
const User = new mongoose.Schema({
  name: { type: String, required: true },
  username:{ type: String, required: true, unique: true },
  posts:[{ type: ObjectId, ref: "posts"}],
  passwordHash: { type: String },
  passwordSalt: { type: String },
  token: { type: String, default: crypto.randomBytes(8).toString('hex') },
}, {
  collections: 'users',
});


User.methods = {
  authenticate(password) {
    if (!password) return false;
    // console.log(password)
    if (this.encryptPassword(password) === this.passwordHash) return true;
    return false;
  },

  encryptPassword(password) {
    if (!password) return '';
    try {
      return crypto.createHmac('sha256', this.passwordSalt).update(password).digest('hex');
    } catch (err) {
      return err;
    }
  },
  createSalt() {
    try {
      return crypto.randomBytes(8).toString('hex');
    } catch (err) {
      return err;
    }
  },
  generateToken() {
    try {
      return crypto.randomBytes(8).toString('hex');
    } catch (err) {
      return err;
    }
  },

};

User
  .virtual('password')
  .set( function(pass) {
    this.token= this.generateToken();

    this.passwordSalt = this.createSalt();
    this.passwordHash = this.encryptPassword(pass);
    return null;
  });

module.exports = mongoose.model('users', User);
