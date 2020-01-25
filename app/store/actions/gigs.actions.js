import axios from 'axios';
import { Alert } from 'react-native';
import {
  FEED_SELECTED,
  APPLIED_SELECTED,
  SHOW_LOADER,
  HIDE_LOADER,
  FILL_GIGS,
  FILL_GIGS_DETAILS_SCREEN,
  SHOW_BTN_SPINNER,
  HIDE_BTN_SPINNER,
  FILL_APPLIED_GIGS,
  FILL_FINANCE_DETAILS,
  HIDE_REFRESHER,
  SHOW_REFRESHER,
  ADD_MORE_GIGS,
  SORTING_BY_SET,
  SELECTED_FILTRATION,
  FILL_SCHEDULE_DETAILS,
  SET_ID,
  SET_LOCATION,
  ADD_FILTRATION_RADIUS,
  REVIEWS_BY_ID,
  CLEAR_USER,
  REFRESHER_DATA,
} from './constants/index.constants';
import { getAppliedGigs } from './auth.actions';

export const switchGigScreen = type => ({ type: type ? FEED_SELECTED : APPLIED_SELECTED });

export const fillGigDetailsScreen = data => ({ type: data.route === 'gigs' ? FILL_GIGS_DETAILS_SCREEN : FILL_SCHEDULE_DETAILS, payload: data });

export const sortingBySet = data => ({ type: SORTING_BY_SET, payload: data });

export const addFiltering = data => ({ type: ADD_FILTRATION_RADIUS, payload: data });

export const getIDOffer = (data,dataReponse) => (dispatch) => {
  dispatch({ type: SHOW_BTN_SPINNER });
  const id = dataReponse.offers.filter(e => e.gig.id === data.id);
  dispatch({ type: SET_ID, payload: id });
  dispatch({ type: HIDE_BTN_SPINNER });
};


export const returnLocation = data => ({ type: SET_LOCATION, payload: data });

export const getGigs = (refreshing, callback) => (dispatch, getState) => {
  refreshing
    ? dispatch({ type: SHOW_REFRESHER }, { type: REFRESHER_DATA, payload: true })
    : dispatch({ type: SHOW_LOADER });
  let url = '/gigs/actual?per_page=10&page=1';
  const state = getState().gigs.sortingBy;
  const location = getState().gigs.location;
  if (state && state === 'filter') {
    url += `&primary=${getState().gigs.filter}`;
  } else if (state && state === 'nearest') {
    url += `&latitude=${location.lat}&longitude=${location.long}&radius=${filterRadius || 1}`;
  } else if (state && state.includes('zip')) {
    const startRadius = state.search('radius');
    const startZip = state.search('radius');
    const zip = startZip !== -1 ? state.slice(3, startRadius) : '';
    const radius = startRadius !== -1 ? state.slice(startRadius + 6, state.length) : 20;
    url += `&zip=${zip}&radius=${radius || 20}`;
  } else if (state && state !== 'filter') {
    url += `&orderBy=${getState().gigs.sortingBy}`;
  } else {
  }
  console.log('FILTER URL: ', url);
  axios({
    ...axios.defaults,
    method: 'get',
    url,
  })
    .then((response) => {
      refreshing
        ? dispatch({ type: HIDE_REFRESHER }, { type: REFRESHER_DATA, payload: false })
        : dispatch({ type: HIDE_LOADER });
      const newArray = filterGigsArray(
        response.data.data,
        getState().auth.user.offers,
      );
      dispatch({ type: FILL_GIGS, payload: newArray });
      callback && callback();
    })
    .catch((error) => {
      refreshing
        ? dispatch({ type: HIDE_REFRESHER }, { type: REFRESHER_DATA, payload: false })
        : dispatch({ type: HIDE_LOADER });
      callback && callback();
      console.log('error get gigs: ', error.response);
      console.log(error);
    });
};

