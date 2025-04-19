"use client"
import { useEffect, useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"

const schema = z.object({
  math: z.string().refine(val => Number(val) >= 0 && Number(val) <= 100, { message: "Invalid marks" }),
  phy: z.string().refine(val => Number(val) >= 0 && Number(val) <= 100, { message: "Invalid marks" }),
  pop: z.string().refine(val => Number(val) >= 0 && Number(val) <= 100, { message: "Invalid marks" }),
  elec: z.string().refine(val => Number(val) >= 0 && Number(val) <= 100, { message: "Invalid marks" }),
  cyb: z.string().refine(val => Number(val) >= 0 && Number(val) <= 100, { message: "Invalid marks" }),
  idt: z.string().refine(val => Number(val) >= 0 && Number(val) <= 100, { message: "Invalid marks" }),
  ce: z.string().refine(val => Number(val) >= 0 && Number(val) <= 100, { message: "Invalid marks" }),
  ic: z.string().refine(val => Number(val) >= 0 && Number(val) <= 100, { message: "Invalid marks" }),
})

type Tdetails = z.infer<typeof schema>

export default function Sem1Page() {
  const [userUsn, setUserUsn] = useState<string | null>(null);
  const sem = 1;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Tdetails>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const usn = localStorage.getItem('userUsn');
    setUserUsn(usn);
  }, []);

  if (userUsn === null) {
    return <div className="text-white text-xl p-4">Loading...</div>;
  }

  if (!userUsn) {
    return <div className="text-red-500 font-bold text-center mt-4">No USN found. Please log in first.</div>;
  }

  async function uploading(data: Tdetails): Promise<void> {
    if (!userUsn) {
      console.error('USN not found in localStorage');
      return;
    }
  
    const formData = new FormData();
    formData.append("usn", userUsn); // userUsn is guaranteed to be a string here
    formData.append("sem", sem.toString());
    formData.append("mathematics", data.math);
    formData.append("physics", data.phy);
    formData.append("pop", data.pop);
    formData.append("electronics", data.elec);
    formData.append("cyb", data.cyb);
    formData.append("idt", data.idt);
    formData.append("english", data.ce);
    formData.append("ICO", data.ic);
  
    const res = await fetch("/api/uploading-sem", {
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
  
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <h1 className="text-[whitesmoke] font-serif font-extrabold text-lg sm:text-3xl">I Semester</h1>
      <form onSubmit={handleSubmit(uploading)} className="flex flex-col w-full h-full mt-16 gap-y-2">
        
        {[
          { label: "Mathematics", id: "math", note: "this is 4 credits" },
          { label: "Physics", id: "phy" },
          { label: "POP", id: "pop" },
          { label: "Electronics", id: "elec" },
          { label: "Cybersecurity", id: "cyb" },
          { label: "IDT", id: "idt" },
          { label: "English", id: "ce" },
          { label: "ICO", id: "ic" },
        ].map(({ label, id, note }) => (
          <div key={id} className="flex flex-col justify-center items-center text-[whitesmoke] text-md sm:text-xl font-mono">
            <label htmlFor={id} className="cursor-pointer">{label}:</label>
            <input
              type="number"
              id={id}
              placeholder={note || "Enter marks"}
              className="border-2 border-white rounded-xl w-[80%] cursor-pointer"
              {...register(id as keyof Tdetails)}
            />
            {errors[id as keyof Tdetails] && (
              <p className="text-red-600 font-mono font-bold">{`${errors[id as keyof Tdetails]?.message}`}</p>
            )}
          </div>
        ))}

        <div className="flex justify-evenly items-center text-[whitesmoke] text-lg font-mono sm:text-2xl mt-5 sm:mt-2">
          <Link href="/pages/semesters" className="font-cursive bg-[#90088441] p-1 sm:p-2 rounded-3xl">Cancel</Link>
          <button type="submit" disabled={isSubmitting} className="font-cursive bg-[#2415c841] p-1 sm:p-2 rounded-3xl">
            {isSubmitting ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>
    </div>
  );
}
