export interface Minister {
  id: string;
  name: string;
  position: string;
  bio: string;
  tasks: string[];
  image: string;
}

export interface PoliticalParty {
  id: string;
  name: string;
  abbreviation: string;
  chairman: string;
  ideology: string;
  seats: number;
  color: string;
  logo: string;
  description?: string;
  functionInDemocracy?: string;
  legislativeRole?: string;
}

export interface ProvinceData {
  id: string;
  name: string;
  capital: string;
  governor: string;
  party?: string; // Political party affiliation of the governor
  population: string;
  dprSeats: number;
  details?: string;
  localDynamics?: string;
  votingTrends?: string;
  governanceStructure?: string;
  issues?: string[]; // 3 Key regional issues
  trivia?: string; // Political trivia snippet
  dominantParty?: string; // Dominant party in the region
  dominantPartyPercent?: number; // Dominant party percentage
  governorPhoto?: string; // Photo of the governor
  isTrending?: boolean; // Trending status
  intelAnalysis?: string; // Strategic intelligence analysis
}

export interface StrategicProgram {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: string;
  icon: string;
  details?: string;
  images?: string[];
  impact?: string;
  points?: { no: number; focus: string; explanation: string }[];
  quickWins?: { title: string; explanation: string }[];
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  imageUrl: string;
  url: string;
}

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  level: number;
  isHots?: boolean;
}

export interface Quiz {
  id: string;
  topic: string;
  questions: Question[];
}

export interface User {
  username: string; // unique @username
  displayName: string;
  password?: string;
  role: 'ADMIN' | 'USER';
  level: number;
  currentExp: number;
  streak: number;
  lastLoginDate: string;
  progress: { [key: string]: boolean };
  quizHistory: {
    quizId: string;
    score: number;
    date: string;
    topic?: string;
    level?: number;
  }[];
  coins?: number;
  streakFreezeCount?: number;
  avatarConfig?: {
    base: string;
    skin: string;
    hair: string;
    expression: string;
    outfit: string;
    accessory: string;
  };
  equippedCostumeId?: string;
  voxTitle?: string;
  uid?: string;
  ownedItems?: string[];
  needsStreakProtection?: boolean;
  previousStreak?: number;
  achievements?: {
    id: string;
    title: string;
    date: string;
    icon: string;
  }[];
}

export interface Vote {
  id: string;
  userId: string;
  username: string;
  timestamp: any;
  type: string;
}

export interface Feedback {
  id: string;
  username: string;
  displayName?: string;
  message: string;
  date: string;
  time?: string;
  timestamp?: any;
}

export enum AppSection {
  HOME = 'home',
  CABINET = 'cabinet',
  PROGRAM = 'program', 
  PARTIES = 'parties',
  MAP = 'map',
  BASICS = 'basics',
  AI = 'ai',
  NEWS = 'news',
  QUIZ = 'quiz',
  DASHBOARD = 'dashboard',
  FEEDBACK = 'feedback',
  LOGIN = 'login'
}
