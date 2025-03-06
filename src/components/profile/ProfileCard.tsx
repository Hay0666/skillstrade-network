
import React from 'react';
import { User } from '@/types/user';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MessageCircle, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { startConversation } from '@/utils/chatUtils';

interface ProfileCardProps {
  profile: User;
  selectedSkill?: string;
  currentUser: User | null;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, selectedSkill, currentUser }) => {
  const navigate = useNavigate();
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
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
  
  const handleViewProfile = () => {
    navigate(`/profile/${profile.id}`);
  };
  
  const handleContactUser = () => {
    if (!currentUser) {
      toast.error('Please sign in to contact users');
      navigate('/auth?mode=login');
      return;
    }
    
    const conversationId = startConversation(currentUser, profile);
    if (conversationId) {
      toast.success(`Started conversation with ${profile.name}`);
      navigate(`/messages/${conversationId}`);
    } else {
      toast.error('Failed to start conversation');
    }
  };
  
  const handleCreateMatch = () => {
    if (!currentUser) {
      toast.error('Please sign in to match with users');
      navigate('/auth?mode=login');
      return;
    }
    
    // In a real app, we would call an API to create a match
    toast.success(`Match request sent to ${profile.name}`);
  };
  
  // Calculate average rating
  const averageRating = profile.ratings && profile.ratings.length > 0
    ? profile.ratings.reduce((sum, rating) => sum + rating.rating, 0) / profile.ratings.length
    : 0;
  
  // Check if the user teaches or learns the selected skill with more flexible matching
  const matchSkill = (skillArray: string[], targetSkill: string): boolean => {
    if (!targetSkill) return false;
    const targetLower = targetSkill.toLowerCase();
    
    return skillArray.some(skill => {
      const skillLower = skill.toLowerCase();
      return skillLower === targetLower || 
             targetLower.includes(skillLower) || 
             skillLower.includes(targetLower);
    });
  };
  
  const isTeaching = selectedSkill ? matchSkill(profile.teachSkills, selectedSkill) : false;
  const isLearning = selectedSkill ? matchSkill(profile.learnSkills, selectedSkill) : false;
  
  // Function to find the matching skill
  const findMatchingSkill = (skillArray: string[], targetSkill: string): string | null => {
    if (!targetSkill) return null;
    const targetLower = targetSkill.toLowerCase();
    
    const match = skillArray.find(skill => {
      const skillLower = skill.toLowerCase();
      return skillLower === targetLower || 
             targetLower.includes(skillLower) || 
             skillLower.includes(targetLower);
    });
    
    return match || null;
  };
  
  // Get the actual skills that match
  const matchingTeachSkill = selectedSkill ? findMatchingSkill(profile.teachSkills, selectedSkill) : null;
  const matchingLearnSkill = selectedSkill ? findMatchingSkill(profile.learnSkills, selectedSkill) : null;
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            {profile.profilePicture ? (
              <AvatarImage src={profile.profilePicture} alt={profile.name} />
            ) : (
              <AvatarFallback>{getInitials(profile.name)}</AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-lg">{profile.name}</CardTitle>
            {averageRating > 0 && (
              <div className="flex items-center mt-1">
                <div className="flex mr-1">
                  {renderStars(Math.round(averageRating))}
                </div>
                <span className="text-xs text-muted-foreground">
                  ({profile.ratings?.length || 0})
                </span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        {profile.bio ? (
          <p className="text-sm text-muted-foreground line-clamp-3">{profile.bio}</p>
        ) : (
          <p className="text-sm text-muted-foreground italic">No bio provided</p>
        )}
        
        {selectedSkill && (
          <div className="mt-3 space-y-1">
            {isTeaching && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                Teaching {matchingTeachSkill || selectedSkill}
              </Badge>
            )}
            {isLearning && (
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                Learning {matchingLearnSkill || selectedSkill}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0 gap-2 flex">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={handleViewProfile}
        >
          View
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="flex-1"
          onClick={handleContactUser}
        >
          <MessageCircle className="h-4 w-4 mr-1" />
          Contact
        </Button>
        <Button 
          variant="default" 
          size="sm"
          className="flex-1"
          onClick={handleCreateMatch}
        >
          <UserPlus className="h-4 w-4 mr-1" />
          Match
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
