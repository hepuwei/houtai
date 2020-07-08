const jwt =require("jsonwebtoken");
//验证客户端传递到服务端的那个token值是否正确
const secret="1918";
//生成一个token
const sendToken = (tokenInfo)=>{
    //参数1：需要加密的数据;参数2：密钥，和验证时保持一致，参数3：设置过期时间
    return  jwt.sign(tokenInfo,secret,{expiresIn:"10h"});   
}

const tokenVerfiy=(req,res,next)=>{
    //获取token
    let token = req.cookies.token;

    //验证token
    jwt.verify(token,secret,(err,data)=>{
        if(data){
            next();
        }else{
            res.json({
                code:200,
                errMsg:"token验证失败",
                data:{
                    list:[],
                    status:0
                }
            })
        }
    })
}
module.exports={
    sendToken,
    tokenVerfiy
};