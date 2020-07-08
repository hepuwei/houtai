const express = require("express");

const router = express.Router();

const booksController = require("../controller/books");
//引用token验证中间件
const authUtils = require("../utils/token");

//添加书籍

router.post("/addBooks",authUtils.tokenVerfiy,booksController.addBooks);

//书籍列表
router.get("/booksList",authUtils.tokenVerfiy,booksController.booksList)

//修改书籍
router.post("/modify",authUtils.tokenVerfiy,booksController.booksModify);

//删除书籍
router.get("/delete",authUtils.tokenVerfiy,booksController.booksDel);
module.exports=router;