
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  teachSkills: string[];
  learnSkills: string[];
  profilePicture?: string;
  bio?: string;
  ratings?: UserRating[];
  subscription?: {
    planId: string;
    status: 'free' | 'active' | 'canceled' | 'expired' | 'trial';
  };
}

export interface UserMatch {
  id: string;
  name: string;
  email: string;
  matchScore: number;
  profilePicture?: string;
  canTeachYou: string[];
  youCanTeach: string[];
}

export interface UserRating {
  id: string;
  userId: string;
  ratedById: string;
  raterName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
