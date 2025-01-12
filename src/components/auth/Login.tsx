import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { loginWithEmail, loginWithGoogle } from '@/services/authService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await loginWithEmail(email, password);
      toast({
        title: 'Success!',
        description: 'You have been logged in successfully.',
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Error',
        description: 'Failed to log in. Please check your credentials.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      toast({
        title: 'Success!',
        description: 'You have been logged in successfully.',
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Google login error:', error);
      toast({
        title: 'Error',
        description: 'Failed to log in with Google.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neon-purple to-black p-8">
      <div className="max-w-md mx-auto">
        <Card className="p-6 bg-black/40 border-emerald-500/20">
          <h2 className="text-2xl font-bold text-white mb-6">Login to Questly</h2>
          
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black/40 border-emerald-500/20 text-white"
                required
              />
            </div>
            
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black/40 border-emerald-500/20 text-white"
                required
              />
            </div>
            
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 text-black hover:bg-emerald-600"
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          
          <div className="mt-4">
            <Button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white text-black hover:bg-gray-100"
            >
              Continue with Google
            </Button>
          </div>
          
          <p className="mt-4 text-center text-zinc-400">
            Don't have an account?{' '}
            <Button
              variant="link"
              className="text-emerald-500 hover:text-emerald-400"
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </p>
        </Card>
      </div>
    </div>
  );
}
