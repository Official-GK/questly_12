import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Globe, Github, Twitter, Instagram, Facebook, Edit, Trophy, Book, Brain, Target } from "lucide-react";
import { useState } from "react";
import { EditProfileModal } from "@/components/EditProfileModal";

const Profile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [demoProfile, setDemoProfile] = useState({
    name: "Kenneth Valdez",
    role: "Advanced Learner",
    location: "Bay Area, San Francisco, CA",
    email: "fip@jukmuh.al",
    joinDate: "January 2024",
    level: 42,
    xp: {
      current: 8750,
      nextLevel: 10000,
    },
    stats: {
      coursesCompleted: 15,
      quizzesTaken: 147,
      averageScore: 85,
      streak: 12,
    },
    achievements: [
      { name: "Quick Learner", description: "Completed 5 courses in a month", icon: Brain },
      { name: "Perfect Score", description: "100% on 10 quizzes", icon: Target },
      { name: "Knowledge Seeker", description: "Completed all course materials", icon: Book },
      { name: "Top Performer", description: "Ranked #1 in 5 courses", icon: Trophy },
    ],
    learningProgress: [
      { name: "Web Development", progress: 80 },
      { name: "Data Science", progress: 72 },
      { name: "Machine Learning", progress: 89 },
      { name: "Cloud Computing", progress: 55 },
      { name: "Cybersecurity", progress: 66 }
    ],
    socials: {
      github: "bootdey",
      twitter: "@bootdey",
      instagram: "bootdey",
      facebook: "bootdey"
    }
  });

  const handleProfileUpdate = (updatedProfile: any) => {
    setDemoProfile({
      ...demoProfile,
      ...updatedProfile,
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column */}
        <div className="lg:w-1/3 space-y-6">
          {/* Profile Card with Level & XP */}
          <Card className="bg-black/40 backdrop-blur-sm border-emerald-500/20">
            <div className="p-6 flex flex-col items-center">
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarImage src="https://bootdey.com/img/Content/avatar/avatar7.png" />
                </Avatar>
                <div className="absolute -top-2 -right-2 bg-emerald-500 text-black font-bold px-3 py-1 rounded-full text-sm">
                  Level {demoProfile.level}
                </div>
              </div>
              <div className="mt-4 text-center">
                <h4 className="text-xl font-semibold text-white">{demoProfile.name}</h4>
                <p className="text-emerald-400">{demoProfile.role}</p>
                <div className="mt-2 space-y-2">
                  <div className="text-sm text-zinc-400">
                    XP: {demoProfile.xp.current} / {demoProfile.xp.nextLevel}
                  </div>
                  <Progress value={(demoProfile.xp.current / demoProfile.xp.nextLevel) * 100} className="h-2 bg-black/50" />
                </div>
              </div>
            </div>
          </Card>

          {/* Learning Stats */}
          <Card className="bg-black/40 backdrop-blur-sm border-emerald-500/20">
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white">Learning Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <StatItem label="Courses Completed" value={demoProfile.stats.coursesCompleted} />
                <StatItem label="Quizzes Taken" value={demoProfile.stats.quizzesTaken} />
                <StatItem label="Average Score" value={`${demoProfile.stats.averageScore}%`} />
                <StatItem label="Day Streak" value={demoProfile.stats.streak} />
              </div>
            </div>
          </Card>

          {/* Achievements */}
          <Card className="bg-black/40 backdrop-blur-sm border-emerald-500/20">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Achievements</h3>
              <div className="space-y-3">
                {demoProfile.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-black/20 border border-emerald-500/10">
                    <achievement.icon className="w-8 h-8 text-emerald-400" />
                    <div>
                      <div className="text-white font-medium">{achievement.name}</div>
                      <div className="text-sm text-zinc-400">{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:w-2/3 space-y-6">
          {/* Personal Info */}
          <Card className="bg-black/40 backdrop-blur-sm border-emerald-500/20">
            <div className="p-6 space-y-4">
              <InfoRow label="Full Name" value={demoProfile.name} />
              <InfoRow label="Email" value={demoProfile.email} />
              <InfoRow label="Location" value={demoProfile.location} />
              <InfoRow label="Member Since" value={demoProfile.joinDate} />
              <div className="pt-4">
                <Button 
                  className="bg-emerald-500 hover:bg-emerald-600"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </Card>

          {/* Learning Progress */}
          <Card className="bg-black/40 backdrop-blur-sm border-emerald-500/20">
            <div className="p-6">
              <h6 className="text-lg font-semibold text-white mb-4">Learning Progress</h6>
              <div className="space-y-4">
                {demoProfile.learningProgress.map((course, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-zinc-400">{course.name}</span>
                      <span className="text-sm text-emerald-400">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-1 bg-black/50" />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Add the Edit Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={demoProfile}
        onSave={handleProfileUpdate}
      />
    </div>
  );
};

const StatItem = ({ label, value }: { label: string, value: number | string }) => (
  <div className="text-center p-3 rounded-lg bg-black/20 border border-emerald-500/10">
    <div className="text-emerald-400 text-lg font-bold">{value}</div>
    <div className="text-sm text-zinc-400">{label}</div>
  </div>
);

const InfoRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex flex-col md:flex-row md:items-center py-3 border-b border-emerald-500/10 last:border-0">
    <div className="md:w-1/3">
      <h6 className="text-white font-medium">{label}</h6>
    </div>
    <div className="md:w-2/3 text-zinc-400">
      {value}
    </div>
  </div>
);

export default Profile;