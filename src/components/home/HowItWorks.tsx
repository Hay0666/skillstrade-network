
import { ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Sign up and list the skills you can teach and the ones you want to learn. Add your availability preferences.",
      color: "from-blue-500/20 to-blue-600/20"
    },
    {
      number: "02",
      title: "Find Perfect Matches",
      description: "Our AI matching algorithm will suggest potential skill exchange partners based on complementary skills.",
      color: "from-indigo-500/20 to-indigo-600/20"
    },
    {
      number: "03",
      title: "Connect & Schedule",
      description: "Reach out to your matches, agree on specific topics, and schedule your first skill exchange session.",
      color: "from-violet-500/20 to-violet-600/20"
    },
    {
      number: "04",
      title: "Exchange Skills",
      description: "Teach and learn through video calls, messaging, or other preferred methods available on our platform.",
      color: "from-purple-500/20 to-purple-600/20"
    }
  ];

  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold tracking-tight">How SkillSwap Works</h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Follow these simple steps to start exchanging skills with people around the world.
          </p>
        </div>
        
        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden lg:block -z-10"></div>
          
          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8`}>
                {/* Step content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className={`inline-block rounded-full bg-gradient-to-r ${step.color} px-3 py-1 text-sm font-medium text-primary mb-3`}>
                    Step {step.number}
                  </div>
                  <h3 className="text-2xl font-medium">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground max-w-md mx-auto lg:mx-0">{step.description}</p>
                </div>
                
                {/* Center circle for desktop */}
                <div className="hidden lg:flex items-center justify-center w-16 h-16 rounded-full bg-background border-4 border-primary/30 z-10">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                    {index < 3 ? <ArrowRight className="h-4 w-4" /> : "✓"}
                  </div>
                </div>
                
                {/* Step image/illustration */}
                <div className="flex-1 w-full max-w-sm">
                  <div className={`w-full aspect-video rounded-xl bg-gradient-to-br ${step.color} p-6 flex items-center justify-center`}>
                    <div className="text-3xl font-bold text-primary/60">{step.number}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
