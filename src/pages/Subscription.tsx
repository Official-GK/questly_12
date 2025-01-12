import { useState } from "react";
import { CreditCard, Check, Star, Crown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

const plans = [
  {
    id: "price_basic",
    name: "Basic",
    price: "$0",
    priceId: "free_tier",
    description: "Perfect for getting started",
    features: ["5 quizzes per month", "Basic analytics", "Community support"],
    icon: CreditCard,
    popular: false,
  },
  {
    id: "price_premium",
    name: "Premium",
    price: "$15",
    priceId: "price_premium",
    description: "Great for regular learners",
    features: ["Unlimited quizzes", "Detailed analytics", "Priority support", "Ad-free experience"],
    icon: Star,
    popular: true,
  },
  {
    id: "price_pro",
    name: "Pro",
    price: "$30",
    priceId: "price_pro",
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
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubscribe = async (plan: typeof plans[0]) => {
    try {
      setLoading(plan.id);
      
      if (plan.priceId === 'free_tier') {
        toast({
          title: "Free Plan Selected",
          description: "You're now on the Basic plan. Enjoy!",
        });
        setSelectedPlan(plan.name);
        return;
      }

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: plan.priceId,
          planName: plan.name,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });
      
      if (error) {
        throw error;
      }

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
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
              key={plan.id} 
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
                    onClick={() => handleSubscribe(plan)}
                    disabled={loading === plan.id || selectedPlan === plan.name}
                  >
                    {loading === plan.id ? (
                      <span className="flex items-center">
                        <span className="animate-spin mr-2">⚪</span>
                        Processing...
                      </span>
                    ) : selectedPlan === plan.name ? (
                      "Current Plan"
                    ) : (
                      "Subscribe"
                    )}
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