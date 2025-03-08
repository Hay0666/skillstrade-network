
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { validateCreditCard, validateExpiryDate, validateCVV, formatCardNumber } from '@/utils/paymentUtils';
import PaymentFormField from './PaymentFormField';
import PaymentFormHeader from './PaymentFormHeader';
import PaymentSubmitButton from './PaymentSubmitButton';
import SecurityNotice from './SecurityNotice';

interface CreditCardFormProps {
  onSubmit: (formData: {
    cardNumber: string;
    cardholderName: string;
    expiryDate: string;
    cvv: string;
  }) => void;
  isProcessing: boolean;
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({ onSubmit, isProcessing }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: ''
  });
  
  const [errors, setErrors] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: ''
  });
  
  const [formattedCardNumber, setFormattedCardNumber] = useState('');
  
  // Format card number whenever it changes
  useEffect(() => {
    if (formData.cardNumber) {
      setFormattedCardNumber(formatCardNumber(formData.cardNumber));
    } else {
      setFormattedCardNumber('');
    }
  }, [formData.cardNumber]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      // Only allow digits to be entered
      const digitsOnly = value.replace(/\D/g, '');
      setFormData({ ...formData, [name]: digitsOnly });
    } else if (name === 'expiryDate') {
      // Format as MM/YY
      let formatted = value.replace(/\D/g, '');
      if (formatted.length > 2) {
        formatted = formatted.substring(0, 2) + '/' + formatted.substring(2, 4);
      }
      setFormData({ ...formData, [name]: formatted });
    } else if (name === 'cvv') {
      // Only allow digits for CVV
      const digitsOnly = value.replace(/\D/g, '');
      setFormData({ ...formData, [name]: digitsOnly });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear error when user starts typing
    setErrors({ ...errors, [name]: '' });
  };
  
  const validateForm = (): boolean => {
    const newErrors = {
      cardNumber: '',
      cardholderName: '',
      expiryDate: '',
      cvv: ''
    };
    
    let isValid = true;
    
    // Validate card number
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
      isValid = false;
    } else if (!validateCreditCard(formData.cardNumber)) {
      newErrors.cardNumber = 'Invalid card number';
      isValid = false;
    }
    
    // Validate cardholder name
    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
      isValid = false;
    } else if (formData.cardholderName.trim().length < 3) {
      newErrors.cardholderName = 'Please enter full name';
      isValid = false;
    }
    
    // Validate expiry date
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
      isValid = false;
    } else if (!validateExpiryDate(formData.expiryDate)) {
      newErrors.expiryDate = 'Invalid or expired date';
      isValid = false;
    }
    
    // Validate CVV
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
      isValid = false;
    } else if (!validateCVV(formData.cvv)) {
      newErrors.cvv = 'Invalid CVV';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  return (
    <Card className="border-2 border-primary/10">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <PaymentFormHeader />
          
          <PaymentFormField
            id="cardNumber"
            name="cardNumber"
            label="Card Number"
            placeholder="1234 5678 9012 3456"
            value={formattedCardNumber}
            onChange={handleChange}
            maxLength={23}
            error={errors.cardNumber}
            disabled={isProcessing}
          />
          
          <PaymentFormField
            id="cardholderName"
            name="cardholderName"
            label="Cardholder Name"
            placeholder="John Doe"
            value={formData.cardholderName}
            onChange={handleChange}
            error={errors.cardholderName}
            disabled={isProcessing}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <PaymentFormField
              id="expiryDate"
              name="expiryDate"
              label="Expiry Date"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={handleChange}
              maxLength={5}
              error={errors.expiryDate}
              disabled={isProcessing}
            />
            
            <PaymentFormField
              id="cvv"
              name="cvv"
              label="CVV"
              placeholder="123"
              value={formData.cvv}
              onChange={handleChange}
              maxLength={4}
              error={errors.cvv}
              disabled={isProcessing}
            />
          </div>
          
          <PaymentSubmitButton isProcessing={isProcessing} />
          
          <SecurityNotice />
        </form>
      </CardContent>
    </Card>
  );
};

export default CreditCardForm;
