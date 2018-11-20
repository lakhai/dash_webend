import axios from 'axios';
import * as actions from '../constants';
import { LoginDto } from '../../models';
import { User } from 'src/api/user';

const getToken = (user: LoginDto) => dispatch => {
  dispatch({ type: actions.GET_TOKEN });
  axios.post(`${actions.BASE_URL}auth/login`, user)
    .then(({ data: { accessToken } }) => {
      localStorage.setItem('accessToken', accessToken);
      dispatch({
        type: actions.GET_TOKEN_SUCCESS,
        data: { accessToken },
      });
    })
    .catch(error => dispatch({ type: actions.GET_TOKEN_FAILED, data: { error } }));
};

const logOut = () => ({ type: actions.LOGOUT });

const getUserInfo = () => dispatch => {
  dispatch({ type: actions.GET_USER_INFO });
  User.getUserInfo()
    .then(user => dispatch({ type: actions.GET_USER_INFO_SUCCESS, data: { user } }))
    .catch(error => dispatch({ type: actions.GET_USER_INFO_FAILED, data: { error } }));
};

export const AuthActions = {
  getToken,
  getUserInfo,
};
