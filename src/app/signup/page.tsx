"use client"
import Link from "next/link"
import { useRef } from "react"
import { FaUpload } from "react-icons/fa6"
import { z, ZodIssueCode } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
const schema=z.object({
    pic:z.custom<FileList>((val)=>val instanceof FileList && val.length>0,
{
    message:"please upload an image"
}),
    fName:z.string().min(1,"must be contain at least one character")
    .max(12,"Can't have more than 12 characters")
    .refine((val)=>val.toLowerCase().trim()!=="",{
        message:"can't be space or blank"
    }),
    lName:z.string().min(1,"must be contain at least one character")
    .max(12,"Can't have more than 12 characters")
    .refine((val)=>val.toLowerCase().trim()!=="",{
        message:"can't be space or blank"
    }),
    usn:z.string().min(10,"must contain 10 characters").max(10,"must contain 10 characters"),
    password:z.string().min(6,"must be at least 6 charaters").max(12,"can't exceed more than 12 characters"),
    confirmPassword:z.string()
  }).superRefine((data,ctx)=>{
    if(data.confirmPassword!== data.password){
        ctx.addIssue({
            path:["confirmPassword"],
            code:ZodIssueCode.custom,
            message:"Passwords don't match"
        })
    }
  })
  type Tschema=z.infer<typeof schema>
export default function SignUp(){
    const route=useRouter();
    const {register, handleSubmit, 
        reset,setValue, 
        formState:{ errors, isSubmitting }} = useForm({ resolver:zodResolver(schema)})
        
    const imgRef=useRef<HTMLInputElement>(null)
    const box:React.CSSProperties={
        background:`url("/signup.jpg")`,
        backgroundPosition:`center`,
        backgroundAttachment:`fixed`,
        backgroundSize:`cover`,
        backgroundRepeat:`no-repeat`
    }
    const Tshadow:React.CSSProperties={
        textShadow:`2px 2px 2px #fbff12ac`
      }
      async function enteredData(data:Tschema):Promise<void>{
              const profileInfo=new FormData();
              profileInfo.append("pic",data.pic[0])
              profileInfo.append("usn",data.usn)
              profileInfo.append("fName",data.fName)
              profileInfo.append("lName",data.lName)
              profileInfo.append("password",data.confirmPassword)

              const loginInfo=new FormData()
              loginInfo.append("usn",data.usn)
              loginInfo.append("password",data.confirmPassword)

              const semestersInfo=new FormData()
              semestersInfo.append("usn",data.usn)

              await fetch("/api/profile",{
                method:"POST",
                body:profileInfo
              })

              await fetch("/api/login",{
                method:"POST",
                body:loginInfo
              })

              await fetch("/api/semesters",{
                method:"POST",
                body:semestersInfo
              })
              reset();
              if(!isSubmitting){
                 route.replace("/")
              }
      }
    return(
     <div className="h-screen w-screen" style={box}>
      <h1 className="text-2xl sm:text-4xl font-serif 
      text-white w-full text-center "
      style={Tshadow}>Sign up</h1>
      <form onSubmit={handleSubmit(enteredData)}
      className={`mt-24 sm:mt-6`}>
       <div className={`flex flex-col justify-center items-center gap-2 text-sm sm:text-xl text-[whitesmoke]`}>
       <input
  type="file"
  hidden
  {...register("pic")}
  onChange={(e)=>{
    const file=e.target.files
    if(file && file.length>0)
        setValue("pic",file,{shouldValidate:true})
  }}
  ref={imgRef}
/>
       {errors.pic && (<p className="text-red-600 font-extrabold"> {`${errors.pic.message}`} </p>)}
       <FaUpload className="text-white text-xl sm:text-4xl cursor-pointer"
       onClick={()=>{imgRef.current?.click()}}/>
       <label>Upload a profile picture:</label>
       </div>
        <div className={`flex flex-col justify-center items-center gap-2 text-sm sm:text-xl text-[whitesmoke]`}>
        <label>First name:</label>
        <input type="text" {...register("fName")} className={`w-[80%] border-2 border-white 
            rounded-xl`} placeholder="enter your name"/>
            {errors.fName && (<p className="text-red-600 font-extrabold"> {`${errors.fName.message}`} </p>)}
        </div>
        <div className={`flex flex-col justify-center items-center gap-2 text-sm sm:text-xl text-[whitesmoke]`}>
        <label>Last name:</label>
        <input type="text" {...register("lName")} className={`w-[80%] border-2 border-white 
            rounded-xl`} placeholder="enter your name"/>
            {errors.lName && (<p className="text-red-600 font-extrabold"> {`${errors.lName.message}`} </p>)}
        </div>
        <div className={`flex flex-col justify-center items-center gap-2 text-sm sm:text-xl text-[whitesmoke]`}>
        <label>University seat number:</label>
        <input type="text" {...register("usn")} className={`w-[80%] border-2 border-white 
            rounded-xl`} placeholder="enter your usn"/>
            {errors.usn && (<p className="text-red-600 font-extrabold"> {`${errors.usn.message}`} </p>)}
        </div>
        <div className={`flex flex-col justify-center items-center gap-2 text-sm sm:text-xl text-[whitesmoke]`}>
        <label>Password:</label>
        <input type="password" {...register("password")} className={`w-[80%] border-2 border-white 
            rounded-xl`} placeholder="enter your password"/>
            {errors.password && (<p className="text-red-600 font-extrabold"> {`${errors.password.message}`} </p>)}
        </div>
        <div className={`flex flex-col justify-center items-center gap-2 text-sm sm:text-xl text-[whitesmoke]`}>
        <label>Confirm password:</label>
        <input type="password" {...register("confirmPassword")} className={`w-[80%] border-2 border-white 
            rounded-xl`} placeholder="enter your password"/>
            {errors.confirmPassword && (<p className="text-red-600 font-extrabold"> {`${errors.confirmPassword.message}`} </p>)}
        </div>
        <div className={`flex justify-around items-center mt-4 `}>
            <Link href="/"
            className={`text-[#440044] font-[cursive]
             bg-white rounded-md px-2 active:bg-gray-600`}>
                cancel
                </Link>
            <button type="submit" disabled={isSubmitting}
          
            className={`text-[#440044] font-[cursive]
             bg-white rounded-md px-2 active:bg-gray-600`}>
                {isSubmitting?"uploading":"upload"}
                </button>
        </div>
      </form>
     </div>)
}