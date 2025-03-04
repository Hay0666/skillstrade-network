
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

// Sample skill categories and popular skills for demonstration
const SKILL_CATEGORIES = [
  { id: 1, name: 'Technology', count: 156 },
  { id: 2, name: 'Arts & Crafts', count: 94 },
  { id: 3, name: 'Languages', count: 78 },
  { id: 4, name: 'Music', count: 112 },
  { id: 5, name: 'Cooking', count: 89 },
  { id: 6, name: 'Sports', count: 67 },
];

const POPULAR_SKILLS = [
  { id: 1, name: 'JavaScript Programming', category: 'Technology', users: 48 },
  { id: 2, name: 'Watercolor Painting', category: 'Arts & Crafts', users: 32 },
  { id: 3, name: 'Spanish Language', category: 'Languages', users: 41 },
  { id: 4, name: 'Guitar Lessons', category: 'Music', users: 37 },
  { id: 5, name: 'French Cuisine', category: 'Cooking', users: 29 },
  { id: 6, name: 'Yoga', category: 'Sports', users: 26 },
];

const ExploreSkills = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSkills, setFilteredSkills] = useState(POPULAR_SKILLS);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSkills(POPULAR_SKILLS);
    } else {
      const query = searchQuery.toLowerCase();
      const results = POPULAR_SKILLS.filter(
        skill => skill.name.toLowerCase().includes(query) || skill.category.toLowerCase().includes(query)
      );
      setFilteredSkills(results);
    }
  }, [searchQuery]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        <div className="mb-8 mt-4">
          <h1 className="text-3xl font-bold">Explore Skills</h1>
          <p className="text-muted-foreground mt-2">
            Discover skills you can learn or teach in our community
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="relative">
            <Input
              className="pl-10 py-6"
              placeholder="Search for skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Skill Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SKILL_CATEGORIES.map((category) => (
              <Card key={category.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{category.count} skills available</CardDescription>
                  <Button variant="outline" className="mt-2 w-full">Browse</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Skills */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Popular Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.map((skill) => (
              <Card key={skill.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{skill.name}</CardTitle>
                  <CardDescription>Category: {skill.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{skill.users} users teaching this skill</p>
                  <div className="flex gap-2 mt-3">
                    <Button variant="default" size="sm">Learn</Button>
                    <Button variant="outline" size="sm">Teach</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredSkills.length === 0 && (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">No skills found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-lg overflow-hidden mb-10">
          <img 
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
            alt="People sharing skills" 
            className="w-full h-64 object-cover"
          />
          <div className="bg-primary p-6">
            <h3 className="text-xl font-bold text-white mb-2">Join the Skill Swap Community</h3>
            <p className="text-primary-foreground mb-4">Connect with people worldwide who are ready to exchange knowledge</p>
            <Button variant="secondary">Sign Up Today</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExploreSkills;
