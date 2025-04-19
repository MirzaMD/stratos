"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
const schema=z.object({
ada:z.string().min(1,"enter the marks").refine((val)=>Number(val)>=0 && Number(val)<=100,
{
    message:"Invalid marks"
}),
java:z.string().min(1,"enter the marks").refine((val)=>Number(val)>=0 && Number(val)<=100,
{
    message:"Invalid marks"
}),
dbms:z.string().min(1,"enter the marks").refine((val)=>Number(val)>=0 && Number(val)<=100,
{
    message:"Invalid marks"
}),
dms:z.string().min(1,"enter the marks").refine((val)=>Number(val)>=0 && Number(val)<=100,
{
    message:"Invalid marks"
}),
bio:z.string().min(1,"enter the marks").refine((val)=>Number(val)>=0 && Number(val)<=100,
{
    message:"Invalid marks"
}),
uhv:z.string().min(1,"enter the marks").refine((val)=>Number(val)>=0 && Number(val)<=100,
{
    message:"Invalid marks"
}),
lat:z.string().min(1,"enter the marks").refine((val)=>Number(val)>=0 && Number(val)<=100,
{
    message:"Invalid marks"
}),
adalab:z.string().min(1,"enter the marks").refine((val)=>Number(val)>=0 && Number(val)<=100,
{
    message:"Invalid marks"
}),
})
type Tdetails=z.infer<typeof schema>
export default function Sem1Page(){
    const { register, handleSubmit, reset, formState:{errors, isSubmitting }} = useForm({ resolver:zodResolver(schema)})
    const sem=4;
   async function uploading(data: Tdetails): Promise<void> {
    const formData = new FormData();

    const userUsn=localStorage.getItem("userUsn");
    if(!userUsn){
        console.log("no usn")
        return
    }
    formData.append("usn", userUsn);
    formData.append("sem", sem.toString());

    formData.append("ada", data.ada);
    formData.append("java", data.java);
    formData.append("dbms", data.dbms);
    formData.append("dms", data.dms);
    formData.append("bio", data.bio);
    formData.append("uhv", data.uhv);
    formData.append("lat", data.lat);
    formData.append("adalab",data.adalab);
  
    const res = await fetch("/api/update-sem4", {
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
            text-lg sm:text-3xl">IV semester</h1>
            <form onSubmit={handleSubmit(uploading)}
            className="flex flex-col w-full h-full mt-16 gap-y-2">
                <div className="flex flex-col justify-center 
                items-center text-[whitesmoke] text-md sm:text-xl 
                font-mono  ">
                    <label htmlFor="ada"
                    className={`cursor-pointer`}>Analysis design of algorithm:</label>
                    <input type="number" id="ada" {...register("ada")}
                    className=" border-2 border-white 
                    rounded-xl w-[80%] cursor-pointer"
                    placeholder="this is 4 credits"/>
                    {errors.ada && (
                        <p className="text-red-600 font-mono font-bold">{`${errors.ada.message}`}</p>
                    )}
                </div>

                <div className="flex flex-col justify-center 
                items-center text-[whitesmoke] text-md sm:text-xl 
                font-mono ">
                    <label htmlFor="java"
                    className={`cursor-pointer`}>Advanced JAVA:</label>
                    <input type="number" id="java" {...register("java")}
                    className=" border-2 border-white 
                    rounded-xl w-[80%] cursor-pointer"
                    placeholder="this is 4 credits"/>
                    {errors.java && (
                        <p className="text-red-600 font-mono font-bold">{`${errors.java.message}`}</p>
                    )}
                </div>
                
                <div className="flex flex-col justify-center 
                items-center text-[whitesmoke] text-md sm:text-xl 
                font-mono ">
                    <label htmlFor="dbms"
                    className={`cursor-pointer`}>Database management system:</label>
                    <input type="number" id="dbms" {...register("dbms")}
                    className=" border-2 border-white 
                    rounded-xl w-[80%] cursor-pointer"
                    placeholder="this is 4 credits"/>
                    {errors.dbms && (
                        <p className="text-red-600 font-mono font-bold">{`${errors.dbms.message}`}</p>
                    )}
                </div>

                <div className="flex flex-col justify-center 
                items-center text-[whitesmoke] text-md sm:text-xl 
                font-mono ">
                    <label htmlFor="dms"
                    className={`cursor-pointer`}>Discreete mathematical structures:</label>
                    <input type="number" id="dms" {...register("dms")}
                    className=" border-2 border-white 
                    rounded-xl w-[80%] cursor-pointer"
                    placeholder="this is 3 credits"/>
                     {errors.dms && (
                        <p className="text-red-600 font-mono font-bold">{`${errors.dms.message}`}</p>
                    )}
                </div>

                <div className="flex flex-col justify-center 
                items-center text-[whitesmoke] text-md sm:text-xl 
                font-mono ">
                    <label htmlFor="bio"
                    className={`cursor-pointer`}>Biology:</label>
                    <input type="number" id="bio" {...register("bio")}
                    className=" border-2 border-white 
                    rounded-xl w-[80%] cursor-pointer"
                    placeholder="this is 2 credits"/>
                     {errors.bio && (
                        <p className="text-red-600 font-mono font-bold">{`${errors.bio.message}`}</p>
                    )}
                </div>
                
                <div className="flex flex-col justify-center 
                items-center text-[whitesmoke] text-md sm:text-xl 
                font-mono ">
                    <label htmlFor="uhv"
                    className={`cursor-pointer`}>Universal human values:</label>
                    <input type="number" id="uhv" {...register("uhv")}
                    className=" border-2 border-white 
                    rounded-xl w-[80%] cursor-pointer"
                    placeholder="this is 1 credit"/>
                    {errors.uhv && (
                        <p className="text-red-600 font-mono font-bold">{`${errors.uhv.message}`}</p>
                    )}
                </div>
                
                <div className="flex flex-col justify-center 
                items-center text-[whitesmoke] text-md sm:text-xl 
                font-mono ">
                    <label htmlFor="lat"
                    className={`cursor-pointer`}>LaTeX script:</label>
                    <input type="number" id="lat" {...register("lat")}
                    className=" border-2 border-white 
                    rounded-xl w-[80%] cursor-pointer"
                    placeholder="this is 1 credit"/>
                    {errors.lat && (
                        <p className="text-red-600 font-mono font-bold">{`${errors.lat.message}`}</p>
                    )}
                </div>
 
                <div className="flex flex-col justify-center 
                items-center text-[whitesmoke] text-md sm:text-xl 
                font-mono ">
                    <label htmlFor="adalab"
                    className={`cursor-pointer`}>ADA Labroratory:</label>
                    <input type="number" id="adalab" {...register("adalab")}
                    className=" border-2 border-white 
                    rounded-xl w-[80%] cursor-pointer"
                    placeholder="this is 1 credit"/>
                    {errors.adalab && (
                        <p className="text-red-600 font-mono font-bold">{`${errors.adalab.message}`}</p>
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