
// Keyword categories with multiple variations
const keywordCategories = {
  matching: [
    'match', 'matches', 'matching', 'find a match', 'connect', 'partner', 
    'find someone', 'pairing', 'connection', 'connect with'
  ],
  skills: [
    'skill', 'skills', 'learn', 'learning', 'teach', 'teaching', 'knowledge',
    'expertise', 'ability', 'abilities', 'talent', 'talents', 'competence'
  ],
  payments: [
    'payment', 'pay', 'subscription', 'plan', 'cost', 'pricing', 'fee', 
    'fees', 'billing', 'subscribe', 'price', 'prices', 'premium'
  ],
  profile: [
    'profile', 'account', 'edit profile', 'update profile', 'change name',
    'bio', 'information', 'details', 'personal', 'update info'
  ],
  howItWorks: [
    'how it works', 'how does it work', 'process', 'system', 'how to use',
    'steps', 'guide', 'tutorial', 'instructions', 'explain'
  ],
  teaching: [
    'teach', 'teaching', 'instructor', 'share knowledge', 'mentor', 'mentoring',
    'explain to others', 'tutor', 'tutoring', 'coaching'
  ]
};

// Response templates for each category
const responses = {
  matching: [
    "You can find matches based on the skills you want to teach and learn! The platform will suggest people with complementary skills.",
    "Matching works by connecting you with people who have skill interests that align with yours. Update your skills to get better matches!",
    "Want to find a match? Browse profiles or wait for our algorithm to suggest people with compatible learning goals.",
    "Our matching system looks at both what you can teach and what you want to learn, creating win-win exchanges.",
    "To get quality matches, make sure your profile clearly states what skills you're offering and what you're hoping to learn."
  ],
  skills: [
    "On SkillSwap, you can list both the skills you want to teach and those you want to learn. Be specific to find better matches!",
    "We support a wide range of skills - from programming to cooking, languages to music. What would you like to exchange?",
    "To add skills to your profile, go to your profile page and edit the skills section. More details help others understand your level.",
    "Skills are the currency of SkillSwap! The more clearly you define your expertise levels, the better your matches will be.",
    "Consider breaking down broad skills into specific ones - instead of 'music', try 'piano playing' or 'music composition'."
  ],
  payments: [
    "SkillSwap is primarily based on skill exchange without money involved. We believe in the value of knowledge sharing!",
    "Our basic membership is free! We do offer a premium plan with additional features like advanced matching and unlimited connections.",
    "The premium subscription costs $5.99/month and includes priority matching, unlimited connections, and advanced filters.",
    "We don't allow monetary transactions between users - the platform is all about exchanging knowledge, not money.",
    "You can upgrade to premium any time from your profile settings. We offer monthly and annual billing options."
  ],
  profile: [
    "Your profile is your storefront! Make sure to add a clear photo, detailed bio, and list your skills with proficiency levels.",
    "To edit your profile, click on your avatar in the top right corner and select 'Edit Profile' from the dropdown menu.",
    "A complete profile gets 5x more connection requests! Don't forget to add your learning goals in the dedicated section.",
    "Profile visibility settings can be adjusted if you prefer to limit who can see your information or contact you.",
    "Regular profile updates help the algorithm understand your changing interests and improve your matches over time."
  ],
  howItWorks: [
    "SkillSwap connects people who want to exchange knowledge. You teach what you know, and learn what you want to know - no money involved!",
    "The process is simple: 1) Create a profile listing your skills, 2) Browse or get matched with compatible users, 3) Connect and arrange skill exchange sessions.",
    "Our platform facilitates both in-person and virtual skill exchanges. You can decide with your match what works best for your situation.",
    "Think of it as a barter system for knowledge! The core principle is mutual benefit through skill exchange.",
    "After connecting with a match, you'll use our chat system to arrange details of your skill exchange sessions."
  ],
  teaching: [
    "Teaching others is one of the best ways to reinforce your own knowledge! Our platform gives you the opportunity to share what you know.",
    "When teaching on SkillSwap, start by assessing your partner's current level, then create a simple progression plan.",
    "Effective teaching involves clear explanations, practical examples, and patience. Remember that different people learn differently!",
    "You don't need to be an expert to teach - even sharing skills you're intermediate in can be valuable to beginners.",
    "Consider preparing some simple materials or exercises before your teaching session to make the most of your time together."
  ]
};

// Default responses for when no keywords are detected
const defaultResponses = [
  "I'm not sure I understand. Could you try asking about matches, skills, profiles, or how SkillSwap works?",
  "I didn't catch that. I can help with questions about finding matches, managing your skills, or using the platform!",
  "Hmm, I'm not programmed to answer that specific question. Try asking about skill exchanges, matching, or profile tips!",
  "I'm still learning! For now, I can best help with questions about how SkillSwap works, skill matching, or profile optimization.",
  "Let's try a different question. I'm great at explaining how matching works, how to optimize your profile, or how to list your skills!"
];

/**
 * Analyzes a message and returns relevant response based on detected keywords
 */
export const findMatchingResponses = (message: string, userSkills: string[] = []): string => {
  const lowerMessage = message.toLowerCase();
  const detectedCategories: string[] = [];
  
  // Check for each category of keywords
  Object.entries(keywordCategories).forEach(([category, keywords]) => {
    const hasKeyword = keywords.some(keyword => 
      lowerMessage.includes(keyword.toLowerCase())
    );
    
    if (hasKeyword) {
      detectedCategories.push(category);
    }
  });
  
  // If no categories detected, return default response
  if (detectedCategories.length === 0) {
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }
  
  // If only one category detected, return response from that category
  if (detectedCategories.length === 1) {
    const category = detectedCategories[0] as keyof typeof responses;
    const categoryResponses = responses[category];
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
  }
  
  // If multiple categories detected, combine knowledge from different categories
  let combinedResponse = "";
  
  // Handle specific combinations
  if (detectedCategories.includes('matching') && detectedCategories.includes('skills')) {
    return "To get the best matches, make sure your skills section is detailed and specific. Our matching system will connect you with people who want to learn what you can teach, and can teach what you want to learn!";
  }
  
  if (detectedCategories.includes('profile') && detectedCategories.includes('skills')) {
    return "Your profile's skills section is crucial for good matches! Be specific about your expertise levels and what you want to learn. Update them regularly to reflect your growth and changing interests.";
  }
  
  if (detectedCategories.includes('teaching') && detectedCategories.includes('howItWorks')) {
    return "Teaching on SkillSwap is simple! After connecting with a match, you'll arrange sessions (virtual or in-person) where you share your knowledge. We recommend starting with a skill assessment, then planning 1-2 hour sessions focusing on practical application.";
  }
  
  // For other combinations, take one response from each category and combine them
  detectedCategories.forEach((category, index) => {
    const typedCategory = category as keyof typeof responses;
    const categoryResponses = responses[typedCategory];
    const randomResponse = categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
    
    combinedResponse += randomResponse;
    if (index < detectedCategories.length - 1) {
      combinedResponse += " ";
    }
  });
  
  // If the user has skills, occasionally personalize the response
  if (userSkills.length > 0 && Math.random() > 0.6) {
    const randomSkill = userSkills[Math.floor(Math.random() * userSkills.length)];
    combinedResponse += ` By the way, I notice you're skilled in ${randomSkill}. That's a valuable skill to share on our platform!`;
  }
  
  return combinedResponse;
};
