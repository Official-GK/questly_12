import { GoogleGenerativeAI } from '@google/generative-ai';

// API Keys
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('Gemini API key is not configured');
}

if (!YOUTUBE_API_KEY) {
  console.error('YouTube API key is not configured');
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

interface FlashcardResponse {
  term: string;
  definition: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface SummaryResponse {
  mainSummary: string;
  keyPoints: string[];
  keywordAnalysis: { word: string; relevance: string }[];
  readingTime: string;
}

// Function to extract video ID from URL
const getVideoId = (url: string): string => {
  try {
    console.log('Extracting video ID from URL:', url);
    
    // Ensure URL is properly formatted
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      throw new Error('URL must start with http:// or https://');
    }

    const urlObj = new URL(url);
    let videoId = '';
    
    // Handle youtu.be format (e.g., https://youtu.be/dQw4w9WgXcQ)
    if (urlObj.hostname === 'youtu.be') {
      videoId = urlObj.pathname.slice(1);
      console.log('Extracted video ID from youtu.be format:', videoId);
    }
    // Handle youtube.com/embed format (e.g., https://www.youtube.com/embed/dQw4w9WgXcQ)
    else if (urlObj.hostname.includes('youtube.com') && urlObj.pathname.startsWith('/embed/')) {
      videoId = urlObj.pathname.split('/embed/')[1];
      console.log('Extracted video ID from embed format:', videoId);
    }
    // Handle youtube.com/?v= format (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)
    else if (urlObj.hostname.includes('youtube.com')) {
      videoId = urlObj.searchParams.get('v') || '';
      console.log('Extracted video ID from youtube.com format:', videoId);
    }
    
    // Clean up the video ID
    videoId = videoId.split('&')[0]; // Remove any additional parameters
    videoId = videoId.split('?')[0]; // Remove any query parameters
    videoId = videoId.split('#')[0]; // Remove any hash
    
    // Validate video ID format (should be 11 characters)
    if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      throw new Error('Invalid YouTube video ID. Please check your URL format.');
    }
    
    return videoId;
  } catch (error) {
    console.error('Error extracting video ID:', error);
    if (error instanceof Error) {
      if (error.message.includes('Invalid URL')) {
        throw new Error('Please enter a complete URL including https:// or http://');
      }
      throw error;
    }
    throw new Error('Failed to extract video ID from URL');
  }
};

// Function to get video details from YouTube API
const getVideoDetails = async (videoId: string) => {
  if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY === 'your_youtube_api_key_here') {
    throw new Error('YouTube API key is not configured. Please set VITE_YOUTUBE_API_KEY in your .env file.');
  }

  console.log('Attempting to fetch video details for ID:', videoId);

  try {
    // Use the correct API endpoint
    const url = new URL('https://youtube.googleapis.com/youtube/v3/videos');
    url.searchParams.append('part', 'snippet');
    url.searchParams.append('id', videoId);
    url.searchParams.append('key', YOUTUBE_API_KEY);

    console.log('Making request to YouTube API...');
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    const data = await response.json();
    console.log('Response status:', response.status);

    if (!response.ok) {
      if (data.error) {
        console.error('YouTube API error details:', JSON.stringify(data.error, null, 2));
        
        // Handle specific error cases
        if (data.error.code === 403) {
          if (data.error.message.includes('quota')) {
            throw new Error('YouTube API quota exceeded. Please try again later.');
          }
          throw new Error('YouTube API key is not authorized. Please check API key configuration.');
        }
        
        if (data.error.code === 400) {
          if (data.error.message.includes('API key not valid')) {
            throw new Error('Invalid YouTube API key. Please check your API key configuration in the .env file.');
          }
          throw new Error('Invalid request to YouTube API. Please check the video URL.');
        }

        throw new Error(`YouTube API error: ${data.error.message || 'Unknown error'}`);
      }
      throw new Error(`Failed to fetch video details. Status: ${response.status}`);
    }
    
    if (!data.items || data.items.length === 0) {
      throw new Error('Video not found on YouTube. Please check the URL and try again.');
    }
    
    console.log('Successfully fetched video details');
    return {
      title: data.items[0].snippet.title,
      description: data.items[0].snippet.description,
      channelTitle: data.items[0].snippet.channelTitle,
    };
  } catch (error) {
    console.error('Full error details:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch video details. Please check your YouTube URL and try again.');
  }
};

