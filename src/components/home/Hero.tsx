
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative pt-20 pb-24 md:pt-32 md:pb-40 overflow-hidden">
      {/* Background design elements */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="space-y-4 animate-fade-in">
              <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
                Unleash Your Learning Potential
              </div>
              <h1 className="font-bold text-foreground">
                Learn anything.<br />
                <span className="text-primary">Share everything.</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                Join the world's first skill exchange network that connects people to learn from each other, one skill at a time.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 animate-slide-up animation-delay-200">
              <Button size="lg" asChild>
                <Link to="/auth?mode=register" className="gap-2">
                  Get Started
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="#how-it-works">How It Works</Link>
              </Button>
            </div>
            
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 animate-fade-in animation-delay-400">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-xs font-medium`}>
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                Join <span className="text-foreground font-medium">2,000+</span> members already exchanging skills
              </div>
            </div>
          </div>
          
          <div className="flex-1 relative w-full max-w-lg mx-auto">
            <div className="w-full aspect-square relative z-10 animate-scale-in">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/20 to-primary/5 shadow-lg backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="relative w-40 h-40 md:w-52 md:h-52 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-white/50"></div>
                    <span className="text-3xl md:text-4xl font-semibold text-primary">1:1</span>
                  </div>
                  <h3 className="mt-6 text-xl md:text-2xl font-medium">Skill Exchange</h3>
                  <p className="mt-2 text-muted-foreground">Teach what you know, learn what you don't</p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-28 md:h-28 bg-primary/10 rounded-xl -z-10 animate-pulse-slow"></div>
            <div className="absolute bottom-0 right-0 transform translate-x-1/3 w-16 h-16 md:w-24 md:h-24 bg-primary/10 rounded-xl -z-10 animate-pulse-slow animation-delay-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
