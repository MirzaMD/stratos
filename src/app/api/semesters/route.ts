import { NextResponse } from "next/server";
import { dbconnect } from "@/app/lib/mongodb";
import Semester from "@/app/models/semesters";

export async function POST(req:Request){
    await dbconnect()
    const stuff = await req.formData()

    const usn=stuff.get("usn") as string

    const newEntry1=new Semester({usn})
    await newEntry1.save()

    return NextResponse.json({message:"uploaded succesfully"},{ status : 200})
}
export async function GET() {
    try {
      await dbconnect();
      const data = await Semester.find({});
      return NextResponse.json(data, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: 'Error fetching semesters', error: error },
        { status: 500 }
      );
    }
  }