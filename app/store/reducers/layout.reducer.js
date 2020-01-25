import {
  SHOW_BTN_SPINNER,
  HIDE_BTN_SPINNER,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_REFRESHER,
  HIDE_REFRESHER,
  REFRESHER_DATA,
} from '../actions/constants/index.constants';

const initialState = {
  spinnerVisible: false,
  loaderVisible: false,
  coords: null,
  refreshing: false,
  refresherData: false,
};

export default layout = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_BTN_SPINNER:
      return { ...state, spinnerVisible: true };
    case HIDE_BTN_SPINNER:
      return { ...state, spinnerVisible: false };
    case SHOW_LOADER:
      return { ...state, loaderVisible: true };
    case HIDE_LOADER:
      return { ...state, loaderVisible: false };
    case SHOW_REFRESHER:
      return { ...state, refreshing: true };
    case HIDE_REFRESHER:
      return { ...state, refreshing: false };
    case REFRESHER_DATA:
      return { ...state, refresherData: action.payload.data };
    default:
      return state;
  }
};
