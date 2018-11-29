const express = require('express');
const app = express();
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//console.log(''+process.env.NODE_ENV);
//link to .env
if(process.env.NODE_ENV != 'production'){
  require('dotenv').config();
  console.log('did it work');
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public/css'));
app.use('/', routes());


mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true }).then(() => {
  console.log('connected to mongodb');
});
//put this last
app.listen(3000, () => console.log('App listening'));
