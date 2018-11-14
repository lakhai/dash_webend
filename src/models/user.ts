import { Goal } from './goals';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  goals?: Goal[];
  currentLevel: number;
  currentXP: number;
  xpUntilNextLevel: number;
}
