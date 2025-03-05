
import { SubscriptionPlan, SubscriptionStatus, PaymentMethod } from '@/types/subscription';
import { User } from '@/types/user';
import { v4 as uuidv4 } from 'uuid';

// Define available subscription plans
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'monthly-basic',
    name: 'Monthly Basic',
    description: 'Perfect for individuals looking to exchange skills casually',
    price: 9.99,
    interval: 'month',
    features: [
      'Unlimited skill matching',
      'Message up to 10 users',
      'Access to community forums',
      'Basic support'
    ]
  },
  {
    id: 'yearly-basic',
    name: 'Yearly Basic',
    description: 'Save 20% with our yearly plan',
    price: 95.88, // $7.99 per month billed annually
    interval: 'year',
    features: [
      'Everything in Monthly Basic',
      'Two months free',
      'Premium support'
    ]
  },
  {
    id: 'monthly-premium',
    name: 'Monthly Premium',
    description: 'For serious skill swappers who want all features',
    price: 19.99,
    interval: 'month',
    features: [
      'Everything in Monthly Basic',
      'Unlimited messaging',
      'Featured profile placement',
      'Priority matching',
      'Priority support'
    ]
  },
  {
    id: 'yearly-premium',
    name: 'Yearly Premium',
    description: 'Our best value plan with all premium features',
    price: 191.88, // $15.99 per month billed annually
    interval: 'year',
    features: [
      'Everything in Monthly Premium',
      'Two months free',
      'Exclusive workshop access',
      'VIP support'
    ]
  }
];

// Get currently active subscriptions from localStorage
export const getUserSubscription = (userId: string): SubscriptionStatus | null => {
  try {
    const subscriptions = JSON.parse(localStorage.getItem('skillswap_subscriptions') || '[]');
    return subscriptions.find((sub: SubscriptionStatus) => sub.userId === userId && sub.status === 'active') || null;
  } catch (error) {
    console.error('Error getting user subscription:', error);
    return null;
  }
};

// Get a plan by ID
export const getPlanById = (planId: string): SubscriptionPlan | undefined => {
  return subscriptionPlans.find(plan => plan.id === planId);
};

// Subscribe a user to a plan
export const subscribeToPlan = (
  userId: string, 
  planId: string, 
  paymentMethodId: string
): SubscriptionStatus => {
  try {
    // Get the plan details
    const plan = getPlanById(planId);
    if (!plan) {
      throw new Error('Invalid plan selected');
    }
    
    // Calculate period end date based on plan interval
    const now = new Date();
    const currentPeriodStart = now.toISOString();
    
    const periodEnd = new Date(now);
    if (plan.interval === 'month') {
      periodEnd.setMonth(periodEnd.getMonth() + 1);
    } else {
      periodEnd.setFullYear(periodEnd.getFullYear() + 1);
    }
    
    // Create new subscription
    const newSubscription: SubscriptionStatus = {
      id: uuidv4(),
      userId,
      planId,
      status: 'active',
      currentPeriodStart,
      currentPeriodEnd: periodEnd.toISOString(),
      cancelAtPeriodEnd: false,
      createdAt: currentPeriodStart
    };
    
    // Save to localStorage
    const subscriptions = JSON.parse(localStorage.getItem('skillswap_subscriptions') || '[]');
    
    // Cancel any existing active subscriptions for this user
    const updatedSubscriptions = subscriptions
      .map((sub: SubscriptionStatus) => {
        if (sub.userId === userId && sub.status === 'active') {
          return { ...sub, status: 'canceled' };
        }
        return sub;
      })
      .concat(newSubscription);
    
    localStorage.setItem('skillswap_subscriptions', JSON.stringify(updatedSubscriptions));
    
    // Update user object with subscription info
    updateUserSubscription(userId, planId);
    
    return newSubscription;
  } catch (error) {
    console.error('Error subscribing to plan:', error);
    throw error;
  }
};

// Cancel a subscription (at period end)
export const cancelSubscription = (userId: string, subscriptionId: string): boolean => {
  try {
    const subscriptions = JSON.parse(localStorage.getItem('skillswap_subscriptions') || '[]');
    
    const updatedSubscriptions = subscriptions.map((sub: SubscriptionStatus) => {
      if (sub.id === subscriptionId && sub.userId === userId) {
        return {
          ...sub,
          cancelAtPeriodEnd: true
        };
      }
      return sub;
    });
    
    localStorage.setItem('skillswap_subscriptions', JSON.stringify(updatedSubscriptions));
    
    return true;
  } catch (error) {
    console.error('Error canceling subscription:', error);
    return false;
  }
};

