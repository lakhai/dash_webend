import * as types from '../constants';
import { User } from 'src/models';

interface State {
  isLoading: boolean;
  accessToken: string | null;
  isLoggedIn: boolean;
  currentUser: User | null;
}
const initialState = {
  isLoading: false,
  accessToken: null,
  isLoggedIn: false,
  currentUser: null,
};

const authReducer = (state: State = initialState, action: any): State => {
  const { type, data } = action;
  switch (type) {
    case types.GET_TOKEN:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_TOKEN_FAILED:
      return {
        ...initialState,
      };
    case types.GET_TOKEN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        accessToken: data.accessToken,
      };
    default: return state;
  }
};
export default authReducer;