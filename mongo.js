const mongoose = require('mongoose');
let bcrypt = require('bcrypt');
const User = require('./userInfo/user.js');
let jwt = require('jsonwebtoken');
//const Mailer = require('./mailing.js');

module.exports = class Mongo {
  signup(email, first_name, last_name, password){
    return new Promise((resolve, reject) =>{
      let hashedPassword = bcrypt.hashSync(pass, 8);
      User.create({email, first_name, last_name, password}).then(() =>{
        resolve();
      });
    });
  }

  login(mail, pass){
    const self = this;
    return new Promise((resolve, reject)=>{
      User.findOne({email : mail}, function(err, user){
        if(err) throw err;

        user.comparePassword(pass, function(err, isMatch){
          if(err) throw err;
          console.log('Password:', isMatch);
          let token = self.token(user);
          console.log(token);
          if(isMatch) resolve(token);
          else reject();
        });
      });
    })
  }

  token(user){
    const payload = {
      id: user._id,
      email: user.email
    };
    return jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '10y'
    });
  }

  verifyToken(token){
    return new Promise((resolve, reject) => {
      jwt.verify(token, SECRET_KEY, { version: TOKEN_VERSION }, function(err, decoded) {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  }

}
