
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Premium = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      billing: "Forever",
      description: "Basic features for individuals just getting started with skill exchanges.",
      features: [
        { included: true, text: "Create a profile" },
        { included: true, text: "List up to 3 skills to teach" },
        { included: true, text: "List up to 3 skills to learn" },
        { included: true, text: "Up to 5 matches per month" },
        { included: false, text: "Priority matching" },
        { included: false, text: "Advanced search filters" },
        { included: false, text: "Verified badge" },
        { included: false, text: "Featured in search results" },
      ],
      buttonText: "Current Plan",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Premium",
      price: "$9.99",
      billing: "per month",
      description: "Enhanced features for serious skill exchangers looking for more connections.",
      features: [
        { included: true, text: "Create a profile" },
        { included: true, text: "Unlimited skills to teach" },
        { included: true, text: "Unlimited skills to learn" },
        { included: true, text: "Unlimited matches" },
        { included: true, text: "Priority matching" },
        { included: true, text: "Advanced search filters" },
        { included: true, text: "Verified badge" },
        { included: false, text: "Featured in search results" },
      ],
      buttonText: "Upgrade to Premium",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: "Professional",
      price: "$19.99",
      billing: "per month",
      description: "Advanced features for professionals who teach frequently.",
      features: [
        { included: true, text: "Create a profile" },
        { included: true, text: "Unlimited skills to teach" },
        { included: true, text: "Unlimited skills to learn" },
        { included: true, text: "Unlimited matches" },
        { included: true, text: "Priority matching" },
        { included: true, text: "Advanced search filters" },
        { included: true, text: "Verified badge" },
        { included: true, text: "Featured in search results" },
      ],
      buttonText: "Upgrade to Professional",
      buttonVariant: "default" as const,
      popular: false
    }
  ];

  const benefits = [
    {
      title: "Unlimited Matching",
      description: "Connect with as many skill partners as you want without monthly limits.",
      icon: "🔄"
    },
    {
      title: "Priority in Search Results",
      description: "Get discovered more easily when others are searching for the skills you teach.",
      icon: "🔍"
    },
    {
      title: "Verified Profile Badge",
      description: "Stand out with a verified badge that builds trust with potential matches.",
      icon: "✅"
    },
    {
      title: "Advanced Filters",
      description: "Find the perfect skill match with additional filtering options.",
      icon: "🔧"
    }
  ];

  const faqs = [
    {
      question: "Can I cancel my subscription at any time?",
      answer: "Yes, you can cancel your subscription at any time. Your premium features will remain active until the end of your current billing period."
    },
    {
      question: "Is there a difference in the quality of matches between plans?",
      answer: "The quality of potential matches is the same across all plans. Premium plans simply offer more quantity and visibility features."
    },
    {
      question: "Can I switch between plans?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle."
    },
    {
      question: "Do you offer any discounts for annual subscriptions?",
      answer: "Yes, we offer a 20% discount when you choose annual billing for any of our premium plans."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        <div className="mb-8 mt-4 text-center">
          <h1 className="text-3xl font-bold">Premium Plans</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Unlock advanced features to enhance your skill exchange experience and connect with more people
          </p>
        </div>

        {/* Pricing Tables */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, index) => (
            <Card key={index} className={`flex flex-col ${plan.popular ? 'border-primary shadow-lg relative' : ''}`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-md">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>{" "}
                  <span className="text-muted-foreground">/ {plan.billing}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground mr-2 shrink-0" />
                      )}
                      <span className={!feature.included ? "text-muted-foreground" : ""}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant={plan.buttonVariant} className="w-full" size="lg" asChild>
                  <Link to="/subscription">{plan.buttonText}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Benefits */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Premium Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <span className="text-4xl">{benefit.icon}</span>
                  </div>
                  <h3 className="text-xl font-medium text-center mb-2">{benefit.title}</h3>
                  <p className="text-center text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-12 bg-primary/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">What Premium Members Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-background p-6 rounded-lg border">
              <p className="italic mb-4">"The premium features helped me find the perfect match for trading Spanish lessons for guitar lessons. Well worth the investment!"</p>
              <div className="flex items-center">
                <div className="font-medium">Alex T.</div>
                <div className="ml-auto text-yellow-500">★★★★★</div>
              </div>
            </div>
            <div className="bg-background p-6 rounded-lg border">
              <p className="italic mb-4">"Being featured in search results has dramatically increased the number of people contacting me to learn digital marketing."</p>
              <div className="flex items-center">
                <div className="font-medium">Maya P.</div>
                <div className="ml-auto text-yellow-500">★★★★★</div>
              </div>
            </div>
            <div className="bg-background p-6 rounded-lg border">
              <p className="italic mb-4">"The verified badge makes a huge difference. People trust me more when reaching out for cooking lessons."</p>
              <div className="flex items-center">
                <div className="font-medium">Carlos M.</div>
                <div className="ml-auto text-yellow-500">★★★★☆</div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary/10 rounded-lg p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Ready to Unlock Premium Features?</h2>
          <p className="max-w-2xl mx-auto mb-6">
            Upgrade today and enhance your skill exchange experience with unlimited matches, priority visibility, and more.
          </p>
          <Button size="lg" asChild>
            <Link to="/subscription">View Subscription Options</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Premium;
