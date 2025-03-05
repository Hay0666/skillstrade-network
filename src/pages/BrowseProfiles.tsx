import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { User } from '@/types/user';
import { Search, Shuffle, Heart, ArrowRight } from 'lucide-react';
import { loadSampleProfiles } from '@/utils/loadSampleProfiles';
import { findSkillMatches } from '@/utils/matchingSystem';

const BrowseProfiles = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [profiles, setProfiles] = useState<User[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [manualMatches, setManualMatches] = useState<string[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('skillswap_user');
    
    if (!storedUser) {
      toast.error('Please sign in to browse profiles');
      navigate('/auth?mode=login');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
      
      const usersString = localStorage.getItem('skillswap_users');
      if (usersString) {
        const allUsers: User[] = JSON.parse(usersString);
        const otherUsers = allUsers.filter(user => user.id !== parsedUser.id);
        setProfiles(otherUsers);
        setFilteredProfiles(otherUsers);
      } else {
        setProfiles([]);
        setFilteredProfiles([]);
      }
      
      const savedMatches = localStorage.getItem(`skillswap_manual_matches_${parsedUser.id}`);
      if (savedMatches) {
        setManualMatches(JSON.parse(savedMatches));
      }
    } catch (error) {
      console.error('Failed to parse user data:', error);
      toast.error('Error loading user data');
      navigate('/auth?mode=login');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProfiles(profiles);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = profiles.filter(profile => {
        if (profile.name.toLowerCase().includes(query)) return true;
        if (profile.teachSkills.some(skill => skill.toLowerCase().includes(query))) return true;
        if (profile.learnSkills.some(skill => skill.toLowerCase().includes(query))) return true;
        return false;
      });
      setFilteredProfiles(filtered);
    }
  }, [searchQuery, profiles]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleLoadSampleProfiles = () => {
    loadSampleProfiles();
    toast.success('Sample profiles loaded successfully');
    
    const usersString = localStorage.getItem('skillswap_users');
    if (usersString && currentUser) {
      const allUsers: User[] = JSON.parse(usersString);
      const otherUsers = allUsers.filter(user => user.id !== currentUser.id);
      setProfiles(otherUsers);
      setFilteredProfiles(otherUsers);
    }
  };

  const handleAutoMatch = () => {
    if (!currentUser) return;
    
    const matches = findSkillMatches(currentUser);
    
    if (matches.length > 0) {
      toast.success(`Found ${matches.length} potential matches based on your skills!`);
      navigate('/skill-matches');
    } else {
      toast.info('No skill matches found. Try updating your skills or browse profiles manually.');
    }
  };

  const handleManualMatch = (profileId: string) => {
    if (!currentUser) return;
    
    if (!manualMatches.includes(profileId)) {
      const updatedMatches = [...manualMatches, profileId];
      setManualMatches(updatedMatches);
      
      localStorage.setItem(
        `skillswap_manual_matches_${currentUser.id}`, 
        JSON.stringify(updatedMatches)
      );
      
      toast.success('Profile added to your manual matches!');
    } else {
      toast.info('You already matched with this profile.');
    }
  };

  const isMatched = (profileId: string) => {
    return manualMatches.includes(profileId);
  };

  const handleViewProfile = (profileId: string) => {
    navigate(`/profile/${profileId}`);
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
        <div className="mb-8 mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Browse Profiles</h1>
            <p className="text-muted-foreground mt-2">
              Find users to connect with based on their skills
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            <Button onClick={handleAutoMatch} className="gap-2">
              <Shuffle size={16} />
              Auto Match
            </Button>
            <Button onClick={handleLoadSampleProfiles} variant="outline" className="gap-2">
              Load Sample Profiles
            </Button>
          </div>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            className="pl-10"
            placeholder="Search by name or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredProfiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
              <Card key={profile.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      {profile.profilePicture ? (
                        <AvatarImage src={profile.profilePicture} alt={profile.name} />
                      ) : (
                        <AvatarFallback>{getInitials(profile.name)}</AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{profile.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-primary mb-1">Skills They Teach:</h4>
                    <div className="flex flex-wrap gap-1">
                      {profile.teachSkills.map((skill, index) => (
                        <span key={index} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-secondary mb-1">Skills They Want to Learn:</h4>
                    <div className="flex flex-wrap gap-1">
                      {profile.learnSkills.map((skill, index) => (
                        <span key={index} className="bg-secondary/20 text-secondary-foreground text-xs px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleManualMatch(profile.id)} 
                      className="flex-1 gap-2"
                      variant={isMatched(profile.id) ? "secondary" : "default"}
                      disabled={isMatched(profile.id)}
                    >
                      {isMatched(profile.id) ? (
                        <>Matched</>
                      ) : (
                        <>Match <Heart size={16} /></>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleViewProfile(profile.id)}
                    >
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="w-full text-center py-12">
            <CardContent>
              <h3 className="text-xl font-medium mb-2">No profiles found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery ? 'Try a different search term' : 'There are no other users registered yet'}
              </p>
              <Button onClick={handleLoadSampleProfiles} variant="default">
                Load Sample Profiles
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BrowseProfiles;