export const loadMoreGigs = page => (dispatch, getState) => {
  let url = `/gigs/actual?per_page=10&page=${page || 1}`;
  if (getState().gigs.sortingBy && getState().gigs.sortingBy !== 'filter') {
    url += `&orderBy=${getState().gigs.sortingBy}`;
  } else if (getState().gigs.sortingBy && getState().gigs.sortingBy === 'filter') {
    url += `&primary=${getState().gigs.filter}`;
  }
  axios({
    ...axios.defaults,
    method: 'get',
    url,
  })
    .then((response) => {
      const newArray = filterGigsArray(
        response.data.data,
        getState().auth.user.offers,
        getState().gigs.gigs,
      );
      newArray.length
                && dispatch({ type: ADD_MORE_GIGS, payload: { newArray, page } });
    })
    .catch((error) => {
      console.log('error from get more: ', error.response || error);
    });
};

export const addOffer = (id, callback) => (dispatch, getState) => {
  dispatch({ type: SHOW_BTN_SPINNER });
  axios({
    ...axios.defaults,
    method: 'post',
    url: '/offers',
    data: { gig_id: id },
  })
    .then(() => {
      callback();
    })
    .catch((error) => {
      Alert.alert('Oops...','Can not apply to this gig.');
      dispatch({ type: HIDE_BTN_SPINNER });
      console.log('error from get user data: ', error);
    });
};

export const removeOffer = (id, applied, callback) => (dispatch) => {
  dispatch({ type: SHOW_BTN_SPINNER });
  axios({
    ...axios.defaults,
    method: 'delete',
    url: `/offers/${id}`,
    data: {
      applied,
    },
  })
    .then((response) => {
      dispatch({ type: HIDE_BTN_SPINNER });
      callback();
    })
    .catch((error) => {
      if (error.response.status === 409) {
        Alert.alert(
          'Oops...',
          'Your data is out of date,please update page',
          [
            {
              text: 'OK',
              onPress: () => callback(),
              style: 'cancel',
            },
          ],
          { cancelable: false },
        );
      }
      dispatch({ type: HIDE_BTN_SPINNER });
    });
};

export const getGigByIdReviews = (id, completed) => (dispatch) => {
  axios({
    ...axios.defaults,
    method: 'post',
    url: '/reviews',
  })
    .then((response) => {
    })
    .catch((error) => {
      console.log('ERROR FROM GIG BY ID: ', error.response || error);
    });
};

export const getGigByIdTransaction = (id, completed) => (dispatch) => {
  axios({
    ...axios.defaults,
    method: 'get',
    url: `/gigs/${id}`,
  })
    .then((response) => {
      data = {
        route: 'Schedule',
        data: { completedFinance: completed, appliedFinance: true, ...response.data },
      };
      dispatch({ type: FILL_FINANCE_DETAILS, payload: data });
    })
    .catch((error) => {
      console.log('ERROR FROM GIG BY ID: ', error.response || error);
    });
};

export const getGigById = (id, completed) => (dispatch) => {
  axios({
    ...axios.defaults,
    method: 'get',
    url: `/gigs/${id}`,
  })
    .then((response) => {
      data = {
        route: 'Schedule',
        data: { completed, applied: true, ...response.data },
      };
      dispatch({ type: FILL_SCHEDULE_DETAILS, payload: data });
      dispatch({ type: FILL_FINANCE_DETAILS, payload: data });
    })
    .catch((error) => {
      console.log('ERROR FROM GIG BY ID: ', error.response || error);
    });
};

export const addReview = (data, callback) => (dispatch) => {
  dispatch({ type: SHOW_BTN_SPINNER });
  axios({
    ...axios.defaults,
    method: 'post',
    url: '/reviews',
    data,
  })
    .then((response) => {
      callback();
      dispatch({ type: HIDE_BTN_SPINNER });
    })
    .catch((error) => {
      dispatch({ type: HIDE_BTN_SPINNER });
      console.log(error.status)
      if(error.status === 403) {
        Alert.alert('Oops...','You cannot post more than one review');
      }
      console.log('error from adding review: ', error.response);
    });
};

const filterGigsArray = (gigs, offers, existingGigs) => {
  let notAppliedGigs = gigs;
  if (existingGigs) {
    existingGigs.map((item) => {
      notAppliedGigs = notAppliedGigs.filter(gig => gig.id !== item.id);
    });
  }
  offers.map((offer) => {
    notAppliedGigs = notAppliedGigs.filter(gig => gig.id !== offer.gig_id);
  });
  return notAppliedGigs;
};

export const selectFiltration = selected => ({ type: SELECTED_FILTRATION, payload: selected });
