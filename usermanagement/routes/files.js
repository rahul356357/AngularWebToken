var express = require('express');
var router = express.Router();

const UserFile = require('../models/userFile');

// route to add a array of files to userfiles collection
router.post('/', function(req, res) {
  const email = req.user;
  let files = req.body.files;
  console.log(files);
  console.log(email);
  files.forEach((file) => file.email = email);
  UserFile.collection.insert(files).
    then(() => {
      res.json({
        success: true
      });
    }).
    catch((err) => {
      res.status('500').
      send({
        success: false,
        message: (err.code === 11000) ? 'File ID must be unique' : err
      });
    });
});

// route to get all the files of a user
router.get('/', function(req, res) {
  UserFile.find({email: req.user})
    .then((files) => {
      res.json({
        success: true,
        files: files
      })
    })
    .catch((err)=>{
      res.status('500').send(err);
    })
});

// route to update the file status
router.put('/', function(req, res) {
  UserFile.findOneAndUpdate({email: req.user,fileid: req.body.fileid},{processed:'processed'},{ new: true }).
    then((file) => {
      res.json({
        success: file ? true: false,
        message: file ? 'Record updated' : 'No such record found'
      })
    }).
    catch((err) => {
      res.status('500').send(err);
    })
});


module.exports = router;
