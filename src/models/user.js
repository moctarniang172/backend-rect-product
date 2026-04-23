const mongoose = require('mongoose');

const userschema = new mongoose.Schema({nom: String, email: {type: String, unique: true}, password: String, 
resetToken:{
type: String, default: null 
}, 
resetTokenExpiry:{
 type: Date, default: null 

}
,resetCode: {
  type: String
},
resetCodeExpire: {
  type: Date
},
resetAttempts: {
  type: Number,
  default: 0
}});

module.exports = mongoose.model('user', userschema);




