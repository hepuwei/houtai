var express = require('express');
var router = express.Router();
const userController= require("../controller/user");


//登录
router.post("/login",userController.userLogin)



//注册
router.post("/register",userController.userRegister)


//获取用户列表
router.get("/userList",userController.userList)

//获取用户信息
router.post("/userInfo",userController.userInfo)

//更新用户信息
router.post("/userUpdate",userController.userUpdate)

module.exports = router;