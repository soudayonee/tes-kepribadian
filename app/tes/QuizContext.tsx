"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export type Question = {
  id: string;
  teks: string;

  opsi:
    | Array<{
        teks: string;
        skor: Record<string, number>;
      }>
    | Record<
        string,
        {
          teks: string;
          skor: Record<string, number>;
        }
      >;
};

type QuizContextType = {
  questions: Question[] | null;

  answers: Record<
    number,
    {
      optionIndex: number | string;
      skor: Record<string, number>;
    }
  >;
  seed: number | null;
  isHydrated: boolean;
  setQuestions: (questions: Question[]) => void;
  setAnswer: (
    questionIndex: number,
    value: { optionIndex: number | string; skor: Record<string, number> }
  ) => void;
  getAnswer: (
    questionIndex: number
  ) =>
    | { optionIndex: number | string; skor: Record<string, number> }
    | undefined;
  clearQuiz: (backToRoot?: boolean) => void;
  initializeQuiz: (allQuestions: Question[], questionsPerTest: number) => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function seededShuffle<T>(array: T[], seed: number): T[] {
  const result = [...array];
  let currentSeed = seed;

  for (let i = result.length - 1; i > 0; i--) {
    currentSeed++;
    const j = Math.floor(seededRandom(currentSeed) * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export function QuizProvider({ children }: { children: ReactNode }) {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [fetchQuestions, setFetchQuestions] = useState<boolean>(false);
  const [answers, setAnswers] = useState<
    Record<
      number,
      { optionIndex: number | string; skor: Record<string, number> }
    >
  >({});
  const [seed, setSeed] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const storedQuestions = sessionStorage.getItem("quiz_questions");
    const storedAnswers = sessionStorage.getItem("quiz_answers");
    const storedSeed = sessionStorage.getItem("quiz_seed");

    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }

    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
    }

    if (storedSeed) {
      setSeed(parseInt(storedSeed));
    }

    setFetchQuestions(true);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isMounted && questions) {
      sessionStorage.setItem("quiz_questions", JSON.stringify(questions));
    }
  }, [questions, isMounted]);

  useEffect(() => {
    if (isMounted) {
      sessionStorage.setItem("quiz_answers", JSON.stringify(answers));
    }
  }, [answers, isMounted]);

  useEffect(() => {
    if (isMounted && seed !== null) {
      sessionStorage.setItem("quiz_seed", seed.toString());
    }
  }, [seed, isMounted]);

  const handleInitializeQuiz = (
    allQuestions: Question[],
    questionsPerTest: number
  ) => {
    const newSeed = Date.now() + Math.floor(Math.random() * 10000);
    setSeed(newSeed);

    const shuffled = seededShuffle(allQuestions, newSeed);
    const selected = shuffled.slice(0, questionsPerTest);
    setQuestions(selected);
  };

  const handleSetQuestions = (newQuestions: Question[]) => {
    if (!fetchQuestions) return;
    setQuestions(newQuestions);
  };

  const handleSetAnswer = (
    questionIndex: number,
    value: { optionIndex: number | string; skor: Record<string, number> }
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: value,
    }));
  };

  const handleGetAnswer = (
    questionIndex: number
  ):
    | { optionIndex: number | string; skor: Record<string, number> }
    | undefined => {
    return answers[questionIndex];
  };

  const handleClearQuiz = (backToRoot: boolean = true) => {
    setQuestions(null);
    setAnswers({});
    setSeed(null);
    sessionStorage.removeItem("quiz_questions");
    sessionStorage.removeItem("quiz_answers");
    sessionStorage.removeItem("quiz_seed");
    if (backToRoot) router.replace("/");
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        answers,
        seed,
        setQuestions: handleSetQuestions,
        setAnswer: handleSetAnswer,
        getAnswer: handleGetAnswer,
        clearQuiz: handleClearQuiz,
        initializeQuiz: handleInitializeQuiz,
        isHydrated,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz harus digunakan dalam QuizProvider");
  }
  return context;
}
