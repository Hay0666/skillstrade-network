
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChatConversation } from '@/types/chat';
import { User } from '@/types/user';
import { getUserConversations } from '@/utils/chatUtils';
import { MessagesSquare } from 'lucide-react';

interface ConversationsListProps {
  currentUserId: string;
}

const ConversationsList: React.FC<ConversationsListProps> = ({ currentUserId }) => {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadConversations = () => {
      try {
        const userConversations = getUserConversations(currentUserId);
        // Sort by last message timestamp, most recent first
        const sortedConversations = [...userConversations].sort((a, b) => {
          const timeA = a.lastMessage?.timestamp ? new Date(a.lastMessage.timestamp).getTime() : 0;
          const timeB = b.lastMessage?.timestamp ? new Date(b.lastMessage.timestamp).getTime() : 0;
          return timeB - timeA;
        });
        setConversations(sortedConversations);
      } catch (error) {
        console.error('Error loading conversations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadConversations();

    // Set up polling to check for new messages
    const interval = setInterval(() => {
      loadConversations();
    }, 10000);

    return () => clearInterval(interval);
  }, [currentUserId]);

  const getOtherParticipantInfo = (conversation: ChatConversation) => {
    const otherParticipantIndex = conversation.participants.findIndex(id => id !== currentUserId);
    if (otherParticipantIndex === -1) return { name: 'Unknown', profilePicture: undefined };

    return {
      name: conversation.participantNames[otherParticipantIndex],
      profilePicture: conversation.participantImages?.[otherParticipantIndex]
    };
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 animate-pulse">
            <div className="h-12 w-12 rounded-full bg-muted"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <MessagesSquare className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="font-medium text-lg mb-2">No conversations yet</h3>
        <p className="text-muted-foreground mb-4">
          Start chatting with other users by visiting their profile and clicking "Contact"
        </p>
        <Button asChild>
          <Link to="/browse-profiles">Browse Profiles</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-1 p-2">
      {conversations.map(conversation => {
        const { name, profilePicture } = getOtherParticipantInfo(conversation);
        const hasUnread = conversation.unreadCount > 0;

        return (
          <Link 
            key={conversation.id} 
            to={`/messages/${conversation.id}`}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors
              ${hasUnread ? 'bg-primary/10 hover:bg-primary/15' : 'hover:bg-muted'}
            `}
          >
            <Avatar className="h-12 w-12 flex-shrink-0">
              {profilePicture ? (
                <AvatarImage src={profilePicture} alt={name} />
              ) : (
                <AvatarFallback>{getInitials(name)}</AvatarFallback>
              )}
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h3 className={`text-sm font-medium truncate ${hasUnread ? 'font-semibold' : ''}`}>
                  {name}
                </h3>
                {conversation.lastMessage && (
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                    {formatTime(conversation.lastMessage.timestamp)}
                  </span>
                )}
              </div>
              
              <div className="flex items-center">
                {conversation.lastMessage ? (
                  <p className={`text-sm truncate ${hasUnread ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                    {conversation.lastMessage.senderId === currentUserId 
                      ? `You: ${conversation.lastMessage.content}`
                      : conversation.lastMessage.content
                    }
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">No messages yet</p>
                )}
                
                {hasUnread && (
                  <div className="ml-auto pl-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      {conversation.unreadCount}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ConversationsList;
