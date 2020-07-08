const booksModel = require("../model/books");
const addBooks = async (req, res) => {
    let { booksAuth,
        booksName,
        booksStatus,
        booksPrice,
        booksLogo } = req.body;
    let saveData = await booksModel.booksSave({
        booksAuth,
        booksName,
        booksStatus,
        booksPrice: Number(booksPrice),
        booksLogo
    })
    if (saveData) {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                info: "添加成功",
                status: 1
            }
        })
    } else {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                info: "服务器错误",
                status: 0
            }
        })
    }
}

const booksList = async (req, res) => {
    let { page, limit } = req.query;
    let data = await booksModel.booksFindPage(page, limit);
    if (data.length > 0) {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                list: data,
                status: 1
            }
        })
    } else {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                list: [],
                status: 0
            }
        })
    }
}

const booksModify = async (req, res) => {
    let { booksAuth, booksName, booksStatus, booksPrice, booksLogo, id } = req.body;
    let data = await booksModel.booksUpdate( id,{booksAuth, booksName, booksStatus, booksPrice, booksLogo});
    if(data.ok == 1){
        res.json({
            code:200,
            errMsg:"",
            data:{
                info:"修改成功",
                status:1
            }
        })
    }else{
        res.json({
            code:200,
            errMsg:"",
            data:{
                info:"修改失败",
                status:0
            }
        })
    }
}

const booksDel = async (req,res)=>{
    let {id} = req.query;
    let data = await booksModel.booksDel(id);
    if(data.ok == 1){
        res.json({
            code:200,
            errMsg:"",
            data:{
                info:"删除成功",
                status:1
            }
        })
    }else{
        res.json({
            code:200,
            errMsg:"",
            data:{
                info:"删除失败",
                status:0
            }
        })
    }
}



module.exports = {
    addBooks,
    booksList,
    booksModify,
    booksDel
}
