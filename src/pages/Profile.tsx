
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Camera, Upload } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    teachSkills: '',
    learnSkills: '',
    profilePicture: ''
  });

  useEffect(() => {
    // Check if user is logged in
    const userInfo = localStorage.getItem('skillswap_user');
    if (!userInfo) {
      toast.error('You must be logged in to view this page');
      navigate('/auth?mode=login');
      return;
    }

    try {
      const userData = JSON.parse(userInfo);
      setUser(userData);
      
      // Set initial form data
      setFormData(prev => ({
        ...prev,
        name: userData.name || '',
        email: userData.email || '',
        teachSkills: (userData.teachSkills || []).join(', '),
        learnSkills: (userData.learnSkills || []).join(', '),
        profilePicture: userData.profilePicture || ''
      }));

      // Set the preview image if the user has a profile picture
      if (userData.profilePicture) {
        setPreviewImage(userData.profilePicture);
      }
    } catch (e) {
      console.error('Error parsing user info:', e);
      toast.error('Error loading user data');
      navigate('/auth?mode=login');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreviewImage(result);
      setFormData(prev => ({
        ...prev,
        profilePicture: result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    try {
      // Validate passwords if the user wants to update their password
      if (formData.newPassword) {
        if (formData.newPassword.length < 6) {
          toast.error('New password must be at least 6 characters');
          setIsLoading(false);
          return;
        }
        
        if (formData.newPassword !== formData.confirmPassword) {
          toast.error('New passwords do not match');
          setIsLoading(false);
          return;
        }
        
        // In a real app, we would verify the current password against the stored password
        // For this demo, we'll simulate password verification
        const users = JSON.parse(localStorage.getItem('skillswap_users') || '[]');
        const currentUser = users.find((u: any) => u.id === user.id);
        
        if (currentUser && currentUser.password !== formData.currentPassword) {
          toast.error('Current password is incorrect');
          setIsLoading(false);
          return;
        }
      }
      
      // Update user data in localStorage
      const users = JSON.parse(localStorage.getItem('skillswap_users') || '[]');
      const updatedUsers = users.map((u: any) => {
        if (u.id === user.id) {
          // Update user fields
          const updatedUser = {
            ...u,
            name: formData.name,
            email: formData.email,
            teachSkills: formData.teachSkills.split(',').map((skill: string) => skill.trim()).filter(Boolean),
            learnSkills: formData.learnSkills.split(',').map((skill: string) => skill.trim()).filter(Boolean),
            profilePicture: formData.profilePicture
          };
          
          // Update password if a new one was provided
          if (formData.newPassword) {
            updatedUser.password = formData.newPassword;
          }
          
          return updatedUser;
        }
        return u;
      });
      
      localStorage.setItem('skillswap_users', JSON.stringify(updatedUsers));
      
      // Update current user session
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
        teachSkills: formData.teachSkills.split(',').map((skill: string) => skill.trim()).filter(Boolean),
        learnSkills: formData.learnSkills.split(',').map((skill: string) => skill.trim()).filter(Boolean),
        profilePicture: formData.profilePicture
      };
      
      localStorage.setItem('skillswap_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      // Clear password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  if (!user) {
    return <div className="container mx-auto px-4 py-24 flex justify-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal information and how we can reach you</CardDescription>
          </CardHeader>

          <form onSubmit={handleProfileUpdate}>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center mb-6">
                <div 
                  className="relative cursor-pointer group" 
                  onClick={handleImageClick}
                >
                  <Avatar className="h-24 w-24 border-2 border-primary/20">
                    {previewImage ? (
                      <AvatarImage src={previewImage} alt={user.name} />
                    ) : (
                      <AvatarFallback className="text-xl">
                        {getInitials(user.name || 'User')}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                </div>
                <Input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={handleImageClick}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Change Photo
                </Button>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG or GIF (max. 5MB)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
            
            <CardHeader className="pt-6">
              <CardTitle>Skills Exchange</CardTitle>
              <CardDescription>What skills would you like to teach and learn?</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="teachSkills">Skills You Can Teach (comma-separated)</Label>
                <Input
                  id="teachSkills"
                  name="teachSkills"
                  value={formData.teachSkills}
                  onChange={handleChange}
                  placeholder="JavaScript, Painting, Cooking..."
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="learnSkills">Skills You Want to Learn (comma-separated)</Label>
                <Input
                  id="learnSkills"
                  name="learnSkills"
                  value={formData.learnSkills}
                  onChange={handleChange}
                  placeholder="Python, Guitar, Photography..."
                  disabled={isLoading}
                />
              </div>
            </CardContent>
            
            <CardHeader className="pt-6">
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password (leave blank to keep current password)</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving Changes...
                  </span>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
