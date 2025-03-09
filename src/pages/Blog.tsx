
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Finding Your Perfect Skill Match: A Beginner's Guide",
      excerpt: "Learn how to identify the skills you want to teach and those you want to learn for the most rewarding skill exchange experience.",
      date: "June 15, 2023",
      author: {
        name: "Alex Johnson",
        avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=100&auto=format&fit=crop"
      },
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "5 Tips for Teaching a Skill You've Mastered",
      excerpt: "Even experts can struggle when teaching others. Here are our top tips for effectively sharing your skills with beginners.",
      date: "July 2, 2023",
      author: {
        name: "Maya Patel",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop"
      },
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "The Psychology of Skill Acquisition: How We Learn",
      excerpt: "Understanding the science behind learning can help you pick up new skills faster and teach more effectively.",
      date: "August 10, 2023",
      author: {
        name: "Dr. James Wilson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop"
      },
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Success Story: How Sarah Learned Photography Through Skill Swap",
      excerpt: "Sarah traded her graphic design expertise for photography lessons, launching a new career in the process.",
      date: "September 5, 2023",
      author: {
        name: "Olivia Chen",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop"
      },
      image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Building Community Through Knowledge Sharing",
      excerpt: "How skill exchanges create meaningful connections and build stronger communities in an increasingly digital world.",
      date: "October 18, 2023",
      author: {
        name: "Michael Rodriguez",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
      },
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "The Future of Learning is Peer-to-Peer",
      excerpt: "Why traditional education is being complemented by direct skill exchanges and what that means for lifelong learners.",
      date: "November 7, 2023",
      author: {
        name: "Emma Washington",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
      },
      image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        <div className="mb-8 mt-4">
          <h1 className="text-3xl font-bold">Skill Swap Blog</h1>
          <p className="text-muted-foreground mt-2">
            Insights, stories, and tips to help you make the most of your skill sharing journey
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="order-2 md:order-1 p-6 flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="text-sm font-medium">Jessica Doe</span>
                    <span className="text-xs text-muted-foreground block">May 12, 2024</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-4">How Skill Swapping Changed My Life: A Personal Journey</h2>
                <p className="text-muted-foreground mb-6">
                  After years of trying to learn new skills through courses and tutorials, I discovered the power of direct peer-to-peer learning. This is my story of how teaching what I knew and learning what I didn't transformed both my career and personal life.
                </p>
                <Link to="#" className="text-primary font-medium hover:underline">Read the full story →</Link>
              </div>
              <div className="order-1 md:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop" 
                  alt="Person learning new skills"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.map(post => (
            <Card key={post.id} className="overflow-hidden flex flex-col">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{post.author.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{post.date}</span>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Newsletter Sign-up */}
        <div className="bg-primary/5 rounded-lg p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="max-w-2xl mx-auto mb-6">
            Get the latest articles, success stories, and skill-sharing tips delivered directly to your inbox.
          </p>
          <div className="flex flex-wrap justify-center gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-2 rounded-md border flex-1 min-w-[200px]"
            />
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
