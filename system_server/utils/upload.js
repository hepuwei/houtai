//引入上传文件的模块
const multer = require("multer");

//模块的配置项 作用：设置文件的名称以及文件的地址
var storage = multer.diskStorage({
    //设置文件存储路径
    destination: function (req, file, cb) {
      cb(null, './public/img')//本地的存储路径
    },
    //设置文件名称(上传的时间+图片的名称))
    filename: function (req, file, cb) {
      cb(null, Date.now()+"-"+file.originalname)
    }
  })
  
  //使用配置项
  var upload = multer({ storage: storage })

  //配置文件最大能上传几个
  var cpUpload = upload.fields([{ name: 'booksLogo', maxCount: 1 }])//name值要和设置上传文件的第一个字段一样（在js文件中的content中的addBooks中）


  module.exports =cpUpload;