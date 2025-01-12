import type { TopicRecommendation } from '@/types/learning';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

interface UserContext {
  learningGoals: {
    id: string;
    title: string;
    description: string;
    priority: string;
    status: string;
  }[];
  topicEngagement: {
    topicId: string;
    timeSpent: number;
    lastAccessed: string;
    completionRate: number;
  }[];
  userInterests: {
    primaryInterests: string[];
    secondaryInterests: string[];
    strugglingTopics: string[];
    strongTopics: string[];
  };
  completedTopics: string[];
  currentLevel: 'beginner' | 'intermediate' | 'advanced';
}

export async function generateTopicRecommendations(
  userContext: UserContext
): Promise<TopicRecommendation[]> {
  try {
    const prompt = `Generate personalized topic recommendations for a student with the following context:
    - Primary interests: ${userContext.userInterests.primaryInterests.join(', ')}
    - Current level: ${userContext.currentLevel}
    - Learning goals: ${userContext.learningGoals.map(g => g.title).join(', ')}
    - Struggling with: ${userContext.userInterests.strugglingTopics.join(', ')}
    
    Provide 4 topic recommendations in JSON format with:
    1. id (unique string)
    2. name (topic name)
    3. description (brief explanation)
    4. matchScore (0-100)
    5. difficulty (easy/medium/hard)
    6. prerequisites (array of topics)
    7. estimatedTimeMinutes (number)`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse and validate recommendations
    const recommendations: TopicRecommendation[] = JSON.parse(text);
    
    return recommendations.map(rec => ({
      ...rec,
      matchScore: Math.min(100, Math.max(0, rec.matchScore)), // Ensure score is 0-100
      difficulty: rec.difficulty as 'easy' | 'medium' | 'hard'
    }));
  } catch (error) {
    console.error('Error generating topic recommendations:', error);
    // Return some default recommendations if AI generation fails
    return getDefaultRecommendations(userContext);
  }
}

function getDefaultRecommendations(userContext: UserContext): TopicRecommendation[] {
  const defaultTopics = [
    {
      id: '1',
      name: userContext.userInterests.primaryInterests[0] || 'Getting Started',
      description: 'Introduction to key concepts and fundamentals',
      matchScore: 90,
      difficulty: 'easy' as const,
      prerequisites: [],
      estimatedTimeMinutes: 30
    },
    {
      id: '2',
      name: 'Building Blocks',
      description: 'Essential components and patterns',
      matchScore: 85,
      difficulty: 'easy' as const,
      prerequisites: ['Getting Started'],
      estimatedTimeMinutes: 45
    },
    {
      id: '3',
      name: 'Common Challenges',
      description: 'Addressing frequent problems and solutions',
      matchScore: 80,
      difficulty: 'medium' as const,
      prerequisites: ['Building Blocks'],
      estimatedTimeMinutes: 60
    },
    {
      id: '4',
      name: 'Advanced Concepts',
      description: 'Deep dive into complex topics',
      matchScore: 75,
      difficulty: 'hard' as const,
      prerequisites: ['Common Challenges'],
      estimatedTimeMinutes: 90
    }
  ];

  return defaultTopics;
}
