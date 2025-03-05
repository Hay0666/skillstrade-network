
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ArrowLeft, CreditCard, CheckCircle, Calendar, BadgeInfo } from 'lucide-react';
import PlanCard from '@/components/subscription/PlanCard';
import CreditCardForm from '@/components/subscription/CreditCardForm';
import { subscriptionPlans, getUserSubscription, subscribeToPlan, cancelSubscription, getUserPaymentMethods, savePaymentMethod, getPlanById, cancelSubscriptionImmediately } from '@/services/subscriptionService';
import { processPayment } from '@/utils/paymentUtils';
import { SubscriptionPlan, SubscriptionStatus, PaymentMethod } from '@/types/subscription';
import { User } from '@/types/user';

const Subscription = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentSubscription, setCurrentSubscription] = useState<SubscriptionStatus | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedTabInterval, setSelectedTabInterval] = useState<'month' | 'year'>('month');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'select-plan' | 'payment'>('select-plan');
  
  useEffect(() => {
    const loadUserData = () => {
      try {
        // Check if user is logged in
        const storedUser = localStorage.getItem('skillswap_user');
        if (!storedUser) {
          toast.error('Please sign in to manage your subscription');
          navigate('/auth?mode=login');
          return;
        }
        
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
        
        // Get user's subscription
        const subscription = getUserSubscription(parsedUser.id);
        setCurrentSubscription(subscription);
        
        // Get user's payment methods
        const methods = getUserPaymentMethods(parsedUser.id);
        setPaymentMethods(methods);
        
      } catch (error) {
        console.error('Error loading user data:', error);
        toast.error('Error loading your data');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, [navigate]);
  
  const plansByInterval = subscriptionPlans.reduce(
    (acc, plan) => {
      acc[plan.interval].push(plan);
      return acc;
    },
    { month: [] as SubscriptionPlan[], year: [] as SubscriptionPlan[] }
  );
  
  const handlePlanSelect = (planId: string) => {
    setSelectedPlanId(planId);
  };
  
  const handleProceedToPayment = () => {
    if (!selectedPlanId) {
      toast.error('Please select a plan to continue');
      return;
    }
    
    setCheckoutStep('payment');
  };
  
  const handlePaymentSubmit = async (formData: {
    cardNumber: string;
    cardholderName: string;
    expiryDate: string;
    cvv: string;
  }) => {
    if (!currentUser || !selectedPlanId) {
      toast.error('Something went wrong. Please try again.');
      return;
    }
    
    setIsProcessingPayment(true);
    
    try {
      // Get the selected plan
      const selectedPlan = getPlanById(selectedPlanId);
      if (!selectedPlan) {
        throw new Error('Invalid plan selected');
      }
      
      // Process payment
      const paymentResult = await processPayment({
        ...formData,
        amount: selectedPlan.price
      });
      
      if (!paymentResult.success) {
        toast.error(paymentResult.message);
        return;
      }
      
      // Save the payment method
      const paymentMethod = savePaymentMethod(currentUser.id, {
        cardNumber: formData.cardNumber,
        cardholderName: formData.cardholderName,
        expiryDate: formData.expiryDate
      });
      
      // Subscribe user to the plan
      const subscription = subscribeToPlan(
        currentUser.id,
        selectedPlanId,
        paymentMethod.id
      );
      
      setCurrentSubscription(subscription);
      setPaymentMethods([...paymentMethods, paymentMethod]);
      
      // Show success message
      toast.success('Subscription activated successfully!');
      
      // Reset checkout state
      setCheckoutStep('select-plan');
      setSelectedPlanId('');
      
      // Force reload current user data
      const storedUser = localStorage.getItem('skillswap_user');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
      
    } catch (error) {
      console.error('Error processing subscription:', error);
      toast.error('Failed to process your subscription');
    } finally {
      setIsProcessingPayment(false);
    }
  };
  
  const handleCancelSubscription = async () => {
    if (!currentUser || !currentSubscription) {
      toast.error('No active subscription found');
      return;
    }
    
    const confirmed = window.confirm(
      'Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your current billing period.'
    );
    
    if (!confirmed) return;
    
    try {
      const result = cancelSubscription(currentUser.id, currentSubscription.id);
      
      if (result) {
        toast.success('Your subscription has been canceled and will end at the current billing period');
        
        // Update current subscription in state
        setCurrentSubscription({
          ...currentSubscription,
          cancelAtPeriodEnd: true
        });
      } else {
        throw new Error('Failed to cancel subscription');
      }
    } catch (error) {
      console.error('Error canceling subscription:', error);
      toast.error('Failed to cancel your subscription');
    }
  };
  
  const handleCancelImmediately = async () => {
    if (!currentUser || !currentSubscription) {
      toast.error('No active subscription found');
      return;
    }
    
    const confirmed = window.confirm(
      'Are you sure you want to cancel your subscription immediately? You will lose access to premium features right away and no refund will be provided.'
    );
    
    if (!confirmed) return;
    
    try {
      const result = cancelSubscriptionImmediately(currentUser.id, currentSubscription.id);
      
      if (result) {
        toast.success('Your subscription has been canceled immediately');
        
        // Update current subscription in state
        setCurrentSubscription(null);
        
        // Force reload current user data
        const storedUser = localStorage.getItem('skillswap_user');
        if (storedUser) {
          setCurrentUser(JSON.parse(storedUser));
        }
      } else {
        throw new Error('Failed to cancel subscription');
      }
    } catch (error) {
      console.error('Error canceling subscription:', error);
      toast.error('Failed to cancel your subscription');
    }
  };
  
  const handleGoBack = () => {
    if (checkoutStep === 'payment') {
      setCheckoutStep('select-plan');
    } else {
      navigate(-1);
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const getCurrentPlanInfo = () => {
    if (!currentSubscription) return null;
    
    const plan = getPlanById(currentSubscription.planId);
    if (!plan) return null;
    
    return {
      name: plan.name,
      price: plan.price,
      interval: plan.interval,
      endDate: formatDate(currentSubscription.currentPeriodEnd),
      isCancelled: currentSubscription.cancelAtPeriodEnd
    };
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  const currentPlanInfo = getCurrentPlanInfo();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        <Button 
          onClick={handleGoBack} 
          variant="ghost" 
          className="mb-6 flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Subscription Management</h1>
          
          {/* Current Subscription Status */}
          {currentPlanInfo ? (
            <Card className="mb-8 border-2 border-primary/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Current Subscription</CardTitle>
                    <CardDescription>
                      Your subscription details and management options
                    </CardDescription>
                  </div>
                  {currentPlanInfo.isCancelled && (
                    <div className="bg-destructive/10 text-destructive px-3 py-1 rounded-full text-sm font-medium">
                      Canceling Soon
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Plan</div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span className="font-medium">{currentPlanInfo.name}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Price</div>
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-primary mr-2" />
                      <span className="font-medium">
                        ${currentPlanInfo.price}/{currentPlanInfo.interval}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">
                      {currentPlanInfo.isCancelled ? 'Access Until' : 'Next Billing Date'}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-primary mr-2" />
                      <span className="font-medium">{currentPlanInfo.endDate}</span>
                    </div>
                  </div>
                </div>
                
                {currentPlanInfo.isCancelled ? (
                  <div className="bg-muted p-4 rounded-md">
                    <div className="flex items-start">
                      <BadgeInfo className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Your subscription is set to cancel</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          You will have access to all premium features until {currentPlanInfo.endDate}.
                          After that, your account will revert to the free plan.
                        </p>
                        <Button 
                          variant="link" 
                          className="p-0 h-auto mt-2 text-primary"
                          onClick={() => {
                            // This would reactivate the subscription in a real app
                            toast.info("This feature would reactivate your subscription in a real app");
                          }}
                        >
                          Reactivate subscription
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      variant="outline" 
                      onClick={handleCancelSubscription}
                    >
                      Cancel at Period End
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={handleCancelImmediately}
                    >
                      Cancel Immediately
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>No Active Subscription</CardTitle>
                <CardDescription>
                  You are currently on the free plan with limited features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Upgrade to a premium plan to unlock more features and improve your skill exchange experience!
                </p>
              </CardContent>
            </Card>
          )}
          
          {/* Subscription Checkout */}
          {checkoutStep === 'select-plan' ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Choose a Plan</h2>
              
              <Tabs 
                defaultValue="month" 
                value={selectedTabInterval} 
                onValueChange={(value) => setSelectedTabInterval(value as 'month' | 'year')}
                className="w-full"
              >
                <TabsList className="grid w-full max-w-xs grid-cols-2 mx-auto mb-8">
                  <TabsTrigger value="month">Monthly</TabsTrigger>
                  <TabsTrigger value="year">Yearly</TabsTrigger>
                </TabsList>
                
                <TabsContent value="month" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {plansByInterval.month.map((plan) => (
                      <PlanCard
                        key={plan.id}
                        plan={plan}
                        isSelected={selectedPlanId === plan.id}
                        currentPlanId={currentSubscription?.planId}
                        onSelect={() => handlePlanSelect(plan.id)}
                      />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="year" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {plansByInterval.year.map((plan) => (
                      <PlanCard
                        key={plan.id}
                        plan={plan}
                        isSelected={selectedPlanId === plan.id}
                        currentPlanId={currentSubscription?.planId}
                        onSelect={() => handlePlanSelect(plan.id)}
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-center mt-8">
                <Button 
                  size="lg" 
                  onClick={handleProceedToPayment}
                  disabled={!selectedPlanId}
                >
                  Continue to Payment
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Payment Information</h2>
              
              <CreditCardForm 
                onSubmit={handlePaymentSubmit}
                isProcessing={isProcessingPayment}
              />
              
              <p className="text-center text-sm text-muted-foreground">
                By proceeding with the payment, you agree to our terms of service and subscription policy.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Subscription;
