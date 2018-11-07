import { createSelector } from 'reselect';

export const accessTokenSelector = () => {
  return localStorage.getItem('accessToken');
};

export const isLoggedInSelector = createSelector(
  accessTokenSelector,
  (accessToken) => {
    return !!accessToken;
  }
);