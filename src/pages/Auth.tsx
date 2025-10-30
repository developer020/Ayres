import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import ayresLogo from "@/assets/ayres-logo.png";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isLogin) {
      await signIn(email, password);
    } else {
      if (!username.trim()) {
        setIsLoading(false);
        return;
      }
      await signUp(email, password, username);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="glass-strong border-border/50 p-8 max-w-md w-full animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <img 
            src={ayresLogo} 
            alt="Ayres Originals" 
            className="h-16 w-16 object-contain mb-4"
          />
          <h1 className="text-3xl font-bold tracking-wider uppercase mb-2">
            {isLogin ? "Welcome Back" : "Join Ayres"}
          </h1>
          <p className="text-muted-foreground text-sm tracking-wide text-center">
            {isLogin 
              ? "Sign in to access your authenticated collection" 
              : "Create your account and start verifying luxury originals"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="text-sm tracking-wide text-muted-foreground uppercase">
                Username
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="glass mt-1"
                placeholder="Choose a unique username"
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label className="text-sm tracking-wide text-muted-foreground uppercase">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass mt-1"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="text-sm tracking-wide text-muted-foreground uppercase">
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass mt-1"
              placeholder="••••••••"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full uppercase tracking-widest"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-muted-foreground hover:text-primary transition-colors tracking-wide"
          >
            {isLogin 
              ? "Don't have an account? Sign up" 
              : "Already have an account? Sign in"}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
