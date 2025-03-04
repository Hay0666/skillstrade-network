
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { UserMatch } from '@/types/user';
import { findSkillMatches } from '@/utils/matchingSystem';

const SkillMatches = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [matches, setMatches] = useState<UserMatch[]>([]);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('skillswap_user');
    
    if (!storedUser) {
      toast.error('Please sign in to view your matches');
      navigate('/auth?mode=login');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);
      
      // Find matches for the current user
      const userMatches = findSkillMatches(parsedUser);
      setMatches(userMatches);
    } catch (error) {
      console.error('Failed to parse user data:', error);
      toast.error('Error loading user data');
      navigate('/auth?mode=login');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleContactUser = (matchId: string) => {
    // In a real app, this would open a chat or messaging system
    toast.success('Contact request sent!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        <div className="mb-8 mt-4">
          <h1 className="text-3xl font-bold">Your Skill Matches</h1>
          <p className="text-muted-foreground mt-2">
            Connect with people who want to learn what you teach and can teach what you want to learn
          </p>
        </div>

        {matches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => (
              <Card key={match.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      {match.profilePicture ? (
                        <AvatarImage src={match.profilePicture} alt={match.name} />
                      ) : (
                        <AvatarFallback>{getInitials(match.name)}</AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{match.name}</CardTitle>
                      <CardDescription>Match Score: {match.matchScore}%</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-primary mb-1">They can teach you:</h4>
                    <div className="flex flex-wrap gap-1">
                      {match.canTeachYou.map((skill, index) => (
                        <span key={index} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-secondary mb-1">You can teach them:</h4>
                    <div className="flex flex-wrap gap-1">
                      {match.youCanTeach.map((skill, index) => (
                        <span key={index} className="bg-secondary/20 text-secondary-foreground text-xs px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleContactUser(match.id)} 
                    className="w-full"
                    variant="default"
                  >
                    Contact
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="w-full text-center py-12">
            <CardContent>
              <h3 className="text-xl font-medium mb-2">No matches found yet</h3>
              <p className="text-muted-foreground mb-6">
                Try adding more skills to your profile to increase your chances of finding a match
              </p>
              <Button onClick={() => navigate('/profile')}>Update Your Skills</Button>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SkillMatches;
