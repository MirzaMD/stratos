"use client"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
export default function SemestersPage(){

  const box:React.CSSProperties={
    backgroundImage: `url("/sem.jpg")`,
    backgroundPosition: `center`,
    backgroundSize: `cover`,
    backgroundRepeat: `no-repeat`,
    backgroundAttachment: `fixed`
  }
  return(
  <div className="w-full h-full">
    <h1 className="w-full text-center
    font-serif font-semibold text-[whitesmoke]
    text-xl sm:text-3xl">Uploads marks</h1>
  <div className="w-fit h-full fixed top-[95%] sm:top-[90%]">
  <Sidebar/>
  </div>
  <div className={`w-full h-full flex justify-center gap-y-4 
    items-centers flex-col mt-4`}>

  <div className={`w-full text-center
    h-[80px] sm:text-[100px] flex justify-center items-center rounded-3xl`} style={box}>
  <Link href={`/pages/semesters/sem1`}
  className={`text-lg sm:text-xl text-[black]
   font-serif`}>I SEMESTER</Link>
   </div>
  
   <div className={`w-full text-center
    h-[80px] sm:text-[100px] flex justify-center items-center rounded-3xl`} style={box}>
  <Link href={`/pages/semesters/sem2`}
  className={`text-lg sm:text-xl text-[black]
   font-serif`}>II SEMESTER</Link>
   </div>

   <div className={`w-full text-center
    h-[80px] sm:text-[100px] flex justify-center items-center rounded-3xl`} style={box}>
  <Link href={`/pages/semesters/sem3`}
  className={`text-lg sm:text-xl text-[black]
   font-serif`}>III SEMESTER</Link>
   </div>

   <div className={`w-full text-center
    h-[80px] sm:text-[100px] flex justify-center items-center rounded-3xl`} style={box}>
  <Link href={`/pages/semesters/sem4`}
  className={`text-lg sm:text-xl text-[black]
   font-serif`}>IV SEMESTER</Link>
   </div>
 
   <div className={`w-full text-center
    h-[80px] sm:text-[100px] flex justify-center items-center rounded-3xl`} style={box}>
  <Link href={``}
  className={`text-lg sm:text-xl text-[black]
   font-serif`}>V SEMESTER</Link>
   </div>

   <div className={`w-full text-center
    h-[80px] sm:text-[100px] flex justify-center items-center rounded-3xl`} style={box}>
  <Link href={``}
  className={`text-lg sm:text-xl text-[black]
   font-serif`}>VI SEMESTER</Link>
   </div>

   <div className={`w-full text-center
    h-[80px] sm:text-[100px] flex justify-center items-center rounded-3xl`} style={box}>
  <Link href={``}
  className={`text-lg sm:text-xl text-[black]
   font-serif`}>VII SEMESTER</Link>
   </div>
  

   <div className={`w-full text-center
    h-[80px] sm:text-[100px] flex justify-center items-center rounded-3xl`} style={box}>
  <Link href={``}
  className={`text-lg sm:text-xl text-[black]
   font-serif`}>VIII SEMESTER</Link>
   </div>
   
   <h1 className="text-white text-xl sm:text-3xl w-full text-center font-serif">No further semesters.</h1>
  </div>
  </div>
  )
}