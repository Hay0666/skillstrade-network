
import React, { useState } from 'react';
import { ChatMessage } from '@/types/chat';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Flag, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';
import { reportMessage } from '@/utils/chatUtils';

interface MessageItemProps {
  message: ChatMessage;
  isCurrentUser: boolean;
  currentUserId: string;
  currentUserName: string;
}

const MessageItem: React.FC<MessageItemProps> = ({ 
  message, 
  isCurrentUser,
  currentUserId,
  currentUserName
}) => {
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');

  const handleReport = () => {
    if (!reportReason.trim()) {
      toast.error('Please provide a reason for reporting this message');
      return;
    }

    const reported = reportMessage(
      message.id,
      currentUserId,
      currentUserName,
      reportReason
    );

    if (reported) {
      toast.success('Message reported successfully');
      setReportDialogOpen(false);
      setReportReason('');
    } else {
      toast.error('Failed to report message');
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[75%] ${isCurrentUser ? 'order-2' : 'order-1'}`}>
        <Card className={`px-4 py-2 ${
          isCurrentUser 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-secondary'
        }`}>
          <div className="flex justify-between items-start gap-2">
            <div className="break-words">{message.content}</div>
            
            {!isCurrentUser && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 p-0 opacity-50 hover:opacity-100 -mr-2 -mt-1"
                  >
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setReportDialogOpen(true)}>
                    <Flag className="mr-2 h-4 w-4" />
                    Report message
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <div className={`text-xs mt-1 ${isCurrentUser ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
            {formatTime(message.timestamp)}
          </div>
        </Card>
      </div>

      {/* Report Dialog */}
      <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Report Message</DialogTitle>
            <DialogDescription>
              Please tell us why you're reporting this message. This will help our moderators review it properly.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="report-reason">Reason</Label>
              <Textarea
                id="report-reason"
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="Please explain why this message is inappropriate"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleReport} disabled={!reportReason.trim()}>
              Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessageItem;
