
import { v4 as uuidv4 } from 'uuid';
import { ChatConversation, ChatMessage, MessageReport, PredefinedMessage } from '@/types/chat';
import { User } from '@/types/user';
import { toast } from 'sonner';

// Helper to get all conversations for a user
export const getUserConversations = (userId: string): ChatConversation[] => {
  try {
    const storedConversations = localStorage.getItem('skillswap_conversations');
    if (!storedConversations) return [];
    
    const conversations: ChatConversation[] = JSON.parse(storedConversations);
    return conversations.filter(conv => conv.participants.includes(userId));
  } catch (error) {
    console.error('Error getting conversations:', error);
    return [];
  }
};

// Helper to get a single conversation
export const getConversation = (conversationId: string): ChatConversation | null => {
  try {
    const storedConversations = localStorage.getItem('skillswap_conversations');
    if (!storedConversations) return null;
    
    const conversations: ChatConversation[] = JSON.parse(storedConversations);
    return conversations.find(conv => conv.id === conversationId) || null;
  } catch (error) {
    console.error('Error getting conversation:', error);
    return null;
  }
};

// Helper to get all messages for a conversation
export const getConversationMessages = (conversationId: string): ChatMessage[] => {
  try {
    const storedMessages = localStorage.getItem('skillswap_messages');
    if (!storedMessages) return [];
    
    const messages: ChatMessage[] = JSON.parse(storedMessages);
    return messages
      .filter(msg => msg.conversationId === conversationId && !msg.hidden)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  } catch (error) {
    console.error('Error getting messages:', error);
    return [];
  }
};

// Helper to start a new conversation
export const startConversation = (currentUser: User, recipientUser: User): string => {
  try {
    const storedConversations = localStorage.getItem('skillswap_conversations') || '[]';
    const conversations: ChatConversation[] = JSON.parse(storedConversations);
    
    // Check if conversation already exists
    const existingConversation = conversations.find(conv => 
      conv.participants.includes(currentUser.id) && 
      conv.participants.includes(recipientUser.id) &&
      conv.participants.length === 2
    );
    
    if (existingConversation) {
      return existingConversation.id;
    }
    
    // Create new conversation
    const newConversation: ChatConversation = {
      id: uuidv4(),
      participants: [currentUser.id, recipientUser.id],
      participantNames: [currentUser.name, recipientUser.name],
      participantImages: [
        currentUser.profilePicture || undefined,
        recipientUser.profilePicture || undefined
      ],
      unreadCount: 0
    };
    
    conversations.push(newConversation);
    localStorage.setItem('skillswap_conversations', JSON.stringify(conversations));
    return newConversation.id;
  } catch (error) {
    console.error('Error starting conversation:', error);
    toast.error('Failed to start conversation');
    return '';
  }
};

