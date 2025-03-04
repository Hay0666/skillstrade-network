
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserMatch } from '@/types/user';
import { findSkillMatches } from '@/utils/matchingSystem';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
    teachSkills: string[];
    learnSkills: string[];
    profilePicture?: string;
  } | null>(null);
  const [topMatches, setTopMatches] = useState<UserMatch[]>([]);

  useEffect(() => {
    // Check if user is logged in by looking for stored data
    const storedUser = localStorage.getItem('skillswap_user');
    
    if (!storedUser) {
      // If no user data, redirect to login
      toast.error('Please sign in to access the dashboard');
      navigate('/auth?mode=login');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);
      
      // Find matches for the current user and show top 3
      const userMatches = findSkillMatches(parsedUser);
      setTopMatches(userMatches.slice(0, 3));
    } catch (error) {
      console.error('Failed to parse user data:', error);
      localStorage.removeItem('skillswap_user');
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
          <h1 className="text-3xl font-bold">Welcome back, {userData?.name || 'User'}</h1>
          <p className="text-muted-foreground mt-2">
            Your skill exchange journey continues here
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Card>
            <CardHeader>
              <CardTitle>Skills You Can Teach</CardTitle>
              <CardDescription>Share your expertise with others</CardDescription>
            </CardHeader>
            <CardContent>
              {userData?.teachSkills && userData.teachSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {userData.teachSkills.map((skill, index) => (
                    <div key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      {skill}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground">
                  <p>You haven't added any skills you can teach yet.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => navigate('/profile')}
                  >
                    Add Teaching Skills
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills You Want to Learn</CardTitle>
              <CardDescription>Discover new abilities from others</CardDescription>
            </CardHeader>
            <CardContent>
              {userData?.learnSkills && userData.learnSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {userData.learnSkills.map((skill, index) => (
                    <div key={index} className="bg-secondary/50 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground">
                  <p>You haven't added any skills you want to learn yet.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => navigate('/profile')}
                  >
                    Add Learning Goals
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Skill Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topMatches.length > 0 ? (
              topMatches.map((match) => (
                <Card key={match.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        {match.profilePicture ? (
                          <AvatarImage src={match.profilePicture} alt={match.name} />
                        ) : (
                          <AvatarFallback>{getInitials(match.name)}</AvatarFallback>
                        )}
                      </Avatar>
                      <CardTitle className="text-lg">{match.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div className="mb-2">
                      <span className="font-medium text-primary">They teach:</span>{' '}
                      {match.canTeachYou.join(', ')}
                    </div>
                    <div className="mb-3">
                      <span className="font-medium text-secondary">You teach:</span>{' '}
                      {match.youCanTeach.join(', ')}
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => navigate('/skill-matches')}
                    >
                      View Match
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="col-span-full p-6 text-center">
                <CardContent className="pt-2">
                  <p className="text-muted-foreground mb-4">No matches found yet. Add more skills to find potential skill exchange partners.</p>
                  <Button onClick={() => navigate('/skill-matches')}>Find Matches</Button>
                </CardContent>
              </Card>
            )}
          </div>
          {topMatches.length > 0 && (
            <div className="text-center mt-4">
              <Button 
                variant="outline"
                onClick={() => navigate('/skill-matches')}
              >
                See All Matches
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
