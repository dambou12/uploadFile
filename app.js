const express = require('express');  // brins express
const multer = require('multer');  // bring multer whish is primarily used for uploading files and secondly for handling multiplepart/form-data
const ejs = require('ejs');
const path = require('path');

// set storage Engine

const storage = multer.diskStorage({
    destination :'./public/uploads/',
    filename : function(req,file , cb){
        cb(null,file.fieldname + '-' + Date.now() +
        path.extname(file.originalname));
    }
})

// init upload 
const upload =multer({
    storage:storage,
    limits:{fileSize:1000000},
    fileFilter:function (req, file,cb) {
        checkFileType(file,cb);
    }
}).single('myImage');
 
//check File type
function checkFileType(file,cb){
    // allow extension 
    const filetypes = /jpeg|jpg|png|gif/;
    //check extension
    const extname = filetypes.test(path.extname
        (file.originalname).toLocaleLowerCase());
        //check mine
        const mimetype= filetypes.test(file.mimetype);

         if(mimetype && extname){
             return cb(null,true);
            
         }else {
             cb('error:Images only!');
         }
};
//initialize app

const app = express();
//give them a port to diaplay on browser
const port = 3000;
// set EJS
app.set('view engine','ejs');
// public folder
app.use(express.static('./public'));

// post the form or file or information
app.post('/uploads',(req,res)=>{
    upload(req , res, (err) =>{
        if (err){
            res.render('index',{
                msg:err
            });

        }else{
            if(req.file == undefined){
               res.render('index',{
                   msg:'Error: No File selected!'
               });
            }else{
                res.render('index',{
                    msg:'file uploaded!',
                    file:`uploads/${req.file.filename}`
                });
            }
        }
    })
})
// get or display on browser
app.get('/',(req,res)=> res.render('index'));
app.listen(port, ()=>console.log(`server started on port ${port}`));