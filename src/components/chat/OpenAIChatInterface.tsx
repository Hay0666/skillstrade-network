import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, X, Send, MessageSquare, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const OpenAIChatInterface: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Add initial greeting message when the chatbot first opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMessage: Message = {
        id: Date.now().toString(),
        content: "Hello! I'm your AI assistant. How can I help you today?",
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages([initialMessage]);
    }
  }, [isOpen, messages.length]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isLoading) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentMessage = newMessage;
    setNewMessage('');
    setIsLoading(true);
    
    try {
      // Convert messages to OpenAI format
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const { data, error } = await supabase.functions.invoke('openai-chat', {
        body: { 
          message: currentMessage,
          messages: conversationHistory
        }
      });
      
      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (data?.error) {
        console.error('OpenAI API error:', data.error);
        throw new Error(data.error);
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.reply || 'I apologize, but I could not generate a response.',
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I apologize, but I\'m having trouble connecting right now. Please try again.',
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Chat toggle button */}
      <Button
        onClick={toggleChat}
        variant="default"
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl bg-primary hover:bg-primary/90"
        aria-label={isOpen ? "Close AI Chat" : "Open AI Chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4"
          >
            <Card className="w-80 sm:w-96 shadow-xl mt-2 overflow-hidden border-primary/20">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 py-3 px-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 bg-primary/20">
                      <AvatarFallback><Bot className="h-4 w-4 text-primary" /></AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-base font-semibold">AI Assistant</CardTitle>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 hover:bg-primary/10" 
                    onClick={toggleChat}
                    aria-label="Close chat"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="h-80 overflow-y-auto p-4 space-y-4 bg-background">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={cn(
                        "flex items-start gap-2 max-w-[85%]",
                        message.role === 'user' ? "ml-auto" : ""
                      )}
                    >
                      {message.role === 'assistant' && (
                        <Avatar className="h-7 w-7 mt-0.5 bg-primary/20 flex-shrink-0">
                          <AvatarFallback><Bot className="h-3 w-3 text-primary" /></AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={cn(
                          "rounded-lg py-2 px-3 text-sm leading-relaxed",
                          message.role === 'user' 
                            ? "bg-primary text-primary-foreground ml-2" 
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {message.content}
                      </div>
                      {message.role === 'user' && (
                        <Avatar className="h-7 w-7 mt-0.5 bg-primary/10 flex-shrink-0">
                          <AvatarFallback className="text-xs font-medium">U</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex items-start gap-2">
                      <Avatar className="h-7 w-7 mt-0.5 bg-primary/20">
                        <AvatarFallback><Bot className="h-3 w-3 text-primary" /></AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-lg py-2 px-3 text-sm flex items-center gap-2">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        <span className="text-muted-foreground">Thinking...</span>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              
              <CardFooter className="flex items-center gap-2 p-3 bg-muted/30 border-t">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button 
                  size="icon" 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || isLoading}
                  aria-label="Send message"
                  className="bg-primary hover:bg-primary/90"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OpenAIChatInterface;