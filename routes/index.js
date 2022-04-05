var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/upload', function(req, res, next) {
  res.render('upload', { title: 'Express' });
});

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if(file.mimetype == 'image/jpeg'){
      cb(null, 'upload/');
    }else {
      cb(new Error("Chỉ được Upload File JPG"), false)
    }
  },

  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
var upload = multer({ storage: storage ,
  limits: {
    files: 5,
    fileSize: 2 * 1024 * 1024
},
})
var upload2 = multer({storage: storage ,
  limits: {
    files: 5,
    fileSize: 2 * 1024 * 1024 ,}} ).array('avatar');

router.post("/upload", function(req, res, next){
  upload2(req, res, function (err) {
    if (err) {
      res.send("File tối thiểu 2MB hoặc upload không được quá 5 file hoặc file không phải jpg");
      return;
    }
    else {
      res.send("upload thanh cong");

    }
  })
});


// router.post('/upload', upload.array('avatar'), (req, res) => {
//   res.send("upload thanh cong");
// });


module.exports = router;
