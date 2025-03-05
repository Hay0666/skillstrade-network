
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getTotalUnreadMessagesCount, isUserModerator } from '@/utils/chatUtils';
import { User } from '@/types/user';
import ConversationsList from '@/components/chat/ConversationsList';
import ModerationDashboard from '@/components/chat/ModerationDashboard';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, ShieldAlert } from 'lucide-react';

const Messages: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isModerator, setIsModerator] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Check if user is logged in
    const userInfo = localStorage.getItem('skillswap_user');
    if (!userInfo) {
      toast.error('You must be logged in to view messages');
      navigate('/auth?mode=login');
      return;
    }

    try {
      const userData: User = JSON.parse(userInfo);
      setCurrentUser(userData);
      setIsModerator(isUserModerator(userData.id));
      setUnreadCount(getTotalUnreadMessagesCount(userData.id));
    } catch (error) {
      console.error('Error loading user data:', error);
      toast.error('Error loading user data');
      navigate('/auth?mode=login');
    } finally {
      setIsLoading(false);
    }

    // Set up polling to check for new messages
    const interval = setInterval(() => {
      if (currentUser) {
        const count = getTotalUnreadMessagesCount(currentUser.id);
        setUnreadCount(count);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [navigate, currentUser]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!currentUser) {
    return null; // Redirect handled in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold mb-6">Messages</h1>

        {isModerator ? (
          <Tabs defaultValue="conversations">
            <TabsList className="mb-4">
              <TabsTrigger value="conversations" className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" />
                Conversations
                {unreadCount > 0 && (
                  <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                    {unreadCount}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="moderation" className="flex items-center">
                <ShieldAlert className="mr-2 h-4 w-4" />
                Moderation
              </TabsTrigger>
            </TabsList>

            <TabsContent value="conversations">
              <Card>
                <CardHeader>
                  <CardTitle>Your Conversations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ConversationsList currentUserId={currentUser.id} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="moderation">
              <ModerationDashboard />
            </TabsContent>
          </Tabs>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Your Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <ConversationsList currentUserId={currentUser.id} />
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Messages;