// Helper to send a message
export const sendMessage = (conversationId: string, senderId: string, senderName: string, content: string): ChatMessage | null => {
  try {
    // Create new message
    const newMessage: ChatMessage = {
      id: uuidv4(),
      conversationId,
      senderId,
      senderName,
      content,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    // Save message
    const storedMessages = localStorage.getItem('skillswap_messages') || '[]';
    const messages: ChatMessage[] = JSON.parse(storedMessages);
    messages.push(newMessage);
    localStorage.setItem('skillswap_messages', JSON.stringify(messages));
    
    // Update conversation with last message
    const storedConversations = localStorage.getItem('skillswap_conversations') || '[]';
    const conversations: ChatConversation[] = JSON.parse(storedConversations);
    const conversationIndex = conversations.findIndex(conv => conv.id === conversationId);
    
    if (conversationIndex !== -1) {
      const otherParticipants = conversations[conversationIndex].participants.filter(p => p !== senderId);
      
      conversations[conversationIndex] = {
        ...conversations[conversationIndex],
        lastMessage: {
          content,
          timestamp: newMessage.timestamp,
          senderId
        },
        unreadCount: conversations[conversationIndex].unreadCount + otherParticipants.length
      };
      
      localStorage.setItem('skillswap_conversations', JSON.stringify(conversations));
    }
    
    return newMessage;
  } catch (error) {
    console.error('Error sending message:', error);
    return null;
  }
};

// Helper to mark messages as read
export const markMessagesAsRead = (conversationId: string, userId: string): void => {
  try {
    // Update messages
    const storedMessages = localStorage.getItem('skillswap_messages') || '[]';
    const messages: ChatMessage[] = JSON.parse(storedMessages);
    
    let updated = false;
    const updatedMessages = messages.map(msg => {
      if (msg.conversationId === conversationId && msg.senderId !== userId && !msg.read) {
        updated = true;
        return { ...msg, read: true };
      }
      return msg;
    });
    
    if (updated) {
      localStorage.setItem('skillswap_messages', JSON.stringify(updatedMessages));
    }
    
    // Update conversation unread count
    const storedConversations = localStorage.getItem('skillswap_conversations') || '[]';
    const conversations: ChatConversation[] = JSON.parse(storedConversations);
    const conversationIndex = conversations.findIndex(conv => conv.id === conversationId);
    
    if (conversationIndex !== -1 && conversations[conversationIndex].unreadCount > 0) {
      conversations[conversationIndex] = {
        ...conversations[conversationIndex],
        unreadCount: 0
      };
      
      localStorage.setItem('skillswap_conversations', JSON.stringify(conversations));
    }
  } catch (error) {
    console.error('Error marking messages as read:', error);
  }
};

// Helper to report a message
export const reportMessage = (messageId: string, reporterId: string, reporterName: string, reason: string): boolean => {
  try {
    // Update message as reported
    const storedMessages = localStorage.getItem('skillswap_messages') || '[]';
    const messages: ChatMessage[] = JSON.parse(storedMessages);
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    
    if (messageIndex !== -1) {
      messages[messageIndex] = {
        ...messages[messageIndex],
        reported: true,
        reportReason: reason
      };
      
      localStorage.setItem('skillswap_messages', JSON.stringify(messages));
      
      // Create report
      const newReport: MessageReport = {
        id: uuidv4(),
        messageId,
        reporterId,
        reporterName,
        reason,
        timestamp: new Date().toISOString(),
        status: 'pending'
      };
      
      const storedReports = localStorage.getItem('skillswap_reports') || '[]';
      const reports: MessageReport[] = JSON.parse(storedReports);
      reports.push(newReport);
      localStorage.setItem('skillswap_reports', JSON.stringify(reports));
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error reporting message:', error);
    return false;
  }
};

// Helper to get all unread messages count for a user
export const getTotalUnreadMessagesCount = (userId: string): number => {
  try {
    const conversations = getUserConversations(userId);
    return conversations.reduce((total, conv) => total + conv.unreadCount, 0);
  } catch (error) {
    console.error('Error getting unread count:', error);
    return 0;
  }
};

// Helper to get predefined messages
export const getPredefinedMessages = (): PredefinedMessage[] => {
  return [
    { id: '1', content: 'Hi there! I saw we have matching skills.', category: 'greeting' },
    { id: '2', content: 'Would you be interested in scheduling a skill swap session?', category: 'question' },
    { id: '3', content: 'I\'m available on weekends for skill exchanges.', category: 'response' },
    { id: '4', content: 'Could you tell me more about your experience with this skill?', category: 'question' },
    { id: '5', content: 'Thanks for the chat! Looking forward to learning from you.', category: 'follow-up' },
    { id: '6', content: 'What\'s your preferred method for skill sharing sessions?', category: 'question' },
    { id: '7', content: 'I\'m a beginner in this area, just so you know.', category: 'response' },
    { id: '8', content: 'I have 3+ years of experience in this field.', category: 'response' }
  ];
};

// Helper for moderators to handle reported messages
export const moderateReport = (reportId: string, action: 'approve' | 'reject', moderatorNotes?: string): boolean => {
  try {
    const storedReports = localStorage.getItem('skillswap_reports') || '[]';
    const reports: MessageReport[] = JSON.parse(storedReports);
    const reportIndex = reports.findIndex(report => report.id === reportId);
    
    if (reportIndex === -1) return false;
    
    // Update report status
    reports[reportIndex] = {
      ...reports[reportIndex],
      status: 'reviewed',
      moderatorNotes
    };
    
    localStorage.setItem('skillswap_reports', JSON.stringify(reports));
    
    // If approved, hide the message
    if (action === 'approve') {
      const messageId = reports[reportIndex].messageId;
      const storedMessages = localStorage.getItem('skillswap_messages') || '[]';
      const messages: ChatMessage[] = JSON.parse(storedMessages);
      const messageIndex = messages.findIndex(msg => msg.id === messageId);
      
      if (messageIndex !== -1) {
        messages[messageIndex] = {
          ...messages[messageIndex],
          hidden: true
        };
        
        localStorage.setItem('skillswap_messages', JSON.stringify(messages));
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error moderating report:', error);
    return false;
  }
};

// Function to check if a user is a moderator
export const isUserModerator = (userId: string): boolean => {
  // In a real app, this would check against a database of moderators
  // For demo purposes, we'll just use a hardcoded moderator ID
  const moderatorIds = ['mod1', 'mod2'];
  return moderatorIds.includes(userId);
};
