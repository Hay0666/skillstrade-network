
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
    teachSkills: string[];
    learnSkills: string[];
  } | null>(null);

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
    } catch (error) {
      console.error('Failed to parse user data:', error);
      localStorage.removeItem('skillswap_user');
      navigate('/auth?mode=login');
    }
    
    setIsLoading(false);
  }, [navigate]);

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
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="mb-8">
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
                  <Button variant="outline" className="mt-4">
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
                  <Button variant="outline" className="mt-4">
                    Add Learning Goals
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Recommended Skill Exchanges</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">No matches yet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Add more skills to find your perfect skill exchange partners.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
