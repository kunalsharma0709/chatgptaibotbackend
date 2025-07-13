require("dotenv").config();
const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL
mongoose.connect(MONGODB_URL);

const userschema = mongoose.Schema({
    username : String,
    password : String
})

const chatschema = mongoose.Schema({
    userId : {type:mongoose.Schema.Types.ObjectId , ref : "User"},
    role : {type  :String , enum: ["user", "assistant"]},
    content : String,
    createdAt:{type:Date , default:Date.now}

})

const User = new mongoose.model("User",userschema);
const Chat = new mongoose.model("Chat",chatschema);

module.exports={User,Chat};

