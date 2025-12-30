"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useQuiz } from "../QuizContext";
import type { Question } from "../QuizContext";
import { Check } from "lucide-react";
import Loading from "@/app/loading";
import Snowfall from "react-snowfall";
import Swal from "sweetalert2";

type Props = {
  allQuestions: Question[];
  questionsPerTest: number;
  index: number;
};

export default function QuestionClient({
  allQuestions,
  questionsPerTest,
  index,
}: Props) {
  const router = useRouter();
  const { questions, initializeQuiz, getAnswer, setAnswer, isHydrated } =
    useQuiz();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isHydrated) return;

    if (!questions && allQuestions.length > 0) {
      initializeQuiz(allQuestions, questionsPerTest);
    }
    setIsInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydrated, questions, allQuestions, questionsPerTest]);

  useEffect(() => {
    if (isNaN(index) || index < 1) {
      router.replace("/tes/1");
      return;
    }
    if (index > questionsPerTest) {
      router.replace(`/tes/${questionsPerTest}`);
    }
  }, [index, questionsPerTest, router]);

  const hasQuestions = !!questions && questions.length > 0;
  const currentQuestion = useMemo(
    () => (hasQuestions ? questions[index - 1] : undefined),
    [hasQuestions, questions, index]
  );
  const selectedAnswer = hasQuestions ? getAnswer(index - 1) : undefined;
  const totalQuestions = hasQuestions ? questions.length : questionsPerTest;
  const isLastQuestion = index === totalQuestions;

  const optionList = useMemo(() => {
    if (!currentQuestion) return [];
    const opsi = currentQuestion.opsi as any;
    if (Array.isArray(opsi)) {
      return opsi.map(
        (o: { teks: string; skor: Record<string, number> }, i: number) => ({
          key: i,
          teks: o.teks,
          skor: o.skor,
        })
      );
    }

    return Object.entries(opsi).map(([key, o]: [string, any]) => ({
      key,
      teks: o.teks,
      skor: o.skor as Record<string, number>,
    }));
  }, [currentQuestion]);

  const handleSelectOption = (
    optionKey: number | string,
    skor: Record<string, number>
  ) => {
    setAnswer(index - 1, { optionIndex: optionKey, skor });
  };

  const handlePrevious = () => {
    if (index > 1) {
      router.replace(`/tes/${index - 1}`);
    }
  };

  const handleNext = () => {
    if (index < totalQuestions) {
      router.replace(`/tes/${index + 1}`);
    }
  };

  const handleFinish = () => {
    Swal.fire({
      title: "Tes Selesai",
      text: "Apakah kamu ingin menyelesaikan tes?",
      showCancelButton: true,
      confirmButtonText: "Ya, Selesai",
      cancelButtonText: "Tidak, Kembali",
      confirmButtonColor: "oklch(62.7% 0.194 149.214)",
      cancelButtonColor: "#545454",
    }).then((result) => {
      if (result.isConfirmed) {
        router.replace("/hasil");
      }
    });
  };

  return !isInitialized || !hasQuestions || !currentQuestion ? (
    <Loading />
  ) : (
    <>
      <Snowfall
        style={{ zIndex: -999 }}
        enable3DRotation
        color="#545454"
        snowflakeCount={50}
      />
      <div className="flex flex-col justify-between w-full max-w-2xl p-6 mx-auto min-h-dvh">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">
              Pertanyaan {index} dari {totalQuestions}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 transition-all bg-[#545454] rounded-full"
              style={{ width: `${(index / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <h1 className="mb-6 text-2xl font-semibold">
            {index}. {currentQuestion.teks}
          </h1>

          <div className="space-y-3">
            {optionList.map((option) => (
              <button
                key={String(option.key)}
                onClick={() => {
                  handleSelectOption(option.key, option.skor);
                  setTimeout(() => {
                    if (!isLastQuestion) router.replace(`/tes/${index + 1}`);
                  }, 100);
                }}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedAnswer?.optionIndex === option.key
                    ? "border-[#545454] bg-[#545454]/20"
                    : "border-gray-300 bg-white/40 hover:border-gray-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer?.optionIndex === option.key
                        ? "border-[#545454] bg-[#545454]"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedAnswer?.optionIndex === option.key && (
                      <Check size={17} className="text-white" />
                    )}
                  </div>
                  <span className="text-gray-700">{option.teks}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={index === 1}
            className="px-6 py-2 font-medium text-gray-700 transition-all border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sebelumnya
          </button>

          {!isLastQuestion ? (
            <button onClick={handleNext} className="button">
              Selanjutnya
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-6 py-2 font-medium text-white transition-all bg-green-600 rounded-lg cursor-pointer hover:bg-green-800"
            >
              Selesai
            </button>
          )}
        </div>
      </div>
    </>
  );
}
