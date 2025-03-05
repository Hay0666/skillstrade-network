
import { User } from './user';

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
  reported?: boolean;
  reportReason?: string;
  hidden?: boolean; // For moderation purposes
}

export interface ChatConversation {
  id: string;
  participants: string[]; // User IDs
  participantNames: string[]; // User names for display
  participantImages?: string[]; // User profile images
  lastMessage?: {
    content: string;
    timestamp: string;
    senderId: string;
  };
  unreadCount: number;
}

export interface MessageReport {
  id: string;
  messageId: string;
  reporterId: string;
  reporterName: string;
  reason: string;
  timestamp: string;
  status: 'pending' | 'reviewed' | 'resolved';
  moderatorNotes?: string;
}

export type PredefinedMessage = {
  id: string;
  content: string;
  category: 'greeting' | 'question' | 'response' | 'follow-up';
};
