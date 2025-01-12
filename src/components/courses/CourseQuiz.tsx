import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface CourseQuizProps {
  title: string;
  questions: Question[];
  onComplete: (score: number) => void;
}

export function CourseQuiz({ title, questions, onComplete }: CourseQuizProps) {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    const correctAnswers = questions.filter(
      (q) => answers[q.id] === q.correctAnswer
    ).length;
    const score = (correctAnswers / questions.length) * 100;
    onComplete(score);
  };

  const isAnswerCorrect = (questionId: number, answerIndex: number) => {
    if (!submitted) return null;
    const question = questions.find((q) => q.id === questionId);
    return question?.correctAnswer === answerIndex;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground">
          Complete this quiz to move to the next video
        </p>
      </div>

      <div className="space-y-8">
        {questions.map((question) => (
          <Card key={question.id} className="p-6">
            <div className="space-y-4">
              <h3 className="font-medium">{question.question}</h3>
              <div className="space-y-2">
                {question.options.map((option, index) => {
                  const isCorrect = isAnswerCorrect(question.id, index);
                  return (
                    <button
                      key={index}
                      className={`w-full text-left p-4 rounded-lg border ${
                        answers[question.id] === index
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary"
                      } ${
                        submitted
                          ? isCorrect
                            ? "bg-green-100 border-green-500 dark:bg-green-900/20"
                            : answers[question.id] === index
                            ? "bg-red-100 border-red-500 dark:bg-red-900/20"
                            : ""
                          : ""
                      }`}
                      onClick={() => !submitted && setAnswers({ ...answers, [question.id]: index })}
                      disabled={submitted}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {!submitted && (
        <Button onClick={handleSubmit} className="w-full">
          Submit Quiz
        </Button>
      )}
    </div>
  );
}
