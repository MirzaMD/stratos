"use client";
import { FaTrophy } from "react-icons/fa";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const schema = z.object({
  usn: z
    .string()
    .min(10, "the length must be of 10 characters")
    .max(10, "length can't exceed 10 characters")
    .refine((val) => val.toLowerCase().includes("ox"), {
      message: "Only meant for oxford students",
    }),
  password: z
    .string()
    .min(6, "must be of at least 6 letters")
    .max(12, "can't exceed more than 12 letters"),
});

type Tlogin = z.infer<typeof schema>;

export default function Home() {
  const Tshadow: React.CSSProperties = {
    textShadow: `2px 2px 2px #fbff12ac`,
  };
  const router = useRouter();
  const [details, setDetails] = useState<Tlogin[] | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const gettingDetails = useCallback(async () => {
    const res = await fetch("/api/profile");
    if (!res.ok) throw new Error("Couldn't fetch");
    const data = await res.json();
    setDetails(data);
  }, []);

  useEffect(() => {
    gettingDetails();
  }, [gettingDetails]);

  async function checking(data: Tlogin) {
    const user = details?.find(
      (item) =>
        item.usn.toLowerCase().trim() === data.usn.toLowerCase().trim() &&
        item.password === data.password
    );

    if (user) {
      localStorage.setItem("userUsn", user.usn); // ✅ Store USN
      router.replace("/pages/homepage");
    } else {
      console.log("Invalid user");
      reset();
    }
  }

  return (
    <div className={`w-full h-full flex flex-col justify-center items-center`}>
      <h1
        className="text-[whitesmoke] font-serif text-lg sm:text-7xl animate-pulse mt-6 sm:mt-0"
        style={Tshadow}
      >
        Stratos
      </h1>
      <div className="flex justify-center gap-x-2 text-md sm:text-3xl text-[whitesmoke] animate-pulse">
        <i>nothing but the best... </i>
        <FaTrophy className="text-[#ffea00]" />
      </div>
      <form
        onSubmit={handleSubmit(checking)}
        className="flex flex-col justify-center items-center bg-[#ffffff11]
        rounded-2xl mt-4 w-[300px] sm:w-[800px] h-[400px] gap-6"
      >
        <div className="flex flex-col w-[300px] sm:w-[700px] justify-center items-center gap-4">
          <label
            htmlFor="usn"
            className="text-lg sm:text-2xl text-[whitesmoke] cursor-pointer"
          >
            University seat number:
          </label>
          <input
            type="text"
            {...register("usn")}
            id="usn"
            className="bg-[#ffffff00] w-[80%] text-white border-4 border-white rounded-lg"
            placeholder=" enter your usn"
          />
          {errors.usn && (
            <p className={`text-red-500 font-extrabold`}>
              {`${errors.usn.message}`}
            </p>
          )}
        </div>
        <div className="flex flex-col w-[300px] sm:w-[700px] justify-center items-center gap-2">
          <label
            htmlFor="password"
            className="text-lg sm:text-2xl text-[whitesmoke] cursor-pointer"
          >
            Password:
          </label>
          <input
            type="password"
            {...register("password")}
            id="password"
            className="bg-[#ffffff00] w-[80%] text-white border-4 border-white rounded-lg"
            placeholder=" enter your password"
          />
          {errors.password && (
            <p className={`text-red-500 font-extrabold`}>
              {`${errors.password.message}`}
            </p>
          )}
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className="cursor-pointer text-lg sm:text-2xl bg-white text-black font-mono mt-3 w-[60%] rounded-xl"
        >
          {isSubmitting ? "logging in" : "login"}
        </button>
        <Link href={"/signup"} className="w-[80%]">
          <button
            disabled={isSubmitting}
            type="button"
            className="cursor-pointer text-lg sm:text-2xl bg-[#520252a1] text-white mt-3 w-[95%] rounded-xl font-mono active:bg-[#9e429e]"
          >
            sign up
          </button>
        </Link>
      </form>
    </div>
  );
}
