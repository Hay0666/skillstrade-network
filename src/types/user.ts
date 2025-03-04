
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  teachSkills: string[];
  learnSkills: string[];
  profilePicture?: string;
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
