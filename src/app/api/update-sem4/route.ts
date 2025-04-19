import { NextResponse } from "next/server";
import { dbconnect } from "@/app/lib/mongodb";
import Semester from "@/app/models/semesters";

export async function PATCH(req:Request){
   await dbconnect();

   const form=await req.formData();
   const usn = form.get("usn") as string
   const sem = Number(form.get("sem"))

   const subject={
    sem:sem,
    ada:form.get("ada"),
    java:form.get("java"),
    dbms:form.get("dbms"),
    dms:form.get("dms"),
    bio:form.get("bio"),
    uhv:form.get("uhv"),
    lat:form.get("lat"),
    adalab:form.get("adalab")
   }
  
   if(!usn || !sem || Object.values(subject).some((val)=>val===null))
      return NextResponse.json({error:"Failed to fill all the feilds "},{status:400})

  const user=await Semester.findOne({usn})
  
   await user.subject.push(subject)
   await user.save();

   return NextResponse.json({message:"insertion completed succesfully"},{status:200})
}