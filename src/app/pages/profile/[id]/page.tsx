"use client";
import { useEffect, useCallback, useState } from "react";
import { useParams } from "next/navigation";
import { useCgpaStore } from "@/store/useCgpaStore/page";
type SemesterMarks = Record<string, number | undefined>;
export default function Marks() {
  const { id } = useParams();
  const semesterId = Number(id);
  const [scores, setScores] = useState<SemesterMarks>({});
  const [noMarks, setNoMarks] = useState<boolean>(false);
  const { setSgpa } = useCgpaStore();
  const [sgpa, setSgpaState] = useState<number | null>(null);
type UserType={
  usn:string,
  _id:string,
  sem:number
}
  function getGradePoint(marks: number): number {
    if (marks >= 90) return 10;
    if (marks >= 80) return 9;
    if (marks >= 70) return 8;
    if (marks >= 60) return 7;
    if (marks >= 50) return 6;
    if (marks >= 45) return 5;
    if (marks >= 40) return 4;
    return 0;
  }

  function calculateSgpa(marks:SemesterMarks, sem: number): number | null {
    let totalPoints = 0;
    let totalCredits = 0;

    if (sem === 1) {
      totalCredits = 20;
      totalPoints =
        getGradePoint(marks.mathematics?? 0) * 4 +
        getGradePoint(marks.physics?? 0) * 4 +
        getGradePoint(marks.pop?? 0) * 3 +
        getGradePoint(marks.electronics?? 0) * 3 +
        getGradePoint(marks.cyb?? 0) * 3 +
        getGradePoint(marks.ico?? 0) * 1 +
        getGradePoint(marks.idt?? 0) * 1 +
        getGradePoint(marks.english?? 0) * 1;
    } else if (sem === 2) {
      totalCredits = 20;
      totalPoints =
        getGradePoint(marks.mathematics?? 0) * 4 +
        getGradePoint(marks.chemistry?? 0) * 4 +
        getGradePoint(marks.caed?? 0) * 3 +
        getGradePoint(marks.plc?? 0) * 3 +
        getGradePoint(marks.esc?? 0) * 3 +
        getGradePoint(marks.sfh?? 0) * 1 +
        getGradePoint(marks.english?? 0) * 1 +
        getGradePoint(marks.kannada?? 0) * 1;
    } else if (sem === 3) {
      totalCredits = 21;
      totalPoints =
        getGradePoint(marks.mathematics?? 0) * 4 +
        getGradePoint(marks.ddco?? 0) * 4 +
        getGradePoint(marks.os?? 0) * 4 +
        getGradePoint(marks.dsa?? 0) * 3 +
        getGradePoint(marks.cpp?? 0) * 3 +
        getGradePoint(marks.dsalab?? 0) * 1 +
        getGradePoint(marks.excel?? 0) * 1 +
        getGradePoint(marks.scr?? 0) * 1;
    } else if (sem === 4) {
      totalCredits = 20;
      totalPoints =
        getGradePoint(marks.ada?? 0) * 4 +
        getGradePoint(marks.java?? 0) * 4 +
        getGradePoint(marks.dbms?? 0) * 4 +
        getGradePoint(marks.dms?? 0) * 3 +
        getGradePoint(marks.bio?? 0) * 2 +
        getGradePoint(marks.uhv?? 0) * 1 +
        getGradePoint(marks.adalab?? 0) * 1 +
        getGradePoint(marks.lat?? 0) * 1;
    } else {
      return null;
    }

    const calculated = parseFloat((totalPoints / totalCredits).toFixed(2));
    setSgpaState(calculated);
    return calculated;
  }

  const fetchingDetails = useCallback(async () => {
    try {
      const storedUsn = localStorage.getItem("userUsn");
      if (!storedUsn) throw new Error("USN not found in localStorage");

      const res = await fetch("/api/semesters");
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      const user = data.find((val: UserType) => val.usn === storedUsn);
      if (!user) throw new Error("User not found");

      const marks = user.subject.find((val: UserType) => Number(val.sem) === semesterId);
      if (!marks) {
        setNoMarks(true);
        setScores({});
        return;
      }

      const sgpa = calculateSgpa(marks, semesterId);
      if (sgpa !== null) setSgpa(semesterId, sgpa);

      setScores(marks);
      setNoMarks(false);
    } catch (err) {
      console.error(err);
    }
  }, [semesterId, setSgpa]);

  useEffect(() => {
    fetchingDetails();
  }, [fetchingDetails]);

  return (
    <div className="text-white flex flex-col text-lg sm:text-4xl font-serif justify-center items-center gap-y-4 bg-[#00000086] h-screen">
      {noMarks ? (
        <h1>Marks are not entered yet.</h1>
      ) : (
        <>
          {Object.entries(scores).map(([key, val]) => (
            <h1 key={key}>{formatSubjectName(key)}: {val}</h1>
          ))}
          <h1>SGPA: {sgpa}</h1>
        </>
      )}
    </div>
  );
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
