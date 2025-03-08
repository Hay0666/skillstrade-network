import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, ArrowLeft } from 'lucide-react';
import ProfileCard from '@/components/profile/ProfileCard';
import { User } from '@/types/user';
import { sampleProfiles } from '@/utils/sampleProfiles';
import { loadSampleProfiles } from '@/utils/loadSampleProfiles';

const categoryImages = {
  "Technology": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
  "Arts & Crafts": "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=600&auto=format&fit=crop",
  "Languages": "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=600&auto=format&fit=crop",
  "Music": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=600&auto=format&fit=crop",
  "Cooking": "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?q=80&w=600&auto=format&fit=crop",
  "Sports": "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop",
};

const SKILL_CATEGORIES = [
  { id: 1, name: 'Technology', count: 156, image: categoryImages["Technology"] },
  { id: 2, name: 'Arts & Crafts', count: 94, image: categoryImages["Arts & Crafts"] },
  { id: 3, name: 'Languages', count: 78, image: categoryImages["Languages"] },
  { id: 4, name: 'Music', count: 112, image: categoryImages["Music"] },
  { id: 5, name: 'Cooking', count: 89, image: categoryImages["Cooking"] },
  { id: 6, name: 'Sports', count: 67, image: categoryImages["Sports"] },
];

const ExploreSkills = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSkills, setFilteredSkills] = useState<Array<{id: number, name: string, category: string, users: number}>>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [matchingProfiles, setMatchingProfiles] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allProfiles, setAllProfiles] = useState<User[]>([]);
  const [teachingProfiles, setTeachingProfiles] = useState<User[]>([]);
  const [learningProfiles, setLearningProfiles] = useState<User[]>([]);
  const [popularSkills, setPopularSkills] = useState<Array<{id: number, name: string, category: string, users: number}>>([]);

  useEffect(() => {
    loadSampleProfiles(false);
    const storedUser = localStorage.getItem('skillswap_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    const usersString = localStorage.getItem('skillswap_users');
    let profiles: User[] = [];
    if (usersString) {
      profiles = JSON.parse(usersString);
    } else {
      profiles = sampleProfiles;
    }
    setAllProfiles(profiles);

    const skillCountMap = new Map<string, {category: string, count: number}>();
    const initialSkills = [
      { key: 'JavaScript Programming', category: 'Technology' },
      { key: 'Watercolor Painting', category: 'Arts & Crafts' },
      { key: 'Spanish Language', category: 'Languages' },
      { key: 'Guitar Lessons', category: 'Music' },
      { key: 'French Cuisine', category: 'Cooking' },
      { key: 'Yoga', category: 'Sports' },
    ];
    
    initialSkills.forEach(skill => {
      skillCountMap.set(skill.key, { category: skill.category, count: 0 });
    });
    
    profiles.forEach(profile => {
      profile.teachSkills.forEach(skill => {
        let category = 'Technology';
        if (skill.toLowerCase().includes('paint') || skill.toLowerCase().includes('craft') || skill.toLowerCase().includes('art')) {
          category = 'Arts & Crafts';
        } else if (skill.toLowerCase().includes('language') || skill.toLowerCase().includes('spanish') || skill.toLowerCase().includes('french')) {
          category = 'Languages';
        } else if (skill.toLowerCase().includes('music') || skill.toLowerCase().includes('guitar') || skill.toLowerCase().includes('piano')) {
          category = 'Music';
        } else if (skill.toLowerCase().includes('cook') || skill.toLowerCase().includes('cuisine') || skill.toLowerCase().includes('baking')) {
          category = 'Cooking';
        } else if (skill.toLowerCase().includes('yoga') || skill.toLowerCase().includes('sport') || skill.toLowerCase().includes('exercise')) {
          category = 'Sports';
        }
        
        let mapped = false;
        for (const [key, value] of skillCountMap.entries()) {
          if (key.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(key.toLowerCase())) {
            skillCountMap.set(key, { category: value.category, count: value.count + 1 });
            mapped = true;
            break;
          }
        }
        
        if (!mapped) {
          skillCountMap.set(skill, { category, count: 1 });
        }
      });
    });
    
    const dynamicSkills = Array.from(skillCountMap.entries())
      .map(([name, data], index) => ({
        id: index + 1,
        name,
        category: data.category,
        users: data.count
      }))
      .sort((a, b) => b.users - a.users);
    
    const topSkills = dynamicSkills.slice(0, Math.min(dynamicSkills.length, 6));
    setPopularSkills(topSkills);
    setFilteredSkills(topSkills);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      if (selectedCategory) {
        const skillsInCategory = popularSkills.filter(skill => skill.category === selectedCategory);
        setFilteredSkills(skillsInCategory);
      } else {
        setFilteredSkills(popularSkills);
      }
    } else {
      const query = searchQuery.toLowerCase();
      const baseSkills = selectedCategory 
        ? popularSkills.filter(skill => skill.category === selectedCategory)
        : popularSkills;
        
      const results = baseSkills.filter(
        skill => skill.name.toLowerCase().includes(query) || skill.category.toLowerCase().includes(query)
      );
      setFilteredSkills(results);
    }
  }, [searchQuery, selectedCategory, popularSkills]);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    const skillsInCategory = popularSkills.filter(skill => skill.category === categoryName);
    setFilteredSkills(skillsInCategory);
  };

  const handleSkillClick = (skillName: string) => {
    setSelectedSkill(skillName);
    
    console.log(`Finding profiles for skill: ${skillName}`);
    
    const teaching = allProfiles.filter(profile => 
      profile.teachSkills.some(skill => 
        skill.toLowerCase() === skillName.toLowerCase() ||
        skillName.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(skillName.toLowerCase())
      ) && profile.id !== currentUser?.id
    );
    
    const learning = allProfiles.filter(profile => 
      profile.learnSkills.some(skill => 
        skill.toLowerCase() === skillName.toLowerCase() ||
        skillName.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(skillName.toLowerCase())
      ) && 
      !teaching.some(p => p.id === profile.id) && 
      profile.id !== currentUser?.id
    );
    
    console.log(`Found ${teaching.length} teachers and ${learning.length} learners`);
    
    setTeachingProfiles(teaching);
    setLearningProfiles(learning);
    setMatchingProfiles([...teaching, ...learning]);
    setIsDialogOpen(true);
  };

  const handleBackToExplore = () => {
    setSelectedSkill(null);
    setIsDialogOpen(false);
  };

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

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Skill Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SKILL_CATEGORIES.map((category) => (
              <Card key={category.id} className="overflow-hidden">
                <div className="h-36 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{category.count} skills available</CardDescription>
                  <Button 
                    variant="outline" 
                    className="mt-2 w-full"
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    Browse
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">
            {selectedCategory ? `${selectedCategory} Skills` : 'Popular Skills'}
            {selectedCategory && (
              <Button 
                variant="ghost" 
                onClick={() => {
                  setSelectedCategory(null);
                  setFilteredSkills(popularSkills);
                  setSearchQuery('');
                }}
                className="ml-2 text-sm"
              >
                Clear filter
              </Button>
            )}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.map((skill) => (
              <Card key={skill.id} className="overflow-hidden">
                <div className="h-32 overflow-hidden bg-gradient-to-r from-primary/5 to-secondary/5 flex items-center justify-center">
                  <img 
                    src={categoryImages[skill.category as keyof typeof categoryImages]} 
                    alt={skill.name} 
                    className="w-full h-full object-cover opacity-75 transition-all duration-300 hover:opacity-100"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-xl font-bold text-white bg-black/30 px-4 py-2 rounded-lg shadow-lg">{skill.name}</h3>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{skill.name}</CardTitle>
                  <CardDescription>Category: {skill.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{skill.users} users teaching this skill</p>
                  <div className="flex gap-2 mt-3">
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => handleSkillClick(skill.name)}
                    >
                      Explore Profiles
                    </Button>
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

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="mr-2 p-1 h-8 w-8"
                  onClick={handleBackToExplore}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <DialogTitle>Profiles for {selectedSkill}</DialogTitle>
              </div>
              <DialogDescription>
                Browse profiles of users who can teach or want to learn this skill
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="all" className="mt-2">
              <TabsList>
                <TabsTrigger value="all">All ({matchingProfiles.length})</TabsTrigger>
                <TabsTrigger value="teaching">Teaching ({teachingProfiles.length})</TabsTrigger>
                <TabsTrigger value="learning">Learning ({learningProfiles.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-4">
                {matchingProfiles.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No profiles found for this skill</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {matchingProfiles.map(profile => (
                      <ProfileCard 
                        key={profile.id} 
                        profile={profile} 
                        selectedSkill={selectedSkill || undefined} 
                        currentUser={currentUser}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="teaching" className="mt-4">
                {teachingProfiles.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No profiles teaching this skill</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {teachingProfiles.map(profile => (
                      <ProfileCard 
                        key={profile.id} 
                        profile={profile} 
                        selectedSkill={selectedSkill || undefined} 
                        currentUser={currentUser}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="learning" className="mt-4">
                {learningProfiles.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No profiles learning this skill</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {learningProfiles.map(profile => (
                      <ProfileCard 
                        key={profile.id} 
                        profile={profile} 
                        selectedSkill={selectedSkill || undefined} 
                        currentUser={currentUser}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>

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
