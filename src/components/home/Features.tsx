
import { CheckCircle, Users, Calendar, Award, MessageSquare, Brain } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

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
    <section className="py-24 bg-gradient-to-b from-secondary/40 to-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Everything you need for effective skill exchanges
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Our platform provides all the tools necessary to find perfect learning partners, schedule sessions, and track your progress.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group overflow-hidden border-none bg-background/50 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-500 ease-in-out"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-70"></div>
              </div>
              
              <CardContent className="relative pt-6 z-10 -mt-12 bg-gradient-to-b from-transparent to-background/95 backdrop-blur-sm">
                <div className="p-3 rounded-full bg-primary/10 w-fit mb-5 shadow-inner border border-primary/20">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
              
              {/* Decorative gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
