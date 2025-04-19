import { NextResponse } from "next/server";
import { dbconnect } from "@/app/lib/mongodb";
import cloudinary from "@/app/lib/cloudinary";
import Profile from "@/app/models/profile";


export async function POST(req:Request){
      await dbconnect();
      const formStuff=await req.formData();

      const pic=formStuff.get("pic") as File
      const lName=formStuff.get("lName") as string
      const fName=formStuff.get("fName") as string
      const usn=formStuff.get("usn") as string
      const password=formStuff.get("password") as string

      const bytes=await pic.arrayBuffer();
      const buffer=Buffer.from(bytes)

      const base64Img=buffer.toString("base64");
      const dataUrl=`data:${pic.type};base64,${base64Img}`;

      try{
        const uploadResults=await cloudinary.uploader.upload(dataUrl,{
            resource_type:"image"
        })
        const newEntry1=new Profile({pic:uploadResults.secure_url,fName,lName,usn,password})
        await newEntry1.save()

        return NextResponse.json({message:"Data was successfully uploaded"}, { status : 200})
      }
      catch{
        return NextResponse.json({error:"failded to upload"},{status:400})
      }
}
export async function GET(){
      await dbconnect();

      const data=await Profile.find({})

      try{
        return NextResponse.json(data,{status:200})
      }
      catch{
        return NextResponse.json({error:"failed to get"},{status:400})
      }
}