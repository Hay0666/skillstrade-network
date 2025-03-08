
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { User, UserRating } from '@/types/user';
import { ArrowLeft, Star, MessageCircle, Clock, MapPin, Briefcase } from 'lucide-react';
import { startConversation } from '@/utils/chatUtils';

// Sample background patterns
const backgroundPatterns = [
  "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23bdbdbd' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
  "url(\"data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='24' viewBox='0 0 88 24'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='autumn' fill='%23b87a65' fill-opacity='0.05'%3E%3Cpath d='M10 0l30 15 2 1V2.18A10 10 0 0 0 41.76 0H39.7a8 8 0 0 1 .3 2.18v10.58L14.47 0H10zm31.76 24a10 10 0 0 0-5.29-6.76L4 1 2 0v13.82a10 10 0 0 0 5.53 8.94L10 24h4.47l-6.05-3.02A8 8 0 0 1 4 13.82V3.24l31.58 15.78A8 8 0 0 1 39.7 24h2.06zM78 24l2.47-1.24A10 10 0 0 0 86 13.82V0l-2 1-32.47 16.24A10 10 0 0 0 46.24 24h2.06a8 8 0 0 1 4.12-4.98L84 3.24v10.58a8 8 0 0 1-4.42 7.16L73.53 24H78zm0-24L48 15l-2 1V2.18A10 10 0 0 1 46.24 0h2.06a8 8 0 0 0-.3 2.18v10.58L73.53 0H78z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
];

const ProfileView = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [backgroundPattern, setBackgroundPattern] = useState("");

  useEffect(() => {
    // Set a random background pattern
    setBackgroundPattern(backgroundPatterns[Math.floor(Math.random() * backgroundPatterns.length)]);
    
    const loadUserData = () => {
      // Check if current user is logged in
      const storedUser = localStorage.getItem('skillswap_user');
      if (!storedUser) {
        toast.error('Please sign in to view profiles');
        navigate('/auth?mode=login');
        return;
      }
      
      try {
        // Get current user
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
        
        // Get the profile data for the requested user
        const usersString = localStorage.getItem('skillswap_users');
        if (!usersString) {
          toast.error('User data not found');
          navigate('/browse-profiles');
          return;
        }
        
        const users: User[] = JSON.parse(usersString);
        const user = users.find(u => u.id === userId);
        
        if (!user) {
          toast.error('User not found');
          navigate('/browse-profiles');
          return;
        }
        
        setProfileData(user);
        
        // Calculate average rating if ratings exist
        if (user.ratings && user.ratings.length > 0) {
          const total = user.ratings.reduce((sum, rating) => sum + rating.rating, 0);
          setAverageRating(parseFloat((total / user.ratings.length).toFixed(1)));
        }
      } catch (error) {
        console.error('Error loading profile data:', error);
        toast.error('Error loading profile data');
        navigate('/browse-profiles');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, [userId, navigate]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleContactUser = () => {
    if (!currentUser || !profileData) {
      toast.error('Something went wrong');
      return;
    }
    
    const conversationId = startConversation(currentUser, profileData);
    if (conversationId) {
      toast.success(`Started conversation with ${profileData.name}`);
      navigate(`/messages/${conversationId}`);
    } else {
      toast.error('Failed to start conversation');
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index}
        className={index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
        size={16}
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>User not found</p>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === profileData.id;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="h-48 w-full relative" style={{ background: backgroundPattern }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
      </div>
      <main className="flex-1 container mx-auto px-4 py-8 mt-[-100px] relative z-10">
        <Button 
          onClick={handleGoBack} 
          variant="ghost" 
          className="mb-6 flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile card */}
          <Card className="lg:col-span-1">
            <CardHeader className="text-center pb-2">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4 border-4 border-background shadow-lg">
                  {profileData.profilePicture ? (
                    <AvatarImage src={profileData.profilePicture} alt={profileData.name} />
                  ) : (
                    <AvatarFallback className="text-xl">{getInitials(profileData.name)}</AvatarFallback>
                  )}
                </Avatar>
                <CardTitle className="text-2xl">{profileData.name}</CardTitle>
                {averageRating !== null && (
                  <div className="flex items-center mt-2">
                    <div className="flex mr-2">
                      {renderStars(Math.round(averageRating))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {averageRating} ({profileData.ratings?.length} {profileData.ratings?.length === 1 ? 'review' : 'reviews'})
                    </span>
                  </div>
                )}

                {/* Additional profile details */}
                <div className="w-full mt-4 flex flex-col gap-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock size={15} className="mr-2" />
                    <span>Member since May 2023</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin size={15} className="mr-2" />
                    <span>New York, USA</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Briefcase size={15} className="mr-2" />
                    <span>Professional Educator</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {!isOwnProfile && (
                <Button 
                  onClick={handleContactUser} 
                  className="w-full mb-4 gap-2"
                >
                  <MessageCircle size={18} />
                  Contact
                </Button>
              )}
              
              {profileData.bio ? (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">About</h3>
                  <p className="text-sm text-muted-foreground">{profileData.bio}</p>
                </div>
              ) : (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">About</h3>
                  <p className="text-sm text-muted-foreground italic">No bio provided</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Skills and Ratings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Skills Exchange</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Skills They Teach:</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.teachSkills.length > 0 ? (
                      profileData.teachSkills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="px-3 py-1">
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground italic">No skills listed</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Skills They Want to Learn:</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.learnSkills.length > 0 ? (
                      profileData.learnSkills.map((skill, index) => (
                        <Badge key={index} className="px-3 py-1">
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground italic">No skills listed</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Ratings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                {profileData.ratings && profileData.ratings.length > 0 ? (
                  <div className="space-y-4">
                    {profileData.ratings.map((rating) => (
                      <div key={rating.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{rating.raterName}</h4>
                          <div className="flex">
                            {renderStars(rating.rating)}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{rating.comment}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(rating.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No reviews yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfileView;
