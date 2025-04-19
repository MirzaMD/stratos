import { NextResponse } from "next/server";
import { dbconnect } from "@/app/lib/mongodb";
import Login from "@/app/models/login";


export async function POST(req:Request){
      await dbconnect();
      const formStuff=await req.formData();

      const usn=formStuff.get("usn") as string
      const password=formStuff.get("password") as string

      try{
        const newEntry1=new Login({usn,password})
        await newEntry1.save()

        return NextResponse.json({message:"Data was successfully uploaded"}, { status : 200})
      }
      catch(err){
        return NextResponse.json({error:err},{status:400})
      }
}
export async function GET(){
  dbconnect();
  try{
  const info=await Login.find({});
  return NextResponse.json(info,{ status:200})
  }
  catch{
    return NextResponse.json({error:"couldn't fetch the login details"},{status:400})
  }
}