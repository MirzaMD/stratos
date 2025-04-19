"use client"
import { useEffect,useCallback,useState } from "react"
import { Sidebar } from "@/components/sidebar";
import Link from "next/link";
type profiletype={
    _id:string,
    usn:string;
    fName:string,
    lName:string,
    pic:string
}
export default function HomePage(){
    const [ details, setDetails ] = useState<profiletype[]|null>(null)
    const gettingProfiles=useCallback( async ()=>{
        const res= await fetch("/api/profile")
        if(!res.ok)
            throw new Error("Failed to fetch");
        const data=await res.json();
        setDetails(data)
    },[])
    useEffect(()=>{
        gettingProfiles();
    },[gettingProfiles])
    return (
    <div>
    <h1 className="w-full text-center text-3xl sm:text-4xl text-white font-serif">Startos</h1>
    <div className="fixed top-[90%]">
    <Sidebar/>
    </div>
    <div className="w-full h-full grid grid-cols-2 sm:grid-cols-4 ">
    {details?.map((v)=>(
        <div key={v._id} 
        className="text-white flex flex-col justify-center items-center w-fit m-4">
        <Link href={`/pages/homepage/${v.usn}`}><img src={v.pic || "/signup.jpg"} alt="profile"
        className={`h-[100px] sm:h-[150px] rounded-3xl`}/></Link>
        <h1>{v.fName} {v.lName}</h1>
        </div>
    ))}
    </div>
    </div>)
}
