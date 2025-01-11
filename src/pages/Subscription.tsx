import { useState } from "react";
import { CreditCard, Check, Star, Crown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const plans = [
  {
    name: "Basic",
    price: "$0",
    description: "Perfect for getting started",
    features: ["5 quizzes per month", "Basic analytics", "Community support"],
    icon: CreditCard,
    popular: false,
  },
  {
    name: "Premium",
    price: "$15",
    description: "Great for regular learners",
    features: ["Unlimited quizzes", "Detailed analytics", "Priority support", "Ad-free experience"],
    icon: Star,
    popular: true,
  },
  {
    name: "Pro",
    price: "$30",
    description: "For professional educators",
    features: [
      "Everything in Premium",
      "Custom branding",
      "API access",
      "Team collaboration",
      "Advanced analytics",
    ],
    icon: Crown,
    popular: false,
  },
];

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubscribe = (planName: string) => {
    setSelectedPlan(planName);
    toast({
      title: "Subscription Updated",
      description: `You've selected the ${planName} plan. This is a demo - no actual subscription was processed.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neon-purple to-black p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 animate-glow">
            Choose Your Plan
          </h1>
          <p className="text-white/60 text-lg">
            Unlock your learning potential with our flexible subscription plans
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <SpotlightCard 
              key={plan.name} 
              spotlightColor="rgba(29, 185, 84, 0.15)"
            >
              <Card className={`bg-white/10 backdrop-blur-lg border-neon-orange/20 hover:border-neon-orange/40 transition-colors cursor-pointer ${
                plan.popular ? "border-neon-green" : ""
              }`}>
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <plan.icon className={`w-12 h-12 ${
                      plan.popular ? "text-neon-green animate-float" : "text-white/60"
                    }`} />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white text-center">
                    {plan.name}
                  </CardTitle>
                  <div className="text-center">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-white/60">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-white/60 mb-6">{plan.description}</p>
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center text-white">
                        <Check className="w-5 h-5 text-neon-green mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-neon-green hover:bg-neon-green/90 text-black"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                    onClick={() => handleSubscribe(plan.name)}
                  >
                    {selectedPlan === plan.name ? "Current Plan" : "Subscribe"}
                  </Button>
                </CardFooter>
              </Card>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscription;