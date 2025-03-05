
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  getConversation, 
  getConversationMessages, 
  getPredefinedMessages, 
  markMessagesAsRead, 
  sendMessage 
} from '@/utils/chatUtils';
import { ChatMessage, PredefinedMessage } from '@/types/chat';
import { User } from '@/types/user';
import { ArrowLeft, Send } from 'lucide-react';
import { toast } from 'sonner';
import MessageItem from './MessageItem';
import PredefinedMessages from './PredefinedMessages';

const ChatInterface: React.FC = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [predefinedMessages, setPredefinedMessages] = useState<PredefinedMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      try {
        // Check if user is logged in
        const userInfo = localStorage.getItem('skillswap_user');
        if (!userInfo || !conversationId) {
          navigate('/auth?mode=login');
          return;
        }

        // Load current user
        const userData: User = JSON.parse(userInfo);
        setCurrentUser(userData);

        // Load conversation
        const conversation = getConversation(conversationId);
        if (!conversation) {
          toast.error('Conversation not found');
          navigate('/messages');
          return;
        }

        // Load other user info
        const otherParticipantId = conversation.participants.find(id => id !== userData.id);
        if (otherParticipantId) {
          const usersData = localStorage.getItem('skillswap_users');
          if (usersData) {
            const users: User[] = JSON.parse(usersData);
            const otherUserData = users.find(user => user.id === otherParticipantId);
            if (otherUserData) {
              setOtherUser(otherUserData);
            }
          }
        }

        // Load messages
        const conversationMessages = getConversationMessages(conversationId);
        setMessages(conversationMessages);

        // Mark messages as read
        markMessagesAsRead(conversationId, userData.id);

        // Load predefined messages
        setPredefinedMessages(getPredefinedMessages());
      } catch (error) {
        console.error('Error loading chat data:', error);
        toast.error('Failed to load chat');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();

    // Set up polling for new messages
    const interval = setInterval(() => {
      if (conversationId && currentUser) {
        const newMessages = getConversationMessages(conversationId);
        if (newMessages.length > messages.length) {
          setMessages(newMessages);
          markMessagesAsRead(conversationId, currentUser.id);
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [conversationId, navigate, messages.length, currentUser]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !currentUser || !conversationId) return;

    const sentMessage = sendMessage(
      conversationId,
      currentUser.id,
      currentUser.name,
      newMessage.trim()
    );

    if (sentMessage) {
      setMessages(prev => [...prev, sentMessage]);
      setNewMessage('');
    } else {
      toast.error('Failed to send message');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handlePredefinedMessage = (content: string) => {
    setNewMessage(content);
  };

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
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Chat header */}
      <div className="border-b p-4 flex items-center">
        <Button 
          onClick={() => navigate('/messages')} 
          variant="ghost" 
          size="icon" 
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        {otherUser && (
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              {otherUser.profilePicture ? (
                <AvatarImage src={otherUser.profilePicture} alt={otherUser.name} />
              ) : (
                <AvatarFallback>{getInitials(otherUser.name)}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <h2 className="font-semibold">{otherUser.name}</h2>
              <div className="text-xs text-muted-foreground">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                Online
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <p>No messages yet</p>
            <p className="text-sm">Send a message to start the conversation</p>
          </div>
        ) : (
          messages.map(message => (
            <MessageItem
              key={message.id}
              message={message}
              isCurrentUser={currentUser?.id === message.senderId}
              currentUserId={currentUser?.id || ''}
              currentUserName={currentUser?.name || ''}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t p-4 bg-background">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1"
          />
          <PredefinedMessages 
            onSelectMessage={handlePredefinedMessage}
            messages={predefinedMessages}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!newMessage.trim()}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
