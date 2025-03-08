
import React from 'react';
import { Button } from '@/components/ui/button';
import LoadingSpinner from './LoadingSpinner';

interface PaymentSubmitButtonProps {
  isProcessing: boolean;
}

const PaymentSubmitButton: React.FC<PaymentSubmitButtonProps> = ({ isProcessing }) => {
  return (
    <Button 
      type="submit" 
      className="w-full mt-6" 
      disabled={isProcessing}
    >
      {isProcessing ? (
        <span className="flex items-center justify-center">
          <LoadingSpinner />
          Processing...
        </span>
      ) : (
        'Complete Payment'
      )}
    </Button>
  );
};

export default PaymentSubmitButton;
