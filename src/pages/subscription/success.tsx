import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';

export default function SubscriptionSuccess() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Subscription Successful!",
      description: "Thank you for subscribing. Your account has been upgraded.",
    });

    // Redirect to dashboard after 3 seconds
    const timeout = setTimeout(() => {
      navigate('/dashboard');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neon-purple to-black p-8 flex items-center justify-center">
      <div className="text-center">
        <CheckCircle className="w-24 h-24 text-neon-green mx-auto mb-8 animate-bounce" />
        <h1 className="text-4xl font-bold text-white mb-4">
          Subscription Successful!
        </h1>
        <p className="text-white/60 text-lg mb-8">
          Thank you for subscribing. You will be redirected to the dashboard shortly.
        </p>
      </div>
    </div>
  );
}
