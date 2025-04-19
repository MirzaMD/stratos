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
ddco:z.string().min(1,"enter the marks").refine((val)=>Number(val)>=0 && Number(val)<=100,
{
    message:"Invalid marks"
}),
os:z.string().min(1,"enter the marks").refine((val)=>Number(val)>=0 && Number(val)<=100,
{
    message:"Invalid marks"
}),
dsa:z.string().min(1,"enter the marks").refine((val)=>Number(val)>=0 && Number(val)<=100,
{
    message:"Invalid marks"
}),
cpp:z.string().min(1,"enter the marks").refine((val)=>Number(val)>=0 && Number(val)<=100,
{
    message:"Invalid marks"
}),
dsalab:z.string().min(1,"enter the marks").refine((val)=>Number(val)>=0 && Number(val)<=100,
{
    message:"Invalid marks"
}),
excel:z.string().min(1,"enter the marks").refine((val)=>Number(val)>=0 && Number(val)<=100,
{
    message:"Invalid marks"
}),
scr:z.string().min(1,"enter the marks").refine((val)=>Number(val)>=0 && Number(val)<=100,
{
    message:"Invalid marks"
}),
pe:z.string().min(1,"enter the marks").refine((val)=>Number(val)>=0 && Number(val)<=100,
{
    message:"Invalid marks"
}),
})
type Tdetails=z.infer<typeof schema>
export default function Sem1Page(){
    const { register, handleSubmit, reset, formState:{errors, isSubmitting }} = useForm({ resolver:zodResolver(schema)})
    const sem=3;
   async function uploading(data: Tdetails): Promise<void> {
    const formData = new FormData();
    const userUsn=localStorage.getItem("userUsn");
    if(!userUsn){
        console.log("no usn")
        return
    }
    formData.append("usn", userUsn);
    formData.append("sem", sem.toString());

    formData.append("math", data.math);
    formData.append("ddco", data.ddco);
    formData.append("os", data.os);
    formData.append("dsa", data.dsa);
    formData.append("cpp", data.cpp);
    formData.append("dsa lab", data.dsalab);
    formData.append("excel", data.excel);
    formData.append("scr", data.scr);
    formData.append("PE/NSS/YOGA", data.pe);
  
    const res = await fetch("/api/update-sem3", {
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
            text-lg sm:text-3xl">III semester</h1>
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
                    <label htmlFor="ddco"
                    className={`cursor-pointer`}>Digital design and organization of computer::</label>
                    <input type="number" id="ddco" {...register("ddco")}
                    className=" border-2 border-white 
                    rounded-xl w-[80%] cursor-pointer"
                    placeholder="this is 4 credits"/>
                    {errors.ddco && (
                        <p className="text-red-600 font-mono font-bold">{`${errors.ddco.message}`}</p>
                    )}
                </div>
                
                <div className="flex flex-col justify-center 
                items-center text-[whitesmoke] text-md sm:text-xl 
                font-mono ">
                    <label htmlFor="os"
                    className={`cursor-pointer`}>Operating system:</label>
                    <input type="number" id="os" {...register("os")}
                    className=" border-2 border-white 
                    rounded-xl w-[80%] cursor-pointer"
                    placeholder="this is 4 credits"/>
                    {errors.os && (
                        <p className="text-red-600 font-mono font-bold">{`${errors.os.message}`}</p>
                    )}
                </div>

                <div className="flex flex-col justify-center 
                items-center text-[whitesmoke] text-md sm:text-xl 
                font-mono ">
                    <label htmlFor="dsa"
                    className={`cursor-pointer`}>Data structures and algorithm:</label>
                    <input type="number" id="dsa" {...register("dsa")}
                    className=" border-2 border-white 
                    rounded-xl w-[80%] cursor-pointer"
                    placeholder="this is 3 credits"/>
                     {errors.dsa && (
                        <p className="text-red-600 font-mono font-bold">{`${errors.dsa.message}`}</p>
                    )}
                </div>

                <div className="flex flex-col justify-center 
                items-center text-[whitesmoke] text-md sm:text-xl 
                font-mono ">
                    <label htmlFor="cpp"
                    className={`cursor-pointer`}>OOP with C++:</label>
                    <input type="number" id="cpp" {...register("cpp")}
                    className=" border-2 border-white 
                    rounded-xl w-[80%] cursor-pointer"
                    placeholder="this is 3 credits"/>
                     {errors.cpp && (
                        <p className="text-red-600 font-mono font-bold">{`${errors.cpp.message}`}</p>
                    )}
                </div>
                
                <div className="flex flex-col justify-center 
                items-center text-[whitesmoke] text-md sm:text-xl 
                font-mono ">
                    <label htmlFor="dsalab"
                    className={`cursor-pointer`}>Dsa Labroratory:</label>
                    <input type="number" id="dsalab" {...register("dsalab")}
                    className=" border-2 border-white 
                    rounded-xl w-[80%] cursor-pointer"
                    placeholder="this is 1 credit"/>
                    {errors.dsalab && (
                        <p className="text-red-600 font-mono font-bold">{`${errors.dsalab.message}`}</p>
                    )}
                </div>
                
                <div className="flex flex-col justify-center 
                items-center text-[whitesmoke] text-md sm:text-xl 
                font-mono ">
                    <label htmlFor="excel"
                    className={`cursor-pointer`}>Data analysis with microsoft excel:</label>
                    <input type="number" id="excel" {...register("excel")}
                    className=" border-2 border-white 
                    rounded-xl w-[80%] cursor-pointer"
                    placeholder="this is 1 credit"/>
                    {errors.excel && (
                        <p className="text-red-600 font-mono font-bold">{`${errors.excel.message}`}</p>
                    )}
                </div>

                <div className="flex flex-col justify-center 
                items-center text-[whitesmoke] text-md sm:text-xl 
                font-mono ">
                    <label htmlFor="scr"
                    className={`cursor-pointer`}>Social connect and responsibility:</label>
                    <input type="number" id="scr" {...register("scr")}
                    className=" border-2 border-white 
                    rounded-xl w-[80%] cursor-pointer"
                    placeholder="this is 1 credit"/>
                    {errors.scr && (
                        <p className="text-red-600 font-mono font-bold">{`${errors.scr.message}`}</p>
                    )}
                </div>

                <div className="flex flex-col justify-center 
                items-center text-[whitesmoke] text-md sm:text-xl 
                font-mono ">
                    <label htmlFor="pe"
                    className={`cursor-pointer`}>NSS/PE/YOGA:</label>
                    <input type="number" id="pe" {...register("pe")}
                    className=" border-2 border-white 
                    rounded-xl w-[80%] cursor-pointer"
                    placeholder="this is 0 credit"/>
                    {errors.pe && (
                        <p className="text-red-600 font-mono font-bold">{`${errors.pe.message}`}</p>
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