// Cancel a subscription immediately
export const cancelSubscriptionImmediately = (userId: string, subscriptionId: string): boolean => {
  try {
    const subscriptions = JSON.parse(localStorage.getItem('skillswap_subscriptions') || '[]');
    
    const updatedSubscriptions = subscriptions.map((sub: SubscriptionStatus) => {
      if (sub.id === subscriptionId && sub.userId === userId) {
        return {
          ...sub,
          status: 'canceled',
          cancelAtPeriodEnd: false
        };
      }
      return sub;
    });
    
    localStorage.setItem('skillswap_subscriptions', JSON.stringify(updatedSubscriptions));
    
    // Update user object
    const users = JSON.parse(localStorage.getItem('skillswap_users') || '[]');
    const updatedUsers = users.map((user: User) => {
      if (user.id === userId) {
        return {
          ...user,
          subscription: {
            planId: '',
            status: 'free'
          }
        };
      }
      return user;
    });
    
    localStorage.setItem('skillswap_users', JSON.stringify(updatedUsers));
    
    // Update current user if that's who is canceling
    const currentUser = JSON.parse(localStorage.getItem('skillswap_user') || 'null');
    if (currentUser && currentUser.id === userId) {
      const updatedUser = {
        ...currentUser,
        subscription: {
          planId: '',
          status: 'free'
        }
      };
      localStorage.setItem('skillswap_user', JSON.stringify(updatedUser));
    }
    
    return true;
  } catch (error) {
    console.error('Error canceling subscription immediately:', error);
    return false;
  }
};

// Update user with subscription info
const updateUserSubscription = (userId: string, planId: string): void => {
  try {
    // Update users array
    const users = JSON.parse(localStorage.getItem('skillswap_users') || '[]');
    const updatedUsers = users.map((user: User) => {
      if (user.id === userId) {
        return {
          ...user,
          subscription: {
            planId,
            status: 'active'
          }
        };
      }
      return user;
    });
    
    localStorage.setItem('skillswap_users', JSON.stringify(updatedUsers));
    
    // Update current user if that's who is subscribing
    const currentUser = JSON.parse(localStorage.getItem('skillswap_user') || 'null');
    if (currentUser && currentUser.id === userId) {
      const updatedUser = {
        ...currentUser,
        subscription: {
          planId,
          status: 'active'
        }
      };
      localStorage.setItem('skillswap_user', JSON.stringify(updatedUser));
    }
  } catch (error) {
    console.error('Error updating user subscription:', error);
  }
};

// Save a payment method
export const savePaymentMethod = (
  userId: string,
  paymentDetails: {
    cardNumber: string;
    cardholderName: string;
    expiryDate: string;
  }
): PaymentMethod => {
  try {
    const cardType = getCardType(paymentDetails.cardNumber);
    
    const newPaymentMethod: PaymentMethod = {
      id: uuidv4(),
      userId,
      cardNumber: paymentDetails.cardNumber, // In a real app, encrypt or just store last 4
      cardholderName: paymentDetails.cardholderName,
      expiryDate: paymentDetails.expiryDate,
      cardType,
      isDefault: true
    };
    
    // Get existing payment methods
    const paymentMethods = JSON.parse(localStorage.getItem('skillswap_payment_methods') || '[]');
    
    // If this is set as default, remove default from other cards
    const updatedPaymentMethods = paymentMethods
      .map((method: PaymentMethod) => {
        if (method.userId === userId && method.isDefault) {
          return { ...method, isDefault: false };
        }
        return method;
      })
      .concat(newPaymentMethod);
    
    localStorage.setItem('skillswap_payment_methods', JSON.stringify(updatedPaymentMethods));
    
    return newPaymentMethod;
  } catch (error) {
    console.error('Error saving payment method:', error);
    throw error;
  }
};

// Get user's payment methods
export const getUserPaymentMethods = (userId: string): PaymentMethod[] => {
  try {
    const paymentMethods = JSON.parse(localStorage.getItem('skillswap_payment_methods') || '[]');
    return paymentMethods.filter((method: PaymentMethod) => method.userId === userId);
  } catch (error) {
    console.error('Error getting user payment methods:', error);
    return [];
  }
};

// Get card type based on card number
const getCardType = (cardNumber: string): 'visa' | 'mastercard' | 'amex' | 'discover' | 'other' => {
  const digitsOnly = cardNumber.replace(/\D/g, '');
  
  if (/^4/.test(digitsOnly)) {
    return 'visa';
  } else if (/^5[1-5]/.test(digitsOnly)) {
    return 'mastercard';
  } else if (/^3[47]/.test(digitsOnly)) {
    return 'amex';
  } else if (/^6(?:011|5)/.test(digitsOnly)) {
    return 'discover';
  } else {
    return 'other';
  }
};
