"use client"
import { useParams } from "next/navigation"
import { useEffect, useCallback,useState } from "react"
type SemesterMarks = Record<string, number | undefined>;
export default function UserPage(){
    const { id } = useParams();
    const [ sem1, setSem1 ] = useState<SemesterMarks | string>({})
    const [ sem2, setSem2 ] = useState<SemesterMarks | string>({})
    const [ sem3, setSem3 ] = useState<SemesterMarks | string>({})
    const [ display1, setDisplay1 ] = useState<boolean>(false)
    const [ display2, setDisplay2 ] = useState<boolean>(false)
    const [ display3, setDisplay3 ] = useState<boolean>(false)
    const otherProfile=useCallback( async ()=>{
        const response=await fetch("/api/semesters")
        if(!response.ok)
            throw new Error("Failed to fetch");
        const data=await response.json();
        const otherUser=data.find((val:any)=>val.usn===id)
        console.log(otherUser.subject);
        console.log(otherUser.subject.find((val:any)=>val.sem===1))
        setSem1(otherUser.subject.find((val:any)=>val.sem===1) || "No details")
        setSem2(otherUser.subject.find((val:any)=>val.sem===2) || "No details")
        setSem3(otherUser.subject.find((val:any)=>val.sem===3) || "No details") 
  },[])
  useEffect(()=>{
    otherProfile();
  },[otherProfile])
    return (
     <div className="h-full w-full flex flex-col gap-y-4 mt-2">
        { /* sem 1 */}
        {!display1?
        (<span className={`w-full text-white flex justify-center 
            items-center h-[90px]  rounded-3xl bg-[#17819e48] text-lg sm:text-xl font-serif cursor-pointer`}
         onClick={()=>{ setDisplay1(true)}}>
            Semester I
        </span>)
        :
        (
        Object.entries(sem1).map(([key,val])=>(
            <div key={key} className="text-white flex flex-col w-full h-full justify-center items-center" onDoubleClick={()=>{setDisplay1(false)}}>
            <h1 className="font-[cursive] text-lg sm:text-xl">{formatSubjectName(key)}:{val}</h1>
            </div>
        ))
        )
        }

        { /* sem 2 */}
         
        {!display2?
        (<span className={`w-full text-white flex justify-center 
            items-center h-[90px]  rounded-3xl bg-[#17819e48] text-lg sm:text-xl font-serif cursor-pointer`}
         onClick={()=>{ setDisplay2(true)}}>
            Semester II
        </span>)
        :
        (
        Object.entries(sem2).map(([key,val])=>(
            <div key={key} className="text-white flex flex-col w-full h-full justify-center items-center" onDoubleClick={()=>{setDisplay2(false)}}>
            <h1 className="font-[cursive] text-lg sm:text-xl">{formatSubjectName(key)}:{val}</h1>
            </div>
        ))
        )
        }

{ /* sem 3 */}
       
{!display3?
        (<span className={`w-full text-white flex justify-center 
            items-center h-[90px]  rounded-3xl bg-[#17819e48] text-lg sm:text-xl font-serif cursor-pointer`}
         onClick={()=>{ setDisplay3(true)}}>
            Semester III
        </span>)
        :
        (
        Object.entries(sem3).map(([key,val])=>(
            <div key={key} className="text-white flex flex-col w-full h-full justify-center items-center" onDoubleClick={()=>{setDisplay3(false)}}>
            <h1 className="font-[cursive] text-lg sm:text-xl">{formatSubjectName(key)}:{val}</h1>
            </div>
        ))
        )
        }
     
     </div>
   )
}
function formatSubjectName(subjectKey: string): string {
    const subjectMap: Record<string, string> = {
      electronics: "Electronics and Communication",
      english: "Communicative English",
      mathematics: "Mathematics",
      pop: "Principles of Programming",
      physics: "Physics",
      idt: "Innovation Design and Thinking",
      ico: "Indian Constitution",
      chemistry: "Chemistry",
      caed: "Computer Aided Engineering Drawing",
      esc: "Employable Skills Course",
      plc: "Programming Language Course",
      sfh: "Scientific Foundations of Health",
      kannada: "Kannada",
      ddco: "Digital Design and Computer Organization",
      os: "Operating Systems",
      dsa: "Data Structures and Algorithms",
      cpp: "OOP with C++",
      dsalab: "DSA Lab",
      excel: "Analyzing Data with Excel",
      scr: "Social Connect and Responsibility",
      ada: "Analysis and Design of Algorithms",
      java: "Advanced JAVA",
      dbms: "Database Management Systems",
      dms: "Discrete Mathematical Structures",
      bio: "Biology for Engineers",
      uhv: "Universal Human Values",
      lat: "LaTeX Script",
      adalab: "ADA Lab",
      cyb: "Cyber Security / IoT",
      sem: "Semester",
      pe: "Physical Education",
    };
    return subjectMap[subjectKey] || subjectKey;
  }