const cpUpload=require("../utils/upload");

const uploadImage=(req,res)=>{
    cpUpload(req,res,(err)=>{
        if(err){
            console.log("失败");
        }else{
            let urlPath="http://localhost:3000/img/"+req.files.booksLogo[0].filename;
            res.json({
                code:200,
                reeMsg:"",
                data:{
                    urlImage:urlPath
                }
            })
        }
    })
}

module.exports ={
    uploadImage
}