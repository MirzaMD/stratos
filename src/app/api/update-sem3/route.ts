import { NextResponse } from "next/server";
import { dbconnect } from "@/app/lib/mongodb";
import Semester from "@/app/models/semesters";

export async function PATCH(req:Request){
    await dbconnect();

    const form= await req.formData();

    const usn = form.get("usn") as string
    const sem = Number(form.get("sem"));
    
    const subject={
        sem:sem,
        mathematics:form.get("math"),
        ddco:form.get("ddco"),
        os:form.get("os"),
        dsa:form.get("dsa"),
        cpp:form.get("cpp"),
        dsalab:form.get("dsa lab"),
        excel:form.get("excel"),
        scr:form.get("scr"),
        pe:form.get("PE/NSS/YOGA")
    }

    if( !usn || !sem || Object.values(subject).some((v)=>v===null))
        return NextResponse.json({error:"missing certain feilds"}, { status: 400})

    const user = await Semester.findOne({usn});

    await user.subject.push(subject);
    await user.save();
    return NextResponse.json({message:"data inserted succesfully"},{status:200})
}