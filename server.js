 var http = require('http');
 var url = require('url');

 var routeTo = require("./myModules/routes.js");
 var express = require('express')
 var multer = require('multer')
 var upload = multer({ dest: 'uploads/' })
 var Watermarker = require("./myModules/watermarker.js");
 var app = express();

 var wmUploads = upload.fields([{ name: 'songFile' }, { name: 'tagFile' }, { name: 'imageFile' }])
 var cvUploads = upload.fields([{ name: 'songFile' }, { name: 'imageFile' }, { name: 'tagFile' }])

 app.use('/assets/javascript', express.static('assets/javascript'))
 app.use('/assets/css', express.static('assets/css'))

 app.get('/', (req, res) => routeTo.routes.home(req, res));

 app.post('/merger', wmUploads, (req, res, next) => {

     let data = {
         songPath: req.files.songFile[0].path,
         tagPath: req.files.tagFile[0].path,
         interval: req.body.interval,
         imagePath: req.files.imageFile[0].path,
         length: req.body.length,
         newName: req.body.newFileName.replace(/ /g, "_")
     }

     Watermarker(data.songPath,
         data.tagPath, data.newName,
         data.interval, data.length,
         returnLink, res, "dont", data.imagePath);

 });

 app.post('/', wmUploads, (req, res, next) => {

     let data = {
         songPath: req.files.songFile[0].path,
         tagPath: req.files.tagFile[0].path,
         interval: req.body.interval,
         imageFile: req.files.imageFile[0].path,
         length: req.body.length,
         newName: req.body.newFileName.replace(/ /g, "_")
     }

     Watermarker(data.songPath,
         data.tagPath, data.newName,
         data.interval, data.length,
         returnLink, res, "do");

 });

 app.listen(3000, () => console.log('Example app listening on port 3000!'))

 let returnLink = (message, exportLink) => {
     if (message !== null || undefined || "" || false) {
         var file = __dirname + '/' + exportLink;
         return file;
     } else {
         return "some error";
     }
 }