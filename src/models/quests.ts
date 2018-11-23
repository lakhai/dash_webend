import { Goal } from './goals';

export interface Quest {
  id?: number;
  name: string;
  description: string;
  currentDifficulty: number;
  goals?: Goal[];
}

export interface CreateQuestDto {
  name: string;
  description: string;
  currentDifficulty: number;
  goals?: Goal[];
}

export interface UpdateQuestDto {
  name?: string;
  description?: string;
  currentDifficulty?: number;
  goals?: Goal[];
}
