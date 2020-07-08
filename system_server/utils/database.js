const mongoose = require("mongoose");

//定义数据库名称
const db_url = "mongodb://127.0.0.1:27017/reacthome";

mongoose.connect(db_url,{useNewUrlParser: true,useUnifiedTopology: true},(err)=>{
    if(err){
        console.log("请求失败");
    }else{
        console.log("请求成功");
    }
})

module.exports = mongoose;