import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { MessageSquare, Award, Users, Heart } from 'lucide-react';

const Community = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const userInfo = localStorage.getItem('skillswap_user');
    if (userInfo) {
      try {
        setIsLoggedIn(true);
      } catch (e) {
        console.error('Error parsing user info:', e);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const successStories = [
    {
      id: 1,
      name: "Michael Rodriguez",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      location: "Toronto, Canada",
      taught: "Web Development",
      learned: "French Language",
      story: "I was able to build a portfolio website for a local restaurant owner who taught me conversational French. Now I can speak French at a basic level and she has doubled her online orders!"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      location: "London, UK",
      taught: "Yoga Instruction",
      learned: "Photography",
      story: "As a yoga instructor, I wanted to learn photography to better market my classes. I connected with a photographer who wanted to improve his flexibility and mindfulness. It's been an amazing exchange!"
    },
    {
      id: 3,
      name: "David Chen",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      location: "Melbourne, Australia",
      taught: "Playing Guitar",
      learned: "Graphic Design",
      story: "I've been playing guitar for 15 years but needed help with designing album artwork. I found a designer who always wanted to learn an instrument. We both got exactly what we needed!"
    }
  ];

  const forums = [
    {
      id: 1,
      title: "Teaching Techniques",
      description: "Share effective methods for teaching your skills to beginners",
      posts: 127,
      members: 542
    },
    {
      id: 2,
      title: "Skill Exchange Success Stories",
      description: "Celebrate your wins and share how skill swapping changed your life",
      posts: 89,
      members: 328
    },
    {
      id: 3,
      title: "Learning Challenges",
      description: "Discuss obstacles in learning new skills and get advice from the community",
      posts: 211,
      members: 756
    },
    {
      id: 4,
      title: "Skill Recommendations",
      description: "Looking for suggestions on what skills to learn next? Ask here!",
      posts: 164,
      members: 491
    }
  ];

  const guidelines = [
    {
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      title: "Respectful Communication",
      description: "Always communicate respectfully, even when disagreeing. Embrace diversity of thought and experience."
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Quality Exchanges",
      description: "Commit to providing real value in your teaching and be an engaged learner when receiving instruction."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Building Relationships",
      description: "Focus on creating meaningful connections beyond the initial skill exchange."
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Pay It Forward",
      description: "Consider teaching extra skills to those who may not have something to exchange with you directly."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        <div className="mb-8 mt-4">
          <h1 className="text-3xl font-bold">Our Community</h1>
          <p className="text-muted-foreground mt-2">
            Join thousands of members sharing knowledge and building connections
          </p>
        </div>

        {/* Hero Section */}
        <div className="bg-primary/5 rounded-lg p-8 mb-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Be Part of Something Special</h2>
          <p className="max-w-2xl mx-auto mb-6">
            The Skill Swap community is more than just a platform—it's a movement to democratize learning and create meaningful connections through shared knowledge.
          </p>
          {!isLoggedIn && (
            <Button size="lg" asChild>
              <Link to="/auth?mode=register">Join the Community</Link>
            </Button>
          )}
        </div>

        {/* Community Guidelines */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Community Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guidelines.map((guideline, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <div className="mb-4 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
                      {guideline.icon}
                    </div>
                    <h3 className="text-xl font-medium text-center mb-2">{guideline.title}</h3>
                    <p className="text-center text-muted-foreground">
                      {guideline.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {successStories.map(story => (
              <Card key={story.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarImage src={story.avatar} alt={story.name} />
                      <AvatarFallback>{story.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-medium text-center">{story.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{story.location}</p>
                    <div className="bg-secondary/50 px-3 py-1 rounded-full text-xs font-medium mb-4 flex gap-2">
                      <span>Taught: {story.taught}</span>
                      <span>•</span>
                      <span>Learned: {story.learned}</span>
                    </div>
                    <p className="text-center text-muted-foreground">
                      "{story.story}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-6">
            <Button variant="outline">View More Success Stories</Button>
          </div>
        </div>

        {/* Community Forums */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Community Forums</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {forums.map(forum => (
              <Card key={forum.id} className="hover:border-primary transition-colors">
                <CardHeader>
                  <CardTitle>{forum.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {forum.description}
                  </p>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{forum.posts} posts</span>
                    <span className="text-muted-foreground">{forum.members} members</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold mb-2">How do I find people to swap skills with?</h3>
                <p className="text-muted-foreground">
                  Our matching algorithm will suggest people based on the skills you want to learn and teach. You can also browse profiles manually to find the perfect match.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold mb-2">What if I don't have a skill to teach yet?</h3>
                <p className="text-muted-foreground">
                  Everyone has something valuable to share! Our skills assessment can help you identify skills you may not realize you have that others would love to learn.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold mb-2">How are skill exchanges conducted?</h3>
                <p className="text-muted-foreground">
                  Exchanges can happen virtually or in-person, depending on your preferences and location. Our platform provides tools for scheduling and communication.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold mb-2">Is there a guarantee for the quality of teaching?</h3>
                <p className="text-muted-foreground">
                  While we can't guarantee quality, our rating system helps maintain high standards. Always check reviews before committing to an exchange.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary/5 rounded-lg p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Exchanging Skills?</h2>
          <p className="max-w-2xl mx-auto mb-6">
            Join thousands of people already sharing knowledge and building meaningful connections through Skill Swap.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {!isLoggedIn && (
              <>
                <Button size="lg" asChild>
                  <Link to="/auth?mode=register">Create Your Profile</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/explore">Browse Skills</Link>
                </Button>
              </>
            )}
            {isLoggedIn && (
              <Button variant="outline" size="lg" asChild>
                <Link to="/explore">Browse Skills</Link>
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
