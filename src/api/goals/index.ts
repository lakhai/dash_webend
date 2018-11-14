import { getApiInstance } from '../instance';
import { CreateGoalDto, UpdateGoalDto } from 'src/models';

const getGoals = async () => {
  const api = await getApiInstance();
  return api.get('goals', {})
    .then(({ data }) => data);
};

const createGoal = async (goal: CreateGoalDto) => {
  const api = await getApiInstance();
  return api.post('goals', goal)
    .then(response => response);
};

const updateGoal = async (id: number, goal: UpdateGoalDto) => {
  const api = await getApiInstance();
  return api.put(`goals/${id}`, goal)
    .then(response => response);
};

const deleteGoal = async (id: number) => {
  const api = await getApiInstance();
  return api.delete(`goals/${id}`)
    .then(response => response);
};

const completeGoal = async (id: number) => {
  const api = await getApiInstance();
  return api.get(`goals/${id}/complete`)
    .then(response => response);
};

const failGoal = async (id: number) => {
  const api = await getApiInstance();
  return api.get(`goals/${id}/fail`)
    .then(response => response);
};

export const Goals = {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
  completeGoal,
  failGoal,
};