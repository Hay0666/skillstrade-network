
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        <div className="mb-8 mt-4">
          <h1 className="text-3xl font-bold">About Skill Swap</h1>
          <p className="text-muted-foreground mt-2">
            Learn about our mission and how we're connecting people through skills
          </p>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="mb-4">
              Skill Swap was founded with a simple but powerful idea: everyone has something valuable to teach and something new to learn.
            </p>
            <p className="mb-4">
              We believe in the power of peer-to-peer learning and the incredible value that comes from sharing knowledge directly with others who are passionate about teaching and learning.
            </p>
            <p>
              Our platform connects people with complementary skills, creating a global community where knowledge flows freely and everyone benefits.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
              alt="Technology and learning"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-center mb-2">Accessibility</h3>
                <p className="text-center text-muted-foreground">
                  Knowledge should be available to everyone, regardless of location or background.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-center mb-2">Community</h3>
                <p className="text-center text-muted-foreground">
                  We foster meaningful connections through collaborative learning and teaching.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-center mb-2">Innovation</h3>
                <p className="text-center text-muted-foreground">
                  We're constantly evolving how people connect, teach, and learn together.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How It Started */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">How It All Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <p className="mb-4">
                Skill Swap began in 2023 when our founders, a group of lifelong learners, realized there was no easy way to connect with people for direct skill exchanges.
              </p>
              <p className="mb-4">
                They envisioned a platform where someone who wanted to learn photography could teach web development to someone who could teach them photography - creating a cycle of learning that benefits everyone involved.
              </p>
              <p>
                From humble beginnings with just a few hundred users exchanging skills locally, we've grown into a global community connecting thousands of people across continents and cultures.
              </p>
            </div>
            <div className="order-1 md:order-2 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
                alt="People collaborating"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Join Us */}
        <div className="bg-primary/5 rounded-lg p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="max-w-2xl mx-auto mb-6">
            Whether you want to teach your expertise or learn something new, Skill Swap offers a platform where knowledge flows freely and connections are made.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg">Sign Up Now</Button>
            <Button variant="outline" size="lg">Learn More</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
