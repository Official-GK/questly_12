import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Chatbot from "./components/ChatBot";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import AI from "./pages/AI";
import Subscription from "./pages/Subscription";
import Flashcards from "./pages/Flashcards";
import Summary from "./pages/Summary";
import Quiz from "./pages/Quiz";
import ReactIntro from "./pages/courses/ReactIntro";
import AdvancedJavaScript from "./pages/courses/AdvancedJavaScript";
import UIUXBasics from "./pages/courses/UIUXBasics";
import PythonDataScience from "./pages/courses/PythonDataScience";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-black/90 text-white">
          <Navigation />
          <Chatbot />
          <Layout>
            <div className="pt-16">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/ai" element={<AI />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/flashcards" element={<Flashcards />} />
                <Route path="/summary" element={<Summary />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/course/react-intro" element={<ReactIntro />} />
                <Route path="/course/advanced-javascript" element={<AdvancedJavaScript />} />
                <Route path="/course/uiux-basics" element={<UIUXBasics />} />
                <Route path="/course/python-data-science" element={<PythonDataScience />} />
                {/* Temporarily using ReactIntro as placeholder for remaining courses */}
                <Route path="/course/machine-learning" element={<ReactIntro />} />
                <Route path="/course/mobile-dev" element={<ReactIntro />} />
                <Route path="/course/cloud-computing" element={<ReactIntro />} />
                <Route path="/course/cybersecurity" element={<ReactIntro />} />
                <Route path="/course/database-management" element={<ReactIntro />} />
              </Routes>
            </div>
          </Layout>
          <Toaster />
          <Sonner />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;