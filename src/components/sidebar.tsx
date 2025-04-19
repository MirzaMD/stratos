"use client"
import Link from "next/link"
import { FaHome, FaSearch, FaUpload, FaPortrait } from "react-icons/fa"
import { usePathname } from "next/navigation"
export function Sidebar(){
    const path=usePathname()
    return(
    <div className=" w-screen flex justify-evenly
     text-[#ff00eea5] bg-[#ffffff0a]  cursor-pointer">
     <Link href={`/pages/homepage`}><FaHome className={`text-4xl sm:text-6xl ${path==="/pages/homepage"?"text-[#ffffff]":""}`}></FaHome></Link>
     <Link href={`/pages/search`}><FaSearch className={`text-4xl sm:text-6xl ${path==="/pages/some"?"text-[#ffffff]":""}`}></FaSearch></Link>
     <Link href={`/pages/semesters`}><FaUpload className={`text-4xl sm:text-6xl ${path==="/pages/semesters"?"text-[#ffffff]":""}`}></FaUpload></Link>
     <Link href={`/pages/profile`}><FaPortrait className={`text-4xl sm:text-6xl ${path==="/pages/profile"?"text-[#ffffff]":""}`}></FaPortrait></Link>
    </div>
    )
}