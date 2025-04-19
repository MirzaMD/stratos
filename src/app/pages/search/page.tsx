"use client"
import { Sidebar } from "@/components/sidebar"
import Link from "next/link"
import { useEffect, useCallback, useState } from "react"
type DetailsType={
    fName:string,
    lName:string,
    _id:string,
    usn:string,
    pic:string
}
export default function SearchPage(){
     const [ search, setSearch ] = useState('')
     const [ profile, setProfile ] =useState<DetailsType|null>(null)
     const gettingProfiles=useCallback(async ()=>{
           const res=await fetch("/api/profile")
           if(!res.ok)
              throw new Error("Failed to fetch");
            const data:DetailsType[]=await res.json();
            console.log(data);
            const porfile = data.find(val =>
                val.usn === search ||
                val.fName.toLowerCase().trim() === search.toLowerCase().trim() ||
                val.lName.toLowerCase().trim() === search.toLowerCase().trim()
              );
            console.log(porfile)
            setProfile(porfile || null);
     },[search])
     useEffect(()=>{
        gettingProfiles();
     },[gettingProfiles])

    return(
    <div className="h-full w-full flex flex-col items-center">
        <div className="h-full w-full fixed top-[95%] sm:top-[90%]">
          <Sidebar/>
        </div>
     <input type="text" placeholder="enter name or usn" value={search}
     className={`w-[80%] rounded-2xl border-4 border-white text-white mt-2`}
     onChange={(e)=>{setSearch(e.target.value)}}/>
     <div className={`flex justify-center items-center h-full w-full`}>
        {profile && (
            <div key={profile._id} className={`mt-4`}>
             <Link href={`/pages/homepage/${profile.usn}`}><img src={profile.pic || "signup.jpg"} className={`h-[140px] rounded-3xl`}/></Link>
             <h1 className={`text-white`}>{profile.fName} { profile.lName} </h1>
            </div>    
        )}
     </div>
    </div>)
}