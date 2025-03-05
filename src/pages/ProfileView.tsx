
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
import { ArrowLeft, Star, MessageCircle } from 'lucide-react';

const ProfileView = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [averageRating, setAverageRating] = useState<number | null>(null);

  useEffect(() => {
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
    // In a real app, this would open a messaging interface
    toast.success(`Contact request sent to ${profileData?.name}`);
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
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
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
                <Avatar className="h-24 w-24 mb-4">
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
