const express       =   require('express');
const bodyParser    =   require('body-parser');
const mongoose      =   require('mongoose');
const path          =   require('path');
const app           =   express();
const port          =   80;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('http://kutuphanedb-kutuphane.7e14.starter-us-west-2.openshiftapps.com:27017/login');

require('./models/User');
require('./models/Book');

require('./router')(app);

app.listen(port,(err)=>{
    if (err) throw err;
    console.log("Server Calisiyor!!")
});
