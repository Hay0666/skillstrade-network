
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthForm from '@/components/auth/AuthForm';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'login' || mode === 'register') {
      setActiveTab(mode);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2">
              <span className="bg-primary text-primary-foreground font-bold px-2 py-1 rounded text-sm">Skill</span>
              <span className="font-bold">Swap</span>
            </Link>
            <h1 className="mt-6 text-2xl font-bold tracking-tight">
              {activeTab === 'login' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {activeTab === 'login' 
                ? 'Sign in to your account to continue' 
                : 'Sign up to start exchanging skills'}
            </p>
          </div>
          
          <div className="bg-background border rounded-xl shadow-sm p-6 md:p-8 animate-fade-in">
            <Tabs 
              value={activeTab} 
              onValueChange={(value) => setActiveTab(value as 'login' | 'register')}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 w-full mb-6">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <AuthForm mode="login" />
              </TabsContent>
              
              <TabsContent value="register">
                <AuthForm mode="register" />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            By continuing, you agree to SkillSwap's{' '}
            <Link to="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
