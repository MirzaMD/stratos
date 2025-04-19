import { Schema, model, models } from "mongoose";

const semesterSchema = new Schema(
  {
    usn: { type: String, required: true },
    subject:{type:Array,required:true},
  },
  { timestamps: true, collection: "semestersCollection" }
);


const Semester = models.Semester || model("Semester", semesterSchema);

export default Semester;
