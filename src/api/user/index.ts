import { getApiInstance } from '../instance';

const getUserInfo = async () => {
  const api = await getApiInstance();
  return api.get('auth/user')
    .then(({ data }) => data);
};

export const User = {
  getUserInfo,
};