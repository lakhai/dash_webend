import { User } from './user';

export interface CreateGoalDto {
  title: string;
  description: string;
  awards: number;
}

export interface UpdateGoalDto {
  title?: string;
  description?: string;
  awards?: number;
}

export enum GoalStatuses {
  InProgress = 'InProgress',
  Completed = 'Completed',
  Failed = 'Failed',
}

export interface Goal {
  id: number;
  title: string;
  description: string;
  awards: number;
  status: GoalStatuses;
  user: User;
}