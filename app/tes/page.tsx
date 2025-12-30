"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useQuiz } from "./QuizContext";

export default function Test() {
  const [countDown, setCountDown] = useState(5);
  const { clearQuiz } = useQuiz();
  const router = useRouter();

  useEffect(() => {
    clearQuiz(false);
    if (countDown > 0) {
      const timer = setTimeout(() => {
        setCountDown(countDown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    if (countDown === 0) return router.push("/tes/1");
  }, [countDown, router]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-dvh">
      <h1 className="text-2xl font-semibold">Tes akan dimulai dalam</h1>
      <p className="text-4xl font-medium text-black">
        {countDown >= 1 ? countDown : "Tes Dimulai!"}
      </p>
    </div>
  );
}
