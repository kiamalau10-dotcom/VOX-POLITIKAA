import { createContext } from 'react';
import { User } from '../types';

export interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  logout: () => void;
  isLoading: boolean;
  resolveStreak: (action: 'use' | 'buy' | 'reset') => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);
