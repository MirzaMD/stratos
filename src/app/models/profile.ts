import { Schema, model, models } from "mongoose";
const schema=new Schema({
    usn:{type:String,required:true},
    fName:{type:String,required:true},
    lName:{type:String,required:true},
    pic:{type:String,required:true},
    password:{type:String,required:true},
},
{timestamps:true,collection:"profileCollection"
})
const Profile=models.Profile || model("Profile",schema)
export default Profile