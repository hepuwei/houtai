//用户的业务逻辑

const userModel = require("../model/user");
//引入token模块
const authUtils = require("../utils/token");
//加密 1：引入加密模块
const crypto = require('crypto');
const userRegister = async (req, res) => {
    let { username, password } = req.body;

    let data = await userModel.userFind({ username });

    if (data) {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                info: "用户名重复",
                status: 2
            }
        })
    } else {
        //加密 2：创建加密算法
        const hash = crypto.createHash('sha256');

        //加密 3：对数据进行加密
        hash.update(password);
        //加密 4：拿到加密后的数据hash.digest('hex')
        //console.log(hash.digest('hex'));

        //用户登陆的状态
        let status = true;
        //用户注册的时间
        let registerTime = new Date().getTime();
        //用户的随机名称
        let name = Math.random().toString(36).substr(2, 8);
        //默认用户头像
        let urlPic = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572356310206&di=27ab46800a7de11636de4b364b37bd08&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01460b57e4a6fa0000012e7ed75e83.png%401280w_1l_2o_100sh.png";

        let saveData = await userModel.userSave({ username, password: hash.digest('hex'), status, registerTime, name, urlPic })
        if (saveData) {
            res.json({
                code: 200,
                errMsg: "",
                data: {
                    info: "注册成功",
                    status: 1
                }
            })
        }
    }
}

const userLogin = async (req, res) => {
    let { username, password } = req.body;

    //查看用户名是否存在
    let userData = await userModel.userFind({ username });

    if (userData) {
        if (userData.status) {
            //加密 2：创建加密算法
            const hash = crypto.createHash('sha256');

            //加密 3：对数据进行加密
            hash.update(password);
            //加密 4：拿到加密后的数据hash.digest('hex')
            //console.log(hash.digest('hex'));

            if (userData.password == hash.digest('hex')) {

                //生成token值，，并发送到客户端（颁发token）
                let token = authUtils.sendToken({ username });
                //服务端给客户端发送一个cookie,第一个参数是key值，第二个参数是生成的token,相当于kye值和value值
                res.cookie("token", token);


                res.json({
                    code: 200,
                    errMsg: "",
                    data: {
                        info: "登录成功",
                        code: 1,
                        data: userData
                    }
                })
            } else {
                res.json({
                    code: 200,
                    errMsg: "",
                    data: {
                        info: "密码错误",
                        code: 2
                    }
                })
            }
        } else {
            res.json({
                code: 200,
                errMsg: "",
                data: {
                    info: "权限被封，请联系管理员",
                    code: 0
                }
            })
        }
    } else {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                info: "用户名不存在",
                code: 0
            }
        })
    }
}

const userList = async (req, res) => {
    let data = await userModel.userList();

    if (data) {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                info: "查询成功",
                code: 1,
                data: {
                    list: data,
                    count: data.length
                }
            }
        })
    } else {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                info: "查询失败",
                code: 2
            }
        })
    }
}

const userInfo = async (req, res) => {
    let { userId } = req.body;
    let data = await userModel.userInfoOne(userId);
    if (data) {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                info: "查询成功",
                code: 1,
                data: {
                    data: data,
                }
            }
        })
    } else {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                info: "查询失败",
                code: 2
            }
        })
    }
}

const userUpdate = async (req,res)=>{
    let {booksLogo,nickname,updateId} = req.body;
    let data = await userModel.userUpdate(booksLogo,nickname,updateId);
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

module.exports = {
    userRegister,
    userLogin,
    userList,
    userInfo,
    userUpdate
}
