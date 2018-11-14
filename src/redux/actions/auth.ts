import axios from 'axios';
import * as actions from '../constants';
import { LoginDto } from '../../models';

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

const getUserInfo = () => ({ type: actions.GET_USER_INFO });

export const authActions = {
  getToken,
};
