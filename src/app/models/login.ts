import { Schema, model, models } from "mongoose";
const schema=new Schema({
    usn:{type:String,required:true},
    password:{type:String,required:true},
},
{timestamps:true,collection:"loginCollection"})
const Login=models.Login || model("Login",schema)
export default Login;