import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Trophy, User, BookOpen, Crown } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const navItems = [
    { path: "/dashboard", icon: Home, label: "Dashboard" },
    { path: "/leaderboard", icon: Trophy, label: "Leaderboard" },
    { path: "/profile", icon: User, label: "Profile" },
    { path: "/ai", icon: BookOpen, label: "Chitti AI Assistant" },
    { path: "/subscription", icon: Crown, label: "Subscription" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-neon-purple/90 backdrop-blur-lg border-b border-neon-orange/20 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-white animate-glow">
            Questly
          </Link>
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === item.path
                    ? "text-neon-orange"
                    : "text-white hover:text-neon-orange"
                }`}
                onMouseEnter={() => setIsHovered(item.path)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <item.icon
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isHovered === item.path ? "scale-110" : ""
                  }`}
                />
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;