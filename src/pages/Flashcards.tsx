import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast";
import { Bot, Brain, Youtube, Plus, Minus, ArrowRight } from 'lucide-react';
import { generateFlashcards, generateFlashcardsFromYouTube, generateQuizFromYouTube } from '@/lib/gemini';
import { useNavigate } from 'react-router-dom';
import './Flashcards.css';

interface FlashcardType {
  term: string;
  definition: string;
}

const Flashcards = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);
  const [inputText, setInputText] = useState('');
  const [isYouTubeMode, setIsYouTubeMode] = useState(false);
  const [numCards, setNumCards] = useState(5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!inputText.trim()) {
        toast({
          title: "Error",
          description: "Please enter some text to generate flashcards.",
          variant: "destructive",
        });
        return;
      }

      setLoading(true);
      setError(null);
      
      let response;
      if (isYouTubeMode) {
        if (!inputText.includes('youtube.com') && !inputText.includes('youtu.be')) {
          throw new Error('Please enter a valid YouTube URL');
        }
        response = await generateFlashcardsFromYouTube(inputText);
      } else {
        response = await generateFlashcards(inputText);
      }

      if (!response || !Array.isArray(response)) {
        throw new Error('Failed to generate flashcards. Please try again.');
      }

      setFlashcards(response.slice(0, numCards));
      setInputText('');
      setCurrentIndex(0);
      setIsFlipped(false);
      
      toast({
        title: "Success!",
        description: "Flashcards generated successfully.",
      });
    } catch (err) {
      console.error('Error generating flashcards:', err);
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'Failed to generate flashcards. Please try again.',
        variant: "destructive",
      });
      setFlashcards([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateQuiz = async () => {
    if (!inputText.trim() || (!inputText.includes('youtube.com') && !inputText.includes('youtu.be'))) {
      toast({
        title: "Error",
        description: "Please enter a valid YouTube URL to create a quiz.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const questions = await generateQuizFromYouTube(inputText);
      
      if (!questions || !Array.isArray(questions) || questions.length === 0) {
        throw new Error('Failed to generate quiz questions. Please try again.');
      }

      // Store the questions in localStorage
      localStorage.setItem('youtubeQuiz', JSON.stringify(questions));
      
      toast({
        title: "Success!",
        description: "Quiz generated successfully. Redirecting to quiz page...",
      });

      navigate('/quiz');
    } catch (err) {
      console.error('Error generating quiz:', err);
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'Failed to generate quiz. Please try again.',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const incrementCards = () => {
    if (numCards < 10) {
      setNumCards(numCards + 1);
    }
  };

  const decrementCards = () => {
    if (numCards > 1) {
      setNumCards(numCards - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neon-purple to-black p-8">
      {/* Animated background blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2 text-center">AI Flashcards</h1>
        <p className="text-zinc-400 text-center mb-8">
          Generate flashcards from any topic or YouTube video
        </p>

        <Card className="p-6 bg-black/40 border-emerald-500/20 backdrop-blur-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              {isYouTubeMode ? (
                <Youtube className="h-6 w-6 text-red-500" />
              ) : (
                <Brain className="h-6 w-6 text-emerald-500" />
              )}
              <h2 className="text-xl font-semibold text-white">
                {isYouTubeMode ? 'Generate from YouTube' : 'Generate from Topic'}
              </h2>
            </div>

            <div className="flex justify-between items-center mb-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsYouTubeMode(!isYouTubeMode)}
                className="text-sm text-zinc-400 hover:text-white"
              >
                Switch to {isYouTubeMode ? 'Topic Mode' : 'YouTube Mode'}
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-zinc-400">Cards:</span>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={decrementCards}
                  disabled={numCards <= 1}
                  className="h-8 w-8"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-white w-8 text-center">{numCards}</span>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={incrementCards}
                  disabled={numCards >= 10}
                  className="h-8 w-8"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={isYouTubeMode ? "Enter YouTube video URL..." : "Enter your topic or concept..."}
                className="flex-1 bg-black/40 border-emerald-500/20 text-white placeholder:text-zinc-500"
                disabled={loading}
              />
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-emerald-500 text-black hover:bg-emerald-600"
              >
                {loading ? (
                  <>
                    <Bot className="w-5 h-5 animate-spin mr-2" />
                    Generating...
                  </>
                ) : (
                  'Generate'
                )}
              </Button>
              {isYouTubeMode && (
                <Button
                  type="button"
                  onClick={handleCreateQuiz}
                  disabled={loading}
                  className="bg-purple-500 text-white hover:bg-purple-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Create Quiz
                </Button>
              )}
            </div>
          </form>
        </Card>

        {/* Flashcards Display */}
        {flashcards.length > 0 && (
          <div className="mt-8">
            <div className="flashcard-container">
              <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={toggleFlip}>
                <div className="flashcard-front">
                  <h3>Question</h3>
                  <p>{flashcards[currentIndex].term}</p>
                  <div className="flip-hint">Click to flip</div>
                </div>
                <div className="flashcard-back">
                  <h3>Answer</h3>
                  <p>{flashcards[currentIndex].definition}</p>
                  <div className="flip-hint">Click to flip back</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center gap-4 mt-4">
              <Button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                variant="outline"
                className="text-white"
              >
                Previous
              </Button>
              <span className="text-white">
                Card {currentIndex + 1} of {flashcards.length}
              </span>
              <Button
                onClick={handleNext}
                disabled={currentIndex === flashcards.length - 1}
                variant="outline"
                className="text-white"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flashcards;
