
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const userInfo = localStorage.getItem('skillswap_user');
    if (userInfo) {
      try {
        setIsLoggedIn(true);
      } catch (e) {
        console.error('Error parsing user info:', e);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Exchange Skills, <span className="text-primary">Grow Together</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Teach what you know, learn what you don't. SkillSwap connects you with people who want to exchange knowledge and skills - no money involved.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {!isLoggedIn && (
              <Button size="lg" asChild>
                <Link to="/auth?mode=register" className="gap-2">
                  Get Started
                  <ArrowRight size={16} />
                </Link>
              </Button>
            )}
            <Button variant="outline" size="lg" asChild>
              <Link to="#how-it-works">
                How It Works
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-16 flex justify-center">
        <img
          src="/placeholder.svg"
          alt="SkillSwap Platform"
          className="w-full max-w-4xl rounded-lg shadow-lg border"
          height="600"
          width="1200"
        />
      </div>
    </section>
  );
};

export default Hero;
