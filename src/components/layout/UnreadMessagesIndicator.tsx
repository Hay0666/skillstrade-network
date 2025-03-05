
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTotalUnreadMessagesCount } from '@/utils/chatUtils';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UnreadMessagesIndicatorProps {
  userId: string;
}

const UnreadMessagesIndicator: React.FC<UnreadMessagesIndicatorProps> = ({ userId }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Initial fetch
    const count = getTotalUnreadMessagesCount(userId);
    setUnreadCount(count);

    // Set up polling to check for new messages
    const interval = setInterval(() => {
      const newCount = getTotalUnreadMessagesCount(userId);
      setUnreadCount(newCount);
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [userId]);

  return (
    <Button asChild variant="ghost" size="sm" className="relative">
      <Link to="/messages">
        <MessageSquare className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </Link>
    </Button>
  );
};

export default UnreadMessagesIndicator;
