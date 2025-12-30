"use client";

import { Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useQuiz } from "./tes/QuizContext";
import Snowfall from "react-snowfall";

export default function Home() {
  const { clearQuiz } = useQuiz();
  useEffect(() => {
    clearQuiz(false);
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
      <div className="flex flex-col items-center justify-between min-h-dvh">
        <main className="flex flex-col items-center justify-center m-auto">
          <h1 className="text-4xl font-semibold text-center text-black max-md:text-3xl">
            Selamat Datang di<br /> Tes{" "}
            <span className="text-(--male-blue)">Kepri</span>
            <span className="text-(--base-text)">b</span>
            <span className="text-(--female-pink)">adian</span>
          </h1>
          <Image
            src="/images/gender.png"
            alt="Gender Illustration"
            width={200}
            height={200}
            className="my-8"
          />
          <p className="max-w-3xl font-medium text-center">
            Tes ini bertujuan untuk mengecek seberapa banyak sifat maskulin dan
            feminin yang ada dalam dirimu. Klik tombol &quot;Mulai Tes&quot;
            untuk memulai tes.
          </p>

          <Link href="/tes" className="my-8 button">
            Mulai Tes
          </Link>

          <div
            className="flex items-center gap-1 cursor-pointer hover:underline hover:text-black"
            onClick={() => {
              Swal.fire({
                title: "Tentang Tes Ini",
                text: "Tes ini hanya untuk hiburan dan lucu lucuan saja. Walaupun mungkin beberapa soal ada benarnya juga sih hehe. Tapi jangan terlalu dijadiin acuan hasil sebenarnya ya. Dan jangan diambil serius!",
                confirmButtonText: "Tutup",
                confirmButtonColor: "#545454",
              });
            }}
          >
            <p>Tentang tes ini</p>
            <Info size={17} />
          </div>
        </main>
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
      </div>
    </>
  );
}
