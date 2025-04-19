"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
const schema=z.object({
math:z.string().min(1,"enter the marks").refine((val)=>Number(val)>=0 && Number(val)<=100,
{
    message:"Invalid marks"
}),
chem:z.string().min(1,"enter the marks").refine((val)=>Number(val)>=0 && Number(val)<=100,
{
    message:"Invalid marks"
}),
caed:z.string().min(1,"enter the marks").refine((val)=>Number(val)>=0 && Number(val)<=100,
{
    message:"Invalid marks"
}),
plc:z.string().min(1,"enter the marks").refine((val)=>Number(val)>=0 && Number(val)<=100,
{
    message:"Invalid marks"
}),
esc:z.string().min(1,"enter the marks").refine((val)=>Number(val)>=0 && Number(val)<=100,
{
    message:"Invalid marks"
}),
pe:z.string().min(1,"enter the marks").refine((val)=>Number(val)>=0 && Number(val)<=100,
{
    message:"Invalid marks"
}),
sfh:z.string().min(1,"enter the marks").refine((val)=>Number(val)>=0 && Number(val)<=100,
{
    message:"Invalid marks"
}),
kan:z.string().min(1,"enter the marks").refine((val)=>Number(val)>=0 && Number(val)<=100,
{
    message:"Invalid marks"
}),
})
type Tdetails=z.infer<typeof schema>
export default function Sem1Page(){
    const { register, handleSubmit, reset, formState:{errors, isSubmitting }} = useForm({ resolver:zodResolver(schema)})
    const sem=2;
   async function uploading(data: Tdetails): Promise<void> {
    const formData = new FormData();

    const userUsn=localStorage.getItem("userUsn");
    console.log(userUsn)
    if (!userUsn) {
     console.error('USN not found in localStorage');
     return; // or handle it in another way if necessary
   }
   
    formData.append("usn", userUsn);
    formData.append("sem", sem.toString());

    formData.append("mathematics", data.math);
    formData.append("chemistry", data.chem);
    formData.append("caed", data.caed);
    formData.append("esc", data.esc);
    formData.append("plc", data.plc);
    formData.append("english", data.pe);
    formData.append("sfh", data.sfh);
    formData.append("kannada", data.kan);
  
    const res = await fetch("/api/update-sem2", {
      method: "PATCH",
      body: formData,
    });
  
    const result = await res.json();
    if (res.ok) {
      console.log("Success:", result.message);
      reset();
    } else {
      console.error("Error:", result.error);
    }
  }
  
    return(
        <div className="flex flex-col w-full h-full justify-center items-center">
            <h1 className="text-[whitesmoke] font-serif font-extrabold
            text-lg sm:text-3xl">II semester</h1>
            <form onSubmit={handleSubmit(uploading)}
            className="flex flex-col w-full h-full mt-16 gap-y-2">
                <div className="flex flex-col justify-center 
                items-center text-[whitesmoke] text-md sm:text-xl 
                font-mono  ">
                    <label htmlFor="math"
                    className={`cursor-pointer`}>Mathematics:</label>
                    <input type="number" id="math" {...register("math")}
                    className=" border-2 border-white 
                    rounded-xl w-[80%] cursor-pointer"
                    placeholder="this is 4 credits"/>
                    {errors.math && (
                        <p className="text-red-600 font-mono font-bold">{`${errors.math.message}`}</p>
                    )}
                </div>

                <div className="flex flex-col justify-center 
                items-center text-[whitesmoke] text-md sm:text-xl 
                font-mono ">
                    <label htmlFor="chem"
                    className={`cursor-pointer`}>Chemistry:</label>
                    <input type="number" id="chem" {...register("chem")}
                    className=" border-2 border-white 
                    rounded-xl w-[80%] cursor-pointer"
                    placeholder="this is 4 credits"/>
                    {errors.chem && (
                        <p className="text-red-600 font-mono font-bold">{`${errors.chem.message}`}</p>
                    )}
                </div>
                
                <div className="flex flex-col justify-center 
                items-center text-[whitesmoke] text-md sm:text-xl 
                font-mono ">
                    <label htmlFor="caed"
                    className={`cursor-pointer`}>Computer aided design:</label>
                    <input type="number" id="caed" {...register("caed")}
                    className=" border-2 border-white 
                    rounded-xl w-[80%] cursor-pointer"
                    placeholder="this is 3 credits"/>
                    {errors.caed && (
                        <p className="text-red-600 font-mono font-bold">{`${errors.caed.message}`}</p>
                    )}
                </div>

                <div className="flex flex-col justify-center 
                items-center text-[whitesmoke] text-md sm:text-xl 
                font-mono ">
                    <label htmlFor="plc"
                    className={`cursor-pointer`}>Programming language coruse:</label>
                    <input type="number" id="plc" {...register("plc")}
                    className=" border-2 border-white 
                    rounded-xl w-[80%] cursor-pointer"
                    placeholder="this is 3 credits"/>
                     {errors.plc && (
                        <p className="text-red-600 font-mono font-bold">{`${errors.plc.message}`}</p>
                    )}
                </div>

                <div className="flex flex-col justify-center 
                items-center text-[whitesmoke] text-md sm:text-xl 
                font-mono ">
                    <label htmlFor="esc"
                    className={`cursor-pointer`}>Employability skills course:</label>
                    <input type="number" id="esc" {...register("esc")}
                    className=" border-2 border-white 
                    rounded-xl w-[80%] cursor-pointer"
                    placeholder="this is 3 credits"/>
                     {errors.esc && (
                        <p className="text-red-600 font-mono font-bold">{`${errors.esc.message}`}</p>
                    )}
                </div>
                
                <div className="flex flex-col justify-center 
                items-center text-[whitesmoke] text-md sm:text-xl 
                font-mono ">
                    <label htmlFor="pe"
                    className={`cursor-pointer`}>Professional writing skills:</label>
                    <input type="number" id="pe" {...register("pe")}
                    className=" border-2 border-white 
                    rounded-xl w-[80%] cursor-pointer"
                    placeholder="this is 1 credit"/>
                    {errors.pe && (
                        <p className="text-red-600 font-mono font-bold">{`${errors.pe.message}`}</p>
                    )}
                </div>
                
                <div className="flex flex-col justify-center 
                items-center text-[whitesmoke] text-md sm:text-xl 
                font-mono ">
                    <label htmlFor="sfh"
                    className={`cursor-pointer`}>Scientific health and foundation:</label>
                    <input type="number" id="sfh" {...register("sfh")}
                    className=" border-2 border-white 
                    rounded-xl w-[80%] cursor-pointer"
                    placeholder="this is 1 credit"/>
                    {errors.sfh && (
                        <p className="text-red-600 font-mono font-bold">{`${errors.sfh.message}`}</p>
                    )}
                </div>

                <div className="flex flex-col justify-center 
                items-center text-[whitesmoke] text-md sm:text-xl 
                font-mono ">
                    <label htmlFor="kan"
                    className={`cursor-pointer`}>Kannada:</label>
                    <input type="number" id="kan" {...register("kan")}
                    className=" border-2 border-white 
                    rounded-xl w-[80%] cursor-pointer"
                    placeholder="this is 1 credit"/>
                    {errors.kan && (
                        <p className="text-red-600 font-mono font-bold">{`${errors.kan.message}`}</p>
                    )}
                </div>

                <div className="flex justify-evenly items-center text-[whitesmoke] text-lg 
                font-mono sm:text-2xl mt-5 sm:mt-2">
                    <Link href={"/pages/semesters"}
                    className="font-cursive bg-[#90088441] p-1 sm:p-2 rounded-3xl">Cancel</Link>

                    <button type="submit" disabled={isSubmitting}
                    className="font-cursive bg-[#2415c841] p-1 sm:p-2 rounded-3xl">{isSubmitting?"uploading":"upload"}</button>
                </div>
            </form>
        </div>
    )
}