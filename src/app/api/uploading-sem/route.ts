import { NextResponse } from "next/server";
import { dbconnect } from "@/app/lib/mongodb";
import Semester from "@/app/models/semesters";

export async function PATCH(req: Request) {
  await dbconnect();

  const form = await req.formData();

  const usn = form.get("usn") as string;
  const sem = Number(form.get("sem"));
  
  const subject = {
    sem:Number(form.get("sem")),
    mathematics: form.get("mathematics"),
    physics: form.get("physics"),
    pop: form.get("pop"),
    electronics: form.get("electronics"),
    cyb:form.get("cyb"),
    idt: form.get("idt"),
    english: form.get("english"),
    ico: form.get("ICO")
  };

  if (!usn || !sem || Object.values(subject).some((v) => v === null)) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  let user = await Semester.findOne({ usn });

  if (!user) {
    // Create a new document if not found
    user = await Semester.create({
      usn,
      sem,
      subject: [subject]
    });
  } else {
    // Append the subject to existing record
    user.subject.push(subject);
    await user.save();
  }

  return NextResponse.json({ message: "Marks uploaded successfully" });
}
