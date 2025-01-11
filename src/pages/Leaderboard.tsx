import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Trophy } from "lucide-react";

const Leaderboard = () => {
  const navigate = useNavigate();
  const demoData = [
    { rank: 1, name: "Lee Taeyong", points: "258.244" },
    { rank: 2, name: "Mark Lee", points: "258.242" },
    { rank: 3, name: "Xiao Dejun", points: "258.223" },
    { rank: 4, name: "Qian Kun", points: "258.212" },
    { rank: 5, name: "Johnny Suh", points: "258.208" },
    { rank: 6, name: "Ten Lee", points: "257.198" },
    { rank: 7, name: "Dong Sicheng", points: "257.156" },
    { rank: 8, name: "Jung Jaehyun", points: "257.134" },
    { rank: 9, name: "Kim Jungwoo", points: "257.089" },
    { rank: 10, name: "Wong Yukhei", points: "257.045" },
    { rank: 11, name: "Nakamoto Yuta", points: "256.987" },
    { rank: 12, name: "Moon Taeil", points: "256.934" },
    { rank: 13, name: "Kim Doyoung", points: "256.876" },
    { rank: 14, name: "Huang Renjun", points: "256.823" },
    { rank: 15, name: "Lee Jeno", points: "256.789" },
    { rank: 16, name: "Lee Haechan", points: "256.745" },
    { rank: 17, name: "Na Jaemin", points: "256.701" },
    { rank: 18, name: "Zhong Chenle", points: "256.678" },
    { rank: 19, name: "Park Jisung", points: "256.645" },
    { rank: 20, name: "Liu Yangyang", points: "256.612" },
    { rank: 21, name: "Xiao Zhan", points: "256.589" },
    { rank: 22, name: "Wang Yibo", points: "256.567" },
    { rank: 23, name: "Li Xian", points: "256.534" },
    { rank: 24, name: "Yang Yang", points: "256.501" },
    { rank: 25, name: "Gong Jun", points: "256.478" },
    { rank: 26, name: "Zhang Zhehan", points: "256.445" },
    { rank: 27, name: "Simon Gong", points: "256.423" },
    { rank: 28, name: "Xu Kai", points: "256.401" },
    { rank: 29, name: "Li Xian", points: "256.378" },
    { rank: 30, name: "Bai Jingting", points: "256.356" },
    { rank: 31, name: "Song Weilong", points: "256.334" },
    { rank: 32, name: "Lin Yi", points: "256.312" },
    { rank: 33, name: "Arthur Chen", points: "256.289" },
    { rank: 34, name: "Leo Wu", points: "256.267" },
    { rank: 35, name: "Dylan Wang", points: "256.245" },
    { rank: 36, name: "Song Jiyang", points: "256.223" },
    { rank: 37, name: "Zhang Xincheng", points: "256.201" },
    { rank: 38, name: "Fan Chengcheng", points: "256.178" },
    { rank: 39, name: "Zhou Zhennan", points: "256.156" },
    { rank: 40, name: "Liu Yu", points: "256.134" }
  ];

  const handleExit = () => {
    navigate('/dashboard');
  };

  const handleContinue = () => {
    navigate('/quiz-maker');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="max-w-4xl mx-auto h-[calc(100vh-2rem)] flex flex-col">
        {/* Fixed Header */}
        <div className="p-6 border-b border-emerald-500/20 bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-sm rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-emerald-400" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent animate-glow">
                Leaderboard Rankings
              </h1>
            </div>
            <Button
              variant="outline"
              onClick={handleExit}
              className="border-emerald-500/20 text-emerald-400 hover:text-emerald-300 hover:border-emerald-400/40"
            >
              Exit
            </Button>
          </div>
        </div>

        {/* Scrollable Rankings */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm">
          <div className="p-6 space-y-4">
            {demoData.map((item, index) => (
              <div
                key={item.rank}
                className={`rounded-lg transition-all duration-300 ${
                  index === 0
                    ? "bg-gradient-to-r from-emerald-500/20 to-emerald-400/20 hover:from-emerald-500/30 hover:to-emerald-400/30"
                    : "bg-gradient-to-r from-gray-900/40 to-black/40 hover:from-gray-800/40 hover:to-gray-900/40"
                }`}
              >
                <div className="flex items-center gap-4 p-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      index === 0
                        ? "bg-gradient-to-r from-emerald-500 to-emerald-400 text-black"
                        : "bg-emerald-500/10 text-emerald-400"
                    }`}
                  >
                    {index === 0 ? (
                      <Trophy className="h-6 w-6" />
                    ) : (
                      <span className="text-lg font-semibold">{item.rank}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold">{item.name}</p>
                    <p className="text-emerald-400 text-sm">
                      {item.points} points
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="p-6 border-t border-emerald-500/20 bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-sm rounded-b-lg">
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline"
              onClick={handleExit}
              className="min-w-[11rem] font-rubik text-base uppercase border-emerald-500/20 text-emerald-400 hover:text-emerald-300 hover:border-emerald-400/40"
            >
              Exit
            </Button>
            <Button 
              onClick={handleContinue}
              className="min-w-[11rem] font-rubik text-base uppercase bg-gradient-to-r from-emerald-500 to-emerald-400 text-black hover:from-emerald-600 hover:to-emerald-500"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;