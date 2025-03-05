
/**
 * Validates a credit card number using the Luhn algorithm
 */
export const validateCreditCard = (cardNumber: string): boolean => {
  // Remove any non-digit characters
  const digitsOnly = cardNumber.replace(/\D/g, '');
  
  if (digitsOnly.length < 13 || digitsOnly.length > 19) {
    return false;
  }
  
  // Luhn algorithm validation
  let sum = 0;
  let shouldDouble = false;
  
  // Loop through values starting from the rightmost digit
  for (let i = digitsOnly.length - 1; i >= 0; i--) {
    let digit = parseInt(digitsOnly.charAt(i));
    
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  return sum % 10 === 0;
};

/**
 * Validates credit card expiry date
 */
export const validateExpiryDate = (expiryDate: string): boolean => {
  // Expect format MM/YY
  const pattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
  if (!pattern.test(expiryDate)) {
    return false;
  }
  
  const [month, year] = expiryDate.split('/');
  const expMonth = parseInt(month);
  const expYear = parseInt(`20${year}`);
  
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // getMonth() is zero-based
  const currentYear = currentDate.getFullYear();
  
  return (expYear > currentYear) || 
         (expYear === currentYear && expMonth >= currentMonth);
};

/**
 * Validates CVV
 */
export const validateCVV = (cvv: string): boolean => {
  const cvvPattern = /^[0-9]{3,4}$/;
  return cvvPattern.test(cvv);
};

/**
 * Determines card type based on card number
 */
export const getCardType = (cardNumber: string): 'visa' | 'mastercard' | 'amex' | 'discover' | 'other' => {
  const digitsOnly = cardNumber.replace(/\D/g, '');
  
  // Visa cards start with 4
  if (/^4/.test(digitsOnly)) {
    return 'visa';
  }
  // Mastercard starts with 51-55 or 2221-2720
  else if (/^(5[1-5]|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[0-1][0-9]|2720)/.test(digitsOnly)) {
    return 'mastercard';
  }
  // American Express starts with 34 or 37
  else if (/^3[47]/.test(digitsOnly)) {
    return 'amex';
  }
  // Discover starts with 6011, 622126-622925, 644-649, or 65
  else if (/^(6011|65|64[4-9]|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]))/.test(digitsOnly)) {
    return 'discover';
  }
  else {
    return 'other';
  }
};

/**
 * Format credit card number with spaces
 */
export const formatCardNumber = (cardNumber: string): string => {
  const digitsOnly = cardNumber.replace(/\D/g, '');
  const cardType = getCardType(digitsOnly);
  
  if (cardType === 'amex') {
    // Format: XXXX XXXXXX XXXXX
    return digitsOnly.replace(/^(\d{4})(\d{6})(\d{0,5})/, '$1 $2 $3').trim();
  } else {
    // Format: XXXX XXXX XXXX XXXX
    return digitsOnly.replace(/(\d{4})/g, '$1 ').trim();
  }
};

/**
 * Masks a credit card number except for the last 4 digits
 */
export const maskCardNumber = (cardNumber: string): string => {
  const digitsOnly = cardNumber.replace(/\D/g, '');
  const lastFourDigits = digitsOnly.slice(-4);
  const maskedSection = digitsOnly.slice(0, -4).replace(/./g, '*');
  
  return formatCardNumber(maskedSection + lastFourDigits);
};

/**
 * Simulates a payment processing API call
 * In a real app, this would connect to a payment processor like Stripe
 */
export const processPayment = (paymentDetails: {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  amount: number;
}): Promise<{ success: boolean; message: string; transactionId?: string }> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Validate all payment details
      if (!validateCreditCard(paymentDetails.cardNumber)) {
        resolve({ success: false, message: 'Invalid credit card number' });
        return;
      }
      
      if (!validateExpiryDate(paymentDetails.expiryDate)) {
        resolve({ success: false, message: 'Invalid expiry date' });
        return;
      }
      
      if (!validateCVV(paymentDetails.cvv)) {
        resolve({ success: false, message: 'Invalid CVV' });
        return;
      }
      
      if (!paymentDetails.cardholderName || paymentDetails.cardholderName.trim().length < 3) {
        resolve({ success: false, message: 'Invalid cardholder name' });
        return;
      }
      
      // Generate random transaction ID
      const transactionId = Math.random().toString(36).substring(2, 15);
      
      // Simulate successful payment
      resolve({
        success: true,
        message: 'Payment processed successfully',
        transactionId
      });
    }, 1500);
  });
};
