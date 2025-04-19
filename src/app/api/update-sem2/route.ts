import { NextResponse } from "next/server";
import { dbconnect } from "@/app/lib/mongodb";
import Semester from "@/app/models/semesters";

export async function PATCH(req:Request){
    await dbconnect();

    const form=await req.formData();

    const usn= form.get("usn") as string
    const sem= Number(form.get("sem"))

    const subject={
        sem:Number(form.get("sem")),
        mathematics: form.get("mathematics"),
        chemistry: form.get("chemistry"),
        caed: form.get("caed"),
        plc: form.get("plc"),
        esc: form.get("esc"),
        sfh: form.get("sfh"),
        english: form.get("english"),
        kannada: form.get("kannada")
    }

    if( !usn || !sem || Object.values(subject).some((v)=>v===null))
        return NextResponse.json({error:"all fields weren't filled"},{ status:400})

    let user=await Semester.findOne({usn})

    if(!user){
            user = await Semester.create({
              usn,
              sem,
              subject: [subject]
            });
          } else {
            user.subject.push(subject);
            await user.save();
          }
        
          return NextResponse.json({ message: "Marks uploaded successfully" });
}