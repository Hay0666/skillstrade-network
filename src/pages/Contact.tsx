
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Your message has been sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        <div className="mb-8 mt-4">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="text-muted-foreground mt-2">
            Get in touch with our team for support, feedback, or collaboration
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
            <div className="space-y-6">
              <Card className="p-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email Us</h3>
                    <p className="text-muted-foreground mb-1">For general inquiries:</p>
                    <a href="mailto:info@skillswap.com" className="text-primary hover:underline">
                      info@skillswap.com
                    </a>
                    <p className="text-muted-foreground mt-2 mb-1">For support:</p>
                    <a href="mailto:support@skillswap.com" className="text-primary hover:underline">
                      support@skillswap.com
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Call Us</h3>
                    <p className="text-muted-foreground mb-1">Customer Support:</p>
                    <a href="tel:+18005551234" className="text-primary hover:underline">
                      (800) 555-1234
                    </a>
                    <p className="text-muted-foreground mt-2 mb-1">Business Hours:</p>
                    <p>Monday - Friday: 9am - 5pm EST</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Visit Us</h3>
                    <p className="text-muted-foreground mb-1">Our Headquarters:</p>
                    <address className="not-italic">
                      123 Skill Street<br />
                      Suite 456<br />
                      San Francisco, CA 94107
                    </address>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    required
                  />
                </div>
                <div className="space-y-2 mb-6">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    rows={6}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Card>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-bold mb-2">How quickly will I receive a response?</h3>
              <p className="text-muted-foreground">
                We aim to respond to all inquiries within 24-48 business hours. For urgent matters, please contact our support line.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold mb-2">Where can I get help with my account?</h3>
              <p className="text-muted-foreground">
                For account-specific questions, please visit our Help Center or contact support@skillswap.com with your account details.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold mb-2">How do I report inappropriate behavior?</h3>
              <p className="text-muted-foreground">
                You can report inappropriate behavior by clicking the "Report" button on any profile or message, or by contacting our Trust & Safety team.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold mb-2">Can I suggest new features?</h3>
              <p className="text-muted-foreground">
                Absolutely! We love hearing from our community. Use the form above to submit your suggestions or email ideas@skillswap.com.
              </p>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
