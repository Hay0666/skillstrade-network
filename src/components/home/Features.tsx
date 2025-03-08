
import { CheckCircle, Users, Calendar, Award, MessageSquare, Brain } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Smart Skill Matching",
      description: "Our AI-powered matching system pairs you with the perfect learning partner based on skills, preferences, and availability.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
    },
    {
      icon: <Calendar className="h-6 w-6 text-primary" />,
      title: "Flexible Scheduling",
      description: "Set your availability and let our platform find compatible time slots for your skill exchange sessions.",
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800&auto=format&fit=crop"
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      title: "Integrated Communication",
      description: "Chat, video call, and share resources all within the platform. No need to switch between different apps.",
      image: "https://images.unsplash.com/photo-1573497491765-dccce02b29df?q=80&w=800&auto=format&fit=crop"
    },
    {
      icon: <Brain className="h-6 w-6 text-primary" />,
      title: "AI Learning Assistant",
      description: "Get personalized learning recommendations and teaching tips from our AI assistant to maximize your experience.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop"
    },
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: "Recognition & Rewards",
      description: "Earn points, badges, and climb the leaderboard as you exchange skills and help others learn.",
      image: "https://images.unsplash.com/photo-1567016526105-22da7c13adb6?q=80&w=800&auto=format&fit=crop"
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
      title: "Verified Skills",
      description: "Our community-driven validation system ensures skill quality through reviews and feedback.",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-24 bg-secondary/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold tracking-tight">Everything you need for effective skill exchanges</h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Our platform provides all the tools necessary to find perfect learning partners, schedule sessions, and track your progress.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="relative group"
            >
              <div className="relative z-10 h-full bg-background rounded-xl shadow-sm border flex flex-col transition-all duration-300 group-hover:shadow-md group-hover:scale-[1.01] overflow-hidden">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="p-3 rounded-full bg-primary/10 w-fit mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground flex-1">{feature.description}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-primary/0 to-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
