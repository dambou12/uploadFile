const express = require('express');  // brins express
const multer = require('multer');  // bring multer whish is primarily used for uploading files and secondly for handling multiplepart/form-data
const ejs = require('ejs');
const path = require('path');

// set storage Engine

const storage = multer.diskStorage({
    destination :  './public/uploads/',
    filename : function(req, file , cb){
        cb(null,file.fieldname + '-' + Date.now() +
        path.extname(file.originalname));
    }
});

// init upload 
const upload = multer({
    storage:storage
}).single('myImage');

//init app

const app = express();

// set EJS
app.set('view engine','ejs');
// public folder
app.use(express.static('./public'));


// get or display on browser
app.get('/',(req,res)=> res.render('index'));


// post the form or file or information
app.post('/public/upload',(req,res)=>{
    res.send('test');
    
});

//give them a port to diaplay on browser
const port = 3000;
app.listen(port, ()=>console.log(`server started on port ${port}`));