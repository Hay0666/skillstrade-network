
import React from 'react';
import { PredefinedMessage } from '@/types/chat';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquarePlus } from 'lucide-react';

interface PredefinedMessagesProps {
  onSelectMessage: (content: string) => void;
  messages: PredefinedMessage[];
}

const PredefinedMessages: React.FC<PredefinedMessagesProps> = ({ onSelectMessage, messages }) => {
  const greetings = messages.filter(msg => msg.category === 'greeting');
  const questions = messages.filter(msg => msg.category === 'question');
  const responses = messages.filter(msg => msg.category === 'response');
  const followUps = messages.filter(msg => msg.category === 'follow-up');

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full" aria-label="Quick messages">
          <MessageSquarePlus className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-3 border-b">
          <h4 className="font-medium">Quick Messages</h4>
          <p className="text-xs text-muted-foreground">Select a message to send quickly</p>
        </div>
        <Tabs defaultValue="greetings">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="greetings">Hello</TabsTrigger>
            <TabsTrigger value="questions">Ask</TabsTrigger>
            <TabsTrigger value="responses">Reply</TabsTrigger>
            <TabsTrigger value="followups">Follow-up</TabsTrigger>
          </TabsList>
          <TabsContent value="greetings" className="max-h-60 overflow-y-auto">
            {greetings.map(msg => (
              <button 
                key={msg.id}
                className="w-full text-left p-2 text-sm hover:bg-accent rounded-md mx-1 my-0.5"
                onClick={() => onSelectMessage(msg.content)}
              >
                {msg.content}
              </button>
            ))}
          </TabsContent>
          <TabsContent value="questions" className="max-h-60 overflow-y-auto">
            {questions.map(msg => (
              <button 
                key={msg.id}
                className="w-full text-left p-2 text-sm hover:bg-accent rounded-md mx-1 my-0.5"
                onClick={() => onSelectMessage(msg.content)}
              >
                {msg.content}
              </button>
            ))}
          </TabsContent>
          <TabsContent value="responses" className="max-h-60 overflow-y-auto">
            {responses.map(msg => (
              <button 
                key={msg.id}
                className="w-full text-left p-2 text-sm hover:bg-accent rounded-md mx-1 my-0.5"
                onClick={() => onSelectMessage(msg.content)}
              >
                {msg.content}
              </button>
            ))}
          </TabsContent>
          <TabsContent value="followups" className="max-h-60 overflow-y-auto">
            {followUps.map(msg => (
              <button 
                key={msg.id}
                className="w-full text-left p-2 text-sm hover:bg-accent rounded-md mx-1 my-0.5"
                onClick={() => onSelectMessage(msg.content)}
              >
                {msg.content}
              </button>
            ))}
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

export default PredefinedMessages;
