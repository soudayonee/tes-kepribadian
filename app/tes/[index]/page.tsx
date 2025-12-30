import fs from "fs";
import path from "path";
import QuestionClient from "./QuestionClient";

const QUESTIONS_PER_TEST = 5;

export default async function Question({
  params,
}: {
  params: Promise<{ index: string }>;
}) {
  const { index } = await params;
  const pageIndex = Number(index);

  const data = fs.readFileSync(
    path.join(process.cwd(), "./private/questions.json"),
    "utf-8"
  );
  const allQuestions = JSON.parse(data).pertanyaan;

  return (
    <QuestionClient
      allQuestions={allQuestions}
      questionsPerTest={QUESTIONS_PER_TEST}
      index={pageIndex}
    />
  );
}
