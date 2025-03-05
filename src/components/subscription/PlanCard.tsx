
import React from 'react';
import { SubscriptionPlan } from '@/types/subscription';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PlanCardProps {
  plan: SubscriptionPlan;
  isSelected: boolean;
  currentPlanId?: string;
  onSelect: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ 
  plan, 
  isSelected, 
  currentPlanId,
  onSelect 
}) => {
  const isCurrentPlan = currentPlanId === plan.id;
  
  return (
    <Card 
      className={`border-2 transition-all ${
        isSelected 
          ? 'border-primary bg-primary/5' 
          : isCurrentPlan 
            ? 'border-secondary bg-secondary/5' 
            : 'border-border hover:border-primary/50'
      }`}
    >
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{plan.name}</span>
          {isCurrentPlan && (
            <span className="text-xs font-medium py-1 px-2 bg-secondary/20 text-secondary rounded-full">
              Current Plan
            </span>
          )}
        </CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <p className="text-3xl font-bold">
            ${plan.price}
            <span className="text-sm font-normal text-muted-foreground">
              /{plan.interval}
            </span>
          </p>
        </div>
        
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onSelect}
          variant={isSelected ? "default" : "outline"}
          className="w-full"
          disabled={isCurrentPlan}
        >
          {isCurrentPlan 
            ? 'Current Plan' 
            : isSelected 
              ? 'Selected' 
              : 'Select Plan'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
