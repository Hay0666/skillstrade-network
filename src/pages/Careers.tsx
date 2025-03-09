
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Careers = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        <div className="mb-8 mt-4">
          <h1 className="text-3xl font-bold">Join Our Team</h1>
          <p className="text-muted-foreground mt-2">
            Help us build the future of peer-to-peer skill sharing
          </p>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">Work With Purpose</h2>
            <p className="mb-4">
              At Skill Swap, we're on a mission to democratize education and connect people who want to learn directly with those who can teach.
            </p>
            <p className="mb-4">
              We're building a platform that empowers individuals to share their skills, expand their horizons, and form meaningful connections in the process.
            </p>
            <p>
              If you're passionate about education, technology, and building community, we want you on our team.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
              alt="Team collaboration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Company Values */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Company Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-medium text-center mb-2">Innovation</h3>
                <p className="text-center text-muted-foreground">
                  We embrace creative solutions and continually challenge ourselves to improve.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-medium text-center mb-2">Inclusion</h3>
                <p className="text-center text-muted-foreground">
                  We value diverse perspectives and create a welcoming environment for all.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-medium text-center mb-2">Impact</h3>
                <p className="text-center text-muted-foreground">
                  We measure our success by the positive difference we make in people's lives.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Senior Full Stack Developer</CardTitle>
                <CardDescription>Engineering • Remote</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  We're looking for an experienced full-stack developer to help build and scale our platform. You'll work with modern technologies like React, Node.js, and cloud infrastructure.
                </p>
                <Button>Apply Now</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>UX/UI Designer</CardTitle>
                <CardDescription>Design • Remote</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Join our design team to create intuitive, accessible, and delightful user experiences. You'll collaborate closely with product and engineering teams.
                </p>
                <Button>Apply Now</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community Manager</CardTitle>
                <CardDescription>Operations • Remote</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Help us build and nurture our growing community of skill sharers. You'll develop engagement strategies and support our users.
                </p>
                <Button>Apply Now</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Marketing Specialist</CardTitle>
                <CardDescription>Marketing • Remote</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Drive growth through innovative marketing campaigns and strategies. You'll help us reach new users and communicate our value.
                </p>
                <Button>Apply Now</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Application Process */}
        <div className="bg-primary/5 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Hiring Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">1</span>
              </div>
              <h3 className="font-medium mb-2">Application Review</h3>
              <p className="text-sm text-muted-foreground">We'll review your resume and application materials.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">2</span>
              </div>
              <h3 className="font-medium mb-2">Initial Interview</h3>
              <p className="text-sm text-muted-foreground">Get to know the team and share your experiences.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">3</span>
              </div>
              <h3 className="font-medium mb-2">Skills Assessment</h3>
              <p className="text-sm text-muted-foreground">Demonstrate your relevant skills through practical tasks.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">4</span>
              </div>
              <h3 className="font-medium mb-2">Final Interview</h3>
              <p className="text-sm text-muted-foreground">Meet with leadership and discuss your potential role.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
