import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast";
import { Bot, Youtube, CheckCircle2, XCircle } from 'lucide-react';
import { generateQuizFromYouTube } from '@/lib/gemini';
import { useNavigate } from 'react-router-dom';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const Quiz = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  // Load stored quiz on component mount
  useEffect(() => {
    const storedQuiz = localStorage.getItem('youtubeQuiz');
    if (storedQuiz) {
      try {
        const parsedQuiz = JSON.parse(storedQuiz);
        if (Array.isArray(parsedQuiz) && parsedQuiz.length > 0) {
          setQuestions(parsedQuiz);
          localStorage.removeItem('youtubeQuiz'); // Clear stored quiz
          return;
        }
      } catch (error) {
        console.error('Error parsing stored quiz:', error);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clean up the URL first
    const cleanUrl = url.trim();
    
    // More comprehensive URL validation
    try {
      const urlObj = new URL(cleanUrl);
      if (!urlObj.hostname.includes('youtube.com') && !urlObj.hostname.includes('youtu.be')) {
        toast({
          title: "Invalid URL",
          description: "Please enter a valid YouTube URL (e.g., https://www.youtube.com/watch?v=... or https://youtu.be/...)",
          variant: "destructive",
        });
        return;
      }
    } catch (error) {
      toast({
        title: "Invalid URL",
        description: "Please enter a complete URL including https:// or http://",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      console.log('Generating quiz for URL:', cleanUrl);
      const quiz = await generateQuizFromYouTube(cleanUrl);
      
      if (!quiz || !Array.isArray(quiz) || quiz.length === 0) {
        throw new Error('Failed to generate quiz questions');
      }
      
      setQuestions(quiz);
      setCurrentQuestion(0);
      setScore(0);
      setShowResult(false);
      setSelectedAnswer(null);
      
      toast({
        title: "Success!",
        description: "Quiz generated successfully. Good luck!",
      });
    } catch (error) {
      console.error('Error generating quiz:', error);
      let errorMessage = "Failed to generate quiz. Please try again.";
      
      if (error instanceof Error) {
        // Handle specific error cases
        if (error.message.includes('Invalid YouTube video ID')) {
          errorMessage = "Please check your YouTube URL and try again.";
        } else if (error.message.includes('quota exceeded')) {
          errorMessage = "YouTube API quota exceeded. Please try again later.";
        } else if (error.message.includes('API key')) {
          errorMessage = "API configuration error. Please contact support.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const handleTryAgain = () => {
    navigate('/flashcards');
  };

  // Show loading state while questions are being loaded
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neon-purple to-black p-4 flex items-center justify-center">
        <Card className="p-6 bg-black/40 border-emerald-500/20">
          <div className="flex items-center space-x-2">
            <Bot className="w-6 h-6 animate-spin text-emerald-500" />
            <span className="text-white">Loading quiz...</span>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neon-purple to-black p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">AI Video Quiz</h1>
        <p className="text-zinc-400 text-center mb-8">
          Test your knowledge from the video content
        </p>

        {!questions.length ? (
          <Card className="p-6 bg-black/40 border-emerald-500/20">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste YouTube URL here..."
                  className="flex-1 bg-black/40 border-emerald-500/20 text-zinc-200 placeholder:text-zinc-500"
                />
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="bg-emerald-500 text-black hover:bg-emerald-600"
                >
                  {loading ? (
                    <>
                      <Bot className="w-5 h-5 animate-spin mr-2" />
                      Analyzing Video...
                    </>
                  ) : (
                    <>
                      <Youtube className="w-5 h-5 mr-2" />
                      Create Quiz
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        ) : showResult ? (
          <Card className="p-6 bg-black/40 border-emerald-500/20">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-white">Quiz Complete!</h2>
              <p className="text-zinc-400">
                Your score: {score} out of {questions.length}
              </p>
              <Button
                onClick={handleTryAgain}
                className="bg-emerald-500 text-black hover:bg-emerald-600"
              >
                Back to Flashcards
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="p-6 bg-black/40 border-emerald-500/20">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-zinc-400">
                  Score: {score}
                </span>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl text-white font-semibold">
                  {questions[currentQuestion].question}
                </h2>

                <div className="grid grid-cols-1 gap-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      disabled={selectedAnswer !== null}
                      className={`justify-start text-left p-4 h-auto ${
                        selectedAnswer === option
                          ? option === questions[currentQuestion].correctAnswer
                            ? 'bg-green-500/20 border-green-500/40 text-green-400'
                            : 'bg-red-500/20 border-red-500/40 text-red-400'
                          : selectedAnswer !== null && option === questions[currentQuestion].correctAnswer
                            ? 'bg-green-500/20 border-green-500/40 text-green-400'
                            : 'bg-black/40 border-emerald-500/20 text-zinc-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {selectedAnswer === option ? (
                          option === questions[currentQuestion].correctAnswer ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <XCircle className="w-5 h-5" />
                          )
                        ) : selectedAnswer !== null && option === questions[currentQuestion].correctAnswer ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : null}
                        <span>{option}</span>
                      </div>
                    </Button>
                  ))}
                </div>

                {selectedAnswer && (
                  <>
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400">
                      <p className="text-sm">{questions[currentQuestion].explanation}</p>
                    </div>
                    <Button
                      onClick={handleNext}
                      className="w-full bg-emerald-500 text-black hover:bg-emerald-600"
                    >
                      {currentQuestion < questions.length - 1 ? 'Next Question' : 'Show Results'}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Quiz;
