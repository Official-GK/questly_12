import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Trophy, Clock, Star, Activity } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Link } from "react-router-dom";
import { Zap, Bot, Youtube } from "lucide-react";

interface Course {
  id: number;
  title: string;
  progress: number;
  totalQuizzes: number;
  completedQuizzes: number;
  lastAccessed: string;
  category: string;
  route: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [courses] = useState<Course[]>([
    {
      id: 1,
      title: "Introduction to React",
      progress: 75,
      totalQuizzes: 10,
      completedQuizzes: 7,
      lastAccessed: "2 hours ago",
      category: "Web Development",
      route: "/course/react-intro"
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      progress: 45,
      totalQuizzes: 12,
      completedQuizzes: 5,
      lastAccessed: "1 day ago",
      category: "Programming",
      route: "/course/advanced-javascript"
    },
    {
      id: 3,
      title: "UI/UX Design Basics",
      progress: 90,
      totalQuizzes: 8,
      completedQuizzes: 7,
      lastAccessed: "3 days ago",
      category: "Design",
      route: "/course/uiux-basics"
    },
    {
      id: 4,
      title: "Python for Data Science",
      progress: 60,
      totalQuizzes: 15,
      completedQuizzes: 9,
      lastAccessed: "4 hours ago",
      category: "Data Science",
      route: "/course/python-data-science"
    },
    {
      id: 5,
      title: "Machine Learning Fundamentals",
      progress: 30,
      totalQuizzes: 20,
      completedQuizzes: 6,
      lastAccessed: "1 week ago",
      category: "Artificial Intelligence",
      route: "/course/machine-learning"
    },
    {
      id: 6,
      title: "Mobile App Development",
      progress: 85,
      totalQuizzes: 12,
      completedQuizzes: 10,
      lastAccessed: "5 days ago",
      category: "Mobile Development",
      route: "/course/mobile-dev"
    },
    {
      id: 7,
      title: "Cloud Computing Essentials",
      progress: 40,
      totalQuizzes: 14,
      completedQuizzes: 6,
      lastAccessed: "2 days ago",
      category: "Cloud Computing",
      route: "/course/cloud-computing"
    },
    {
      id: 8,
      title: "Cybersecurity Basics",
      progress: 70,
      totalQuizzes: 16,
      completedQuizzes: 11,
      lastAccessed: "6 hours ago",
      category: "Security",
      route: "/course/cybersecurity"
    },
    {
      id: 9,
      title: "Database Management",
      progress: 55,
      totalQuizzes: 10,
      completedQuizzes: 6,
      lastAccessed: "3 days ago",
      category: "Database",
      route: "/course/database-management"
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neon-purple to-black p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-white text-center">
          Your Learning Dashboard
        </h1>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 bg-black/40 border-emerald-500/20 flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Badges</h3>
              <p className="text-zinc-400">5 Earned</p>
            </div>
          </Card>

          <Card className="p-6 bg-black/40 border-emerald-500/20 flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Star className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Achievements</h3>
              <p className="text-zinc-400">3 Unlocked</p>
            </div>
          </Card>

          <Card className="p-6 bg-black/40 border-emerald-500/20 flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Zap className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Level</h3>
              <p className="text-zinc-400">XP: 750/1000</p>
            </div>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card className="p-6 bg-black/40 border-emerald-500/20">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Current Level Progress</span>
              <span className="text-zinc-400">75%</span>
            </div>
            <div className="h-2 bg-black/40 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '75%' }} />
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
          <Card className="p-6 bg-black/40 border-emerald-500/20">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-white">Completed AI Summary</h3>
                  <p className="text-zinc-400 text-sm">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <Youtube className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-white">Finished Video Quiz</h3>
                  <p className="text-zinc-400 text-sm">5 hours ago</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/summary">
            <Card className="p-6 bg-black/40 border-emerald-500/20 hover:bg-black/60 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Bot className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Create Summary</h3>
                  <p className="text-zinc-400">Generate a new AI summary</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/quiz">
            <Card className="p-6 bg-black/40 border-emerald-500/20 hover:bg-black/60 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <Youtube className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Take Quiz</h3>
                  <p className="text-zinc-400">Start a new video quiz</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div 
              key={course.id}
              onClick={() => navigate(course.route)}
              className="cursor-pointer"
            >
              <SpotlightCard className="transform transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-xl text-emerald-400">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center text-sm text-zinc-400">
                    <span>{course.category}</span>
                    <span>{course.lastAccessed}</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-400">{course.progress}% Complete</span>
                    <span className="text-zinc-400">
                      {course.completedQuizzes}/{course.totalQuizzes} Quizzes
                    </span>
                  </div>
                </CardContent>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;