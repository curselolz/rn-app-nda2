import {
  SIGN_IN_COMPLETE, FILL_USER,
  CLEAR_USER, FILL_TOKEN,
  RESET_PASSWORD_SUCCESS,
  RECOVER_PASSWORD_SUCCESS,
  SIGN_UP_SUCCESS,
} from '../actions/constants/index.constants';

const initialState = {
  authSuccess: false,
  user: {},
  token: 'loading',
  recover: false,
  signUpSuccess: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_COMPLETE:
      return { ...state, authSuccess: true };
    case FILL_USER:
      return { ...state, user: { ...state.user, ...action.payload } };
    case CLEAR_USER:
      return {
        ...state, user: {}, authSuccess: false, email: action.payload,
      };
    case FILL_TOKEN:
      return { ...state, token: action.payload };
    case RESET_PASSWORD_SUCCESS:
      return { ...state, forgotSuccess: true };
    case RECOVER_PASSWORD_SUCCESS:
      return { ...state, recover: true };
    case SIGN_UP_SUCCESS:
      return { ...state, signUpSuccess: true };
    default:
      return state;
  }
};
