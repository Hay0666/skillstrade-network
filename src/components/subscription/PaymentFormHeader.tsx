
import React from 'react';
import { CreditCard } from 'lucide-react';

const PaymentFormHeader: React.FC = () => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <CreditCard className="h-5 w-5 text-primary" />
      <h3 className="text-lg font-medium">Payment Details</h3>
    </div>
  );
};

export default PaymentFormHeader;
