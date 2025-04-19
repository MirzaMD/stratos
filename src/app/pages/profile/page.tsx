"use client";
import { Sidebar } from "@/components/sidebar";
import { useEffect, useCallback, useState } from "react";
import Link from "next/link";
import { useCgpaStore } from "@/app/store/useCgpaStore/page";

type ProfileType={
    _id:string,
    usn:string,
    pic:string,
    fName:string,
    lName:string
}
export default function ProfilePage() {
    const [usn, setUsn] = useState<string>("");
    const [fName, setFName] = useState<string>("");
    const [lName, setLName] = useState<string>("");
    const [pic, setPic] = useState<string | null>(null);
    const { cgpa } = useCgpaStore();

    const gettingDetails = useCallback(async () => {
        const storedUsn = localStorage.getItem("userUsn"); 
        if (!storedUsn) {
            console.log("no usn");
            return;
        }

        const res = await fetch("/api/profile");
        if (!res.ok) throw new Error("Failed to load the details");

        const data:ProfileType[]= await res.json();
        const userDetails = data.find((item) => item.usn === storedUsn);

        if (!userDetails) {
            console.log("no user");
            return;
        }

        setUsn(userDetails.usn);
        setFName(userDetails.fName);
        setLName(userDetails.lName);
        setPic(userDetails.pic);
    }, []);

    useEffect(() => {
        gettingDetails();
    }, [gettingDetails]);

    return (
        <div className="flex flex-col">
            <div className="h-full fixed top-[90%] sm:top-[90%]">
                <Sidebar />
            </div>
            <div className={`flex w-full text-white sm:gap-4 border-b-2 border-white h-fit`}>
                <img src={pic || "/signup.jpg"} alt="profile picture"
                    className="h-[100px] sm:h-[300px] rounded-full m-2" />
                <div className={`flex flex-col gap-4 mt-10 
                text-[0.6rem] sm:text-3xl font-mono font-extrabold`}>
                    <h1>{lName}, {fName}</h1>
                    <h1>{usn.toUpperCase()}</h1>
                    <h1 className={`font-mono`}><u>CGPA: {cgpa !== null ? cgpa : "N/A"}</u></h1>
                </div>
            </div>
            <div className="w-full flex flex-col text-lg sm:text-4xl
                font-serif text-[whitesmoke] gap-y-4 mt-2">
                {Array.from({ length: 8 }).map((_, i) => (
                    <Link
                        key={i}
                        href={`/pages/profile/${i + 1}`}
                        className="block w-full rounded-xl p-2 text-center bg-[#9927ae66] border-4 border-white"
                    >
                        {`${["I", "II", "III", "IV", "V", "VI", "VII", "VIII"][i]} semester`}
                    </Link>
                ))}
                <h1 className={`w-full text-center text-2xl sm:text-6xl mb-4`}>No futher semesters</h1>
            </div>
        </div>
    );
}