// Function to generate flashcards from text
export const generateFlashcards = async (topic: string): Promise<FlashcardResponse[]> => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured. Please check your environment variables.');
  }

  try {
    const prompt = `Create educational flashcards for studying "${topic}". 
    Create exactly 5 flashcards that test understanding of key concepts.
    Format the response as a JSON array. Each flashcard must have:
    - 'term': a clear question or concept
    - 'definition': a complete and accurate explanation
    
    Example format:
    [
      {
        "term": "What is photosynthesis?",
        "definition": "The process by which plants convert sunlight into chemical energy"
      }
    ]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const flashcards = JSON.parse(text);
      if (!Array.isArray(flashcards)) {
        throw new Error('Invalid response format');
      }
      return flashcards;
    } catch (error) {
      console.error('Error parsing flashcards:', error);
      throw new Error('Failed to generate valid flashcards. Please try again.');
    }
  } catch (error) {
    console.error('Error generating flashcards:', error);
    throw new Error('Failed to generate flashcards. Please try again.');
  }
};

// Function to generate flashcards from YouTube video
export const generateFlashcardsFromYouTube = async (url: string): Promise<FlashcardResponse[]> => {
  try {
    const videoId = getVideoId(url);
    const videoDetails = await getVideoDetails(videoId);
    
    const prompt = `Create educational flashcards based on this YouTube video:
    Title: ${videoDetails.title}
    Channel: ${videoDetails.channelTitle}
    Description: ${videoDetails.description}

    Create 5 flashcards that test understanding of the key concepts from this video.
    Format the response as a JSON array. Each flashcard must have:
    - 'term': a clear question about the video content
    - 'definition': the correct answer with explanation
    
    Example format:
    [
      {
        "term": "What is the main topic discussed in the video?",
        "definition": "The video primarily discusses [topic] by explaining [key points]"
      }
    ]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const flashcards = JSON.parse(text);
      if (!Array.isArray(flashcards)) {
        throw new Error('Invalid response format');
      }
      return flashcards;
    } catch (error) {
      console.error('Error parsing flashcards:', error);
      throw new Error('Failed to generate valid flashcards. Please try again.');
    }
  } catch (error) {
    console.error('Error generating flashcards from YouTube:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to generate flashcards. Please try again.');
  }
};

// Function to generate quiz from YouTube video
export const generateQuizFromYouTube = async (url: string): Promise<QuizQuestion[]> => {
  try {
    console.log('Getting video details...');
    const videoDetails = await getVideoDetails(getVideoId(url));
    
    const prompt = `Create a multiple-choice quiz based on this YouTube video:
    Title: ${videoDetails.title}
    Channel: ${videoDetails.channelTitle}
    Description: ${videoDetails.description}

    Create 5 multiple-choice questions that test understanding of the video content.
    Return a JSON array where each question has these exact fields:
    - question: string
    - options: array of 4 strings
    - correctAnswer: string (must match one option exactly)
    - explanation: string

    Important:
    1. Return ONLY the raw JSON array, no markdown or code blocks
    2. Each question must have exactly 4 unique options
    3. The correctAnswer must match one of the options exactly
    4. Keep explanations clear and concise

    Example format (but with your own questions):
    [{"question": "Example?", "options": ["A", "B", "C", "D"], "correctAnswer": "A", "explanation": "Because..."}]`;

    const result = await model.generateContent(prompt);
    if (!result || !result.response) {
      throw new Error('Failed to generate quiz content');
    }

    const text = result.response.text();
    console.log('Raw response:', text);
    
    try {
      // Clean up the response text
      const cleanJson = text
        .replace(/```json\n?/g, '') // Remove ```json
        .replace(/```\n?/g, '')     // Remove closing ```
        .trim();                    // Remove extra whitespace
      
      console.log('Cleaned JSON:', cleanJson);
      
      const questions = JSON.parse(cleanJson);
      if (!Array.isArray(questions)) {
        throw new Error('Response is not an array');
      }
      
      // Normalize and validate each question
      questions.forEach((q, index) => {
        if (!q.question || !Array.isArray(q.options) || !q.correctAnswer || !q.explanation) {
          throw new Error(`Question ${index + 1} is missing required fields`);
        }
        
        // Ensure exactly 4 options
        if (q.options.length !== 4) {
          throw new Error(`Question ${index + 1} must have exactly 4 options`);
        }
        
        // Check for duplicate options
        const uniqueOptions = new Set(q.options);
        if (uniqueOptions.size !== 4) {
          throw new Error(`Question ${index + 1} has duplicate options`);
        }
        
        // Exact match check for correct answer
        const correctAnswerIndex = q.options.findIndex(
          option => option === q.correctAnswer
        );
        
        if (correctAnswerIndex === -1) {
          console.error(`Question ${index + 1} validation failed:`, {
            options: q.options,
            correctAnswer: q.correctAnswer
          });
          throw new Error(`Question ${index + 1}'s correct answer does not match any option exactly`);
        }
      });
      
      return questions;
    } catch (error) {
      console.error('Error parsing quiz questions:', error);
      console.error('Raw response:', text);
      if (error instanceof SyntaxError) {
        throw new Error('Failed to parse quiz response. Please try again.');
      }
      throw error;
    }
  } catch (error) {
    console.error('Error generating quiz from YouTube:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to generate quiz. Please try again.');
  }
};

// Function to generate summary
export const generateSummary = async (text: string): Promise<string> => {
  if (!text) {
    throw new Error('No text provided for summarization');
  }

  try {
    const prompt = `Summarize the following text in a clear and concise way: ${text}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating summary:', error);
    throw new Error('Failed to generate summary. Please try again.');
  }
};
