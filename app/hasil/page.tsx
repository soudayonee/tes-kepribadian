"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useQuiz } from "../tes/QuizContext";
import { useRouter } from "next/navigation";
import Snowfall from "react-snowfall";
import { Home, MoreHorizontal, RefreshCwIcon } from "lucide-react";

interface GenderChartProps {
  percentage: number;
  icon: string;
  label: string;
  score: number;
}

function GenderChart({ percentage, icon, label, score }: GenderChartProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-xl font-semibold">{label}</h3>

      <div className="relative w-48 h-48">
        <div className="absolute inset-0 opacity-50">
          <Image
            src={icon}
            alt={`${label} background`}
            fill
            className="object-contain"
          />
        </div>

        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath: `inset(${100 - percentage}% 0 0 0)`,
          }}
        >
          <Image
            src={icon}
            alt={`${label} indicator`}
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="text-center">
        <p className="text-3xl font-bold">{percentage.toFixed(1)}%</p>
        <p className="text-gray-600">Score: {score}</p>
      </div>
    </div>
  );
}

export default function Result() {
  const [getResults, setGetResults] = useState<{
    maleTotal: number;
    femaleTotal: number;
    malePercentage: number;
    femalePercentage: number;
  } | null>(null);
  const [resultSubText, setResultSubText] = useState<string>("");
  const router = useRouter();

  const { clearQuiz } = useQuiz();

  useEffect(() => {
    const quizAnswers = sessionStorage.getItem("quiz_answers");

    if (!quizAnswers) return;

    const { maleTotal, femaleTotal } = Object.values(
      JSON.parse(quizAnswers)
    ).reduce(
      (acc: any, { skor }: any) => {
        acc.maleTotal += (skor?.male ?? 0) * 2;
        acc.femaleTotal += (skor?.female ?? 0) * 2;
        return acc;
      },
      { maleTotal: 0, femaleTotal: 0 }
    );

    const total = maleTotal + femaleTotal;

    if (!total || total === 0) return router.replace("/");

    const malePercentage = total > 0 ? (maleTotal / total) * 100 : 0;
    const femalePercentage = total > 0 ? (femaleTotal / total) * 100 : 0;

    setGetResults({
      maleTotal,
      femaleTotal,
      malePercentage,
      femalePercentage,
    });

    setResultSubText(
      malePercentage > femalePercentage
        ? "Jika kamu adalah seorang perempuan, kamu memiliki sifat maskulin yang lebih besar dari sifat feminim yang seharusnya dimiliki (tomboy).\nJika kamu adalah seorang laki-laki, kamu memiliki sifat maskulin yang seharusnya dimiliki laki laki (jangan jadi femboy)"
        : femalePercentage > malePercentage
        ? "Jika kamu adalah seorang laki-laki, kamu memiliki sifat feminim yang lebih besar dari sifat maskulin yang seharusnya dimiliki (femboy).\nJika kamu adalah seorang perempuan, kamu memiliki sifat feminim yang seharusnya dimiliki perempuan (jangan jadi tomboy)"
        : "Kamu memiliki keseimbangan sifat maskulin dan feminim yang sama dalam dirimu.\nWah, kamu benar-benar unik!😊\n(jangan jadi tomboy ataupun femboy)"
    );
  }, []);

  return (
    <>
      <Snowfall
        style={{ zIndex: -99999 }}
        enable3DRotation
        color="#00aee9"
        snowflakeCount={25}
      />
      <Snowfall
        style={{ zIndex: -99999 }}
        enable3DRotation
        color="#e00056"
        snowflakeCount={25}
      />
      <div className="flex flex-col items-center justify-between h-full max-w-6xl min-h-screen p-8 mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-center max-md:text-3xl">
          Hasil dari Tes Kamu
        </h1>
        <p
          className="text-center"
          dangerouslySetInnerHTML={{
            __html: resultSubText.replace(/\n/g, "<br />"),
          }}
        />

        {getResults ? (
          <>
            <div className="grid w-full grid-cols-1 gap-12 mt-12 md:grid-cols-2">
              <GenderChart
                percentage={getResults.malePercentage}
                icon="/male.svg"
                label="Maskulin"
                score={getResults.maleTotal}
              />

              <GenderChart
                percentage={getResults.femalePercentage}
                icon="/female.svg"
                label="Feminin"
                score={getResults.femaleTotal}
              />
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="flex items-center gap-3 mt-8 button"
                  onClick={() => {
                    clearQuiz(false);
                    router.replace("/tes");
                  }}
                >
                  Tes Ulang <RefreshCwIcon size={20} />
                </button>
                <button
                  type="button"
                  className="flex items-center gap-3 mt-8 button"
                  onClick={() => clearQuiz()}
                >
                  Kembali <Home size={20} />
                </button>
              </div>
              <a
                href="https://tes-cabul.vercel.app?source=tes-kepribadian"
                className="flex items-center gap-3 button"
                rel="noopener noreferrer"
              >
                Coba Tes Lainnya <MoreHorizontal size={20} />
              </a>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">
            Belum ada hasil tes yang tersedia.
          </p>
        )}
      </div>
      <footer>
        <p className="py-4 text-[0.9rem] text-center">
          Created by{" "}
          <a
            href="https://naufaladityayahya.me"
            target="_blank"
            className="hover:underline"
          >
            Naufal AY
          </a>{" "}
          &copy; 2025
        </p>
      </footer>
    </>
  );
}
