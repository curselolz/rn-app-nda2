import {
  FEED_SELECTED,
  APPLIED_SELECTED,
  FILL_GIGS,
  FILL_GIGS_DETAILS_SCREEN,
  FILL_APPLIED_GIGS,
  ADD_MORE_GIGS,
  SORTING_BY_SET,
  SELECTED_FILTRATION,
  FILL_SCHEDULE_DETAILS,
  FILL_FINANCE_DETAILS,
  SET_ID,
  SET_LOCATION,
  ADD_FILTRATION_RADIUS,
  USER_ROUTE_RESPONSE,
} from '../actions/constants/index.constants';

const initialState = {
  selected: true,
  gigs: null,
  page: 1,
  appliedGigs: null,
  detailsData: null,
  scheduleDetails: null,
  returnTo: 'Gigs',
  sortingBy: null,
  filteringRadius:null,
  filter: null,
  idOffer: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FEED_SELECTED:
      return { ...state, selected: true };
    case APPLIED_SELECTED:
      return { ...state, selected: false };
    case SORTING_BY_SET:
      return { ...state, sortingBy: action.payload };
    case ADD_FILTRATION_RADIUS:
      return {...state, filteringRadius: action.payload };
    case FILL_GIGS:
      return { ...state, gigs: action.payload, page: 1 };
    case ADD_MORE_GIGS:
      return {
        ...state,
        page: action.payload.page,
        gigs: [...state.gigs, ...action.payload.newArray],
      };
    case FILL_APPLIED_GIGS:
      return { ...state, appliedGigs: action.payload };
    case FILL_GIGS_DETAILS_SCREEN:
      return { ...state, detailsData: action.payload.data, returnTo: action.payload.route };
    case FILL_SCHEDULE_DETAILS:
      return { ...state, scheduleDetails: action.payload.data };
    case FILL_FINANCE_DETAILS:
      return { ...state, financeDetails: action.payload.data };
    case SELECTED_FILTRATION:
      return { ...state, filter: action.payload };
    case SET_ID:
      return { ...state, idOffer: action.payload };
    case SET_LOCATION:
      return {...state, location: action.payload};
    case USER_ROUTE_RESPONSE:
      return {...state, userResponse: action.payload};
    default:
      return state;
  }
};
