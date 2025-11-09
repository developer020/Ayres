import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ayresLogo from "@/assets/ayres-logo.png";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, user, resetPassword } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isResettingPassword) {
      navigate('/');
    }
  }, [user, navigate, isResettingPassword]);

  // Check if user is coming from password reset email
  useEffect(() => {
    const checkPasswordRecovery = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const type = hashParams.get('type');
      
      if (type === 'recovery') {
        setIsResettingPassword(true);
        setIsForgotPassword(false);
        setIsLogin(false);
      }
    };
    
    checkPasswordRecovery();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isResettingPassword) {
        if (password !== confirmPassword) {
          toast.error('Passwords do not match');
          return;
        }
        if (password.length < 6) {
          toast.error('Password must be at least 6 characters');
          return;
        }
        
        const { error } = await supabase.auth.updateUser({ password });
        
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Password updated successfully! You can now log in.');
          setIsResettingPassword(false);
          setIsLogin(true);
          setPassword('');
          setConfirmPassword('');
          // Clear the hash from URL
          window.history.replaceState(null, '', window.location.pathname);
        }
      } else if (isForgotPassword) {
        await resetPassword(email);
        setIsForgotPassword(false);
      } else if (isLogin) {
        await signIn(email, password);
      } else {
        if (!username.trim()) {
          return;
        }
        await signUp(email, password, username);
      }
    } finally {
      setIsLoading(false);
    }
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
            {isResettingPassword 
              ? "Set New Password" 
              : isForgotPassword 
                ? "Reset Password" 
                : isLogin 
                  ? "Welcome Back" 
                  : "Join Ayres"}
          </h1>
          <p className="text-muted-foreground text-sm tracking-wide text-center">
            {isResettingPassword
              ? "Enter your new password below"
              : isForgotPassword 
                ? "Enter your email to receive a password reset link"
                : isLogin 
                  ? "Sign in to access your authenticated collection" 
                  : "Create your account and start verifying luxury originals"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isResettingPassword ? (
            <>
              <div>
                <label className="text-sm tracking-wide text-muted-foreground uppercase">
                  New Password
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass mt-1"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label className="text-sm tracking-wide text-muted-foreground uppercase">
                  Confirm New Password
                </label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="glass mt-1"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
            </>
          ) : (
            <>
              {!isLogin && !isForgotPassword && (
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
                  {isForgotPassword ? "Email" : isLogin ? "Email or Username" : "Email"}
                </label>
                <Input
                  type={isForgotPassword || !isLogin ? "email" : "text"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass mt-1"
                  placeholder={isLogin && !isForgotPassword ? "email or username" : "your@email.com"}
                  required
                />
              </div>

              {!isForgotPassword && (
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
              )}
            </>
          )}

          <Button
            type="submit"
            className="w-full uppercase tracking-widest"
            disabled={isLoading}
          >
            {isLoading 
              ? "Processing..." 
              : isResettingPassword 
                ? "Update Password" 
                : isForgotPassword 
                  ? "Send Reset Link" 
                  : isLogin 
                    ? "Sign In" 
                    : "Create Account"}
          </Button>
        </form>

        {!isResettingPassword && (
          <div className="mt-6 text-center space-y-2">
            {isLogin && !isForgotPassword && (
              <button
                onClick={() => setIsForgotPassword(true)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors tracking-wide block w-full"
              >
                Forgot password?
              </button>
            )}
            
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setIsForgotPassword(false);
              }}
              className="text-sm text-muted-foreground hover:text-primary transition-colors tracking-wide"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"}
            </button>

            {isForgotPassword && (
              <button
                onClick={() => setIsForgotPassword(false)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors tracking-wide block w-full"
              >
                Back to sign in
              </button>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Auth;
