
import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import HowItWorks from '@/components/home/HowItWorks';
import OpenAIChatInterface from '@/components/chat/OpenAIChatInterface';


const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('User');
  const [userSkills, setUserSkills] = useState<string[]>([]);

  // Check user login status
  useEffect(() => {
    const userInfo = localStorage.getItem('skillswap_user');
    if (userInfo) {
      try {
        const userData = JSON.parse(userInfo);
        setIsLoggedIn(true);
        setUserName(userData.name || 'User');
        
        // Extract user skills if available - combine teachSkills and learnSkills
        const combinedSkills = [];
        if (userData.teachSkills && Array.isArray(userData.teachSkills)) {
          combinedSkills.push(...userData.teachSkills);
        }
        if (userData.learnSkills && Array.isArray(userData.learnSkills)) {
          combinedSkills.push(...userData.learnSkills);
        }
        setUserSkills(combinedSkills);
      } catch (e) {
        console.error('Error parsing user info:', e);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  
  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.hash && link.hash.startsWith('#') && link.origin === window.location.origin) {
        e.preventDefault();
        const targetId = link.hash.slice(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100, // Offset for the fixed header
            behavior: 'smooth'
          });
          
          // Update URL but don't scroll again
          window.history.pushState(null, '', link.hash);
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
      
      {/* OpenAI Chat Interface */}
      <OpenAIChatInterface />
      
    </div>
  );
};

export default Index;
