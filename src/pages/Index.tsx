import { Card } from "@/components/ui/card";
import { Bot, Youtube, BookOpen, BrainCircuit } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Clock, Award, Sparkles, ChevronRight, UserPlus, Target, Zap } from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: Bot,
      title: "AI Summary",
      description: "Generate smart summaries from any text",
      link: "/summary",
      color: "emerald"
    },
    {
      icon: Youtube,
      title: "Video Quiz",
      description: "Create quizzes from YouTube videos",
      link: "/quiz",
      color: "red"
    },
    {
      icon: BookOpen,
      title: "AI Flashcards",
      description: "Create interactive flashcards instantly",
      link: "/flashcards",
      color: "blue"
    },
    {
      icon: BrainCircuit,
      title: "Smart Learning",
      description: "Personalized learning paths with AI",
      link: "/dashboard",
      color: "purple"
    }
  ];

  const mentorFeatures = [
    {
      icon: Users,
      title: "1:1 Expert Sessions",
      description: "Get personalized guidance from industry experts"
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Book sessions at your convenience"
    },
    {
      icon: Target,
      title: "Goal Setting",
      description: "Create and track your learning objectives"
    },
    {
      icon: Zap,
      title: "Instant Support",
      description: "Get help when you need it most"
    }
  ];

  const plans = [
    {
      name: "Free",
      price: "$0",
      features: [
        "5 AI Summaries per month",
        "3 Video Quizzes per month",
        "Basic Flashcards",
        "Community Support"
      ]
    },
    {
      name: "Pro",
      price: "$9.99",
      features: [
        "Unlimited AI Summaries",
        "Unlimited Video Quizzes",
        "Advanced Flashcards",
        "Priority Support",
        "Custom Learning Paths",
        "Progress Analytics"
      ],
      popular: true
    },
    {
      name: "Team",
      price: "$29.99",
      features: [
        "Everything in Pro",
        "Team Management",
        "Shared Resources",
        "Custom Branding",
        "API Access",
        "24/7 Support"
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neon-purple to-black overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative max-w-6xl mx-auto pt-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 -z-10"
        >
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 text-transparent bg-clip-text"
        >
          Questly
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto"
        >
          Transform your learning journey with AI-powered tools and interactive experiences
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <Button 
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-600 text-black px-8 py-4 text-lg flex items-center gap-2 group"
          >
            Get Started Free
            <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>

      {/* Feature Cards */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
            >
              <Link to={feature.link}>
                <Card className="group p-6 bg-black/40 border-emerald-500/20 hover:bg-black/60 transition-all duration-300 transform hover:scale-105 hover:border-emerald-500/40">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`h-12 w-12 rounded-full bg-${feature.color}-500/20 flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
                      <feature.icon className={`h-6 w-6 text-${feature.color}-500`} />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                    <p className="text-zinc-400">{feature.description}</p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Mentoring Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-emerald-900/20" />
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              One-on-One Mentoring
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Get personalized guidance from expert mentors who are passionate about your success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mentorFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative p-6 bg-black/40 border-emerald-500/20 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="relative flex flex-col items-center text-center space-y-4">
                    <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                      <feature.icon className="h-6 w-6 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                    <p className="text-zinc-400">{feature.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Button
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-black px-8 py-4 text-lg flex items-center gap-2 mx-auto group"
            >
              <UserPlus className="w-5 h-5" />
              Book Your First Session
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Success Stats */}
      <div className="py-20 bg-black/40">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-emerald-400 mb-2"
              >
                500+
              </motion.div>
              <div className="text-zinc-400">Expert Mentors</div>
            </div>
            <div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl font-bold text-emerald-400 mb-2"
              >
                10,000+
              </motion.div>
              <div className="text-zinc-400">Mentoring Sessions</div>
            </div>
            <div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold text-emerald-400 mb-2"
              >
                98%
              </motion.div>
              <div className="text-zinc-400">Student Satisfaction</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h2>
          <p className="text-xl text-zinc-400">Select the perfect plan for your learning journey</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
            >
              <Card className={`p-6 bg-black/40 border-emerald-500/20 hover:bg-black/60 transition-all duration-300 ${plan.popular ? 'border-emerald-500' : ''}`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-emerald-500 text-black text-sm font-semibold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                    Popular
                  </div>
                )}
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                  <div className="text-3xl font-bold text-emerald-400">{plan.price}<span className="text-sm text-zinc-400">/month</span></div>
                  <ul className="space-y-2 text-zinc-400">
                    {plan.features.map((feature, i) => (
                      <li key={i}>• {feature}</li>
                    ))}
                  </ul>
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-black group">
                    Get Started
                    <Sparkles className="w-4 h-4 ml-2 transform group-hover:scale-110 transition-transform" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative py-20 bg-emerald-900/20"
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Learning Journey?
          </h2>
          <p className="text-lg text-zinc-400 mb-8">
            Join thousands of students who are already experiencing the future of learning
          </p>
          <Button
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-600 text-black px-8 py-4 text-lg group"
          >
            Start Learning Now
            <Award className="w-5 h-5 ml-2 transform group-hover:rotate-12 transition-transform" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}