const mongoose=require("../utils/database");


const User =mongoose.model("user",{
    username:String,
    password:String,
    status:Boolean,
    registerTime:Number,
    name:String,
    urlPic:String
})

const userFind = (userInfo) =>{
    return User.findOne(userInfo);
}

const userSave = (userInfo) =>{
    let user = new User(userInfo);
    return user.save();
}

const userList =()=>{
    return User.find();
}

const userInfoOne = (userId)=>{
    return User.findOne({_id:userId});
}

const userUpdate = (booksLogo,nickname,updateId) =>{
    return User.update({ _id: updateId }, { $set: {urlPic:booksLogo,name:nickname} })
}

module.exports = {
    userFind,
    userSave,
    userList,
    userInfoOne,
    userUpdate
}