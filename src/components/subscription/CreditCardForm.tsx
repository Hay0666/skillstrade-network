
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';
import { validateCreditCard, validateExpiryDate, validateCVV, formatCardNumber } from '@/utils/paymentUtils';

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
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Payment Details</h3>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formattedCardNumber}
              onChange={handleChange}
              maxLength={23} // To account for spaces
              className={errors.cardNumber ? 'border-destructive' : ''}
              disabled={isProcessing}
            />
            {errors.cardNumber && (
              <p className="text-sm text-destructive">{errors.cardNumber}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cardholderName">Cardholder Name</Label>
            <Input
              id="cardholderName"
              name="cardholderName"
              placeholder="John Doe"
              value={formData.cardholderName}
              onChange={handleChange}
              className={errors.cardholderName ? 'border-destructive' : ''}
              disabled={isProcessing}
            />
            {errors.cardholderName && (
              <p className="text-sm text-destructive">{errors.cardholderName}</p>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleChange}
                maxLength={5}
                className={errors.expiryDate ? 'border-destructive' : ''}
                disabled={isProcessing}
              />
              {errors.expiryDate && (
                <p className="text-sm text-destructive">{errors.expiryDate}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                name="cvv"
                type="text"
                placeholder="123"
                value={formData.cvv}
                onChange={handleChange}
                maxLength={4}
                className={errors.cvv ? 'border-destructive' : ''}
                disabled={isProcessing}
              />
              {errors.cvv && (
                <p className="text-sm text-destructive">{errors.cvv}</p>
              )}
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full mt-6" 
            disabled={isProcessing}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Complete Payment'
            )}
          </Button>
          
          <div className="text-center text-xs text-muted-foreground mt-4">
            <p>Your payment information is secure and encrypted</p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreditCardForm;
