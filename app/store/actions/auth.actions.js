import { Alert, AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {
  CUSTOM_FILL,
  SHOW_BTN_SPINNER, HIDE_BTN_SPINNER,
  SIGN_IN_COMPLETE, USER_TOKEN, FILL_USER,
  SHOW_LOADER, HIDE_LOADER, CLEAR_USER,
  FILL_GIGS, FILL_TOKEN,
  RESET_PASSWORD_SUCCESS,
  RECOVER_PASSWORD_SUCCESS,
  SIGN_UP_SUCCESS,
  FILL_APPLIED_GIGS,
  FILL_SCHEDULED_GIGS,
  FILL_COMPLETED_GIGS,
  FILL_TRANSACTIONS,
  USER_ROUTE_RESPONSE,
} from './constants/index.constants';
import { setAxiosDefaults } from '../../utils/axios.util';
import { isDateOnFuture } from '../../utils/time.util';

export const signUp = data => (dispatch) => {
  dispatch({ type: SHOW_BTN_SPINNER });
  axios({
    ...axios.defaults,
    method: 'post',
    data,
    url: '/registration',
  })
    .then((response) => {
      dispatch({ type: SIGN_UP_SUCCESS });
      dispatch({ type: HIDE_BTN_SPINNER });
    })
    .catch((error) => {
      const message = error.response.data.length ? error.response.data[0].message : error.response.data.message;
      Alert.alert('Oops...','Email is invalid');
      dispatch({ type: HIDE_BTN_SPINNER });
    });
};


export const signIn = (data, save) => (dispatch) => {
  dispatch({ type: SHOW_BTN_SPINNER });
  axios({
    ...axios.defaults,
    method: 'post',
    data,
    url: '/login',
  })
    .then((response) => {
        save && AsyncStorage.setItem(USER_TOKEN, response.data.token);
      setAxiosDefaults(response.data.token);
      dispatch({ type: SIGN_IN_COMPLETE });
      dispatch({ type: HIDE_BTN_SPINNER });
    })
    .catch((error) => {
      dispatch({ type: HIDE_BTN_SPINNER });
      const message = error.response.data.length ? error.response.data[0].message : error.response.data.message;
      Alert.alert('Oops...',
        'Username or Password is invalid. Please try again.');
      console.log('error ', message);
      console.log('Sign in ERR: ', error.response);
    });
};

export const getUserReviews = idUser => (dispatch) => {
  console.log(idUser)
  axios({
    ...axios.defaults,
    method: 'get',
    url: `/employers/${idUser}`,
  }).then((response) => {
    console.log(response);
  }).catch((error) => {
    console.log('err',error.response);
  });
}


export const getUserData = (callback, btnSpinner) => (dispatch) => {
  btnSpinner ? dispatch({ type: SHOW_BTN_SPINNER })
    : dispatch({ type: SHOW_LOADER });
  axios({
    ...axios.defaults,
    method: 'get',
    url: '/user',
  })
    .then((response) => {
      console.log(response)
        dispatch({ type: USER_ROUTE_RESPONSE, payload: response.data});
        const appliedGigs = getAppliedGigs(response.data.offers);
        const transactions = response.data.incomingTransactions;
        // switch(object) {
        //   case 'gigs':
        //     dispatch({ type: FILL_APPLIED_GIGS, payload: appliedGigs.appliedArr });
        //     dispatch({ type: FILL_USER, payload: response.data });
        //     transactions && dispatch({ type: FILL_TRANSACTIONS, payload: transactions });
        //   break;
        //   case 'schedule':
        //     dispatch({ type: FILL_SCHEDULED_GIGS, payload: appliedGigs.scheduledArr });
            // dispatch({ type: FILL_USER, payload: response.data });
        //     transactions && dispatch({ type: FILL_TRANSACTIONS, payload: transactions });
        //   break;
        //   case 'user':
        //     dispatch({ type: FILL_USER, payload: response.data });
        //     dispatch({ type: FILL_COMPLETED_GIGS, payload: appliedGigs.completedArr });
        //   break;
        //   default:
          transactions && dispatch({ type: FILL_TRANSACTIONS, payload: transactions });
          dispatch({ type: FILL_USER, payload: response.data });
          dispatch({ type: FILL_APPLIED_GIGS, payload: appliedGigs.appliedArr });
          dispatch({ type: FILL_SCHEDULED_GIGS, payload: appliedGigs.scheduledArr });
          dispatch({ type: FILL_COMPLETED_GIGS, payload: appliedGigs.completedArr });
        // }
        btnSpinner
        ? dispatch({ type: HIDE_BTN_SPINNER })
        : dispatch({ type: HIDE_LOADER });
      callback && callback();
    })
    .catch((error) => {
      btnSpinner
        ? dispatch({ type: HIDE_BTN_SPINNER })
        : dispatch({ type: HIDE_LOADER });
      AsyncStorage.removeItem(USER_TOKEN);
      callback && callback(error);
      console.log('error from get user data: ', error);
    });
};

export const refreshingAppliedGig = (callback, btnSpinner) => (dispatch) => {
  axios({
    ...axios.defaults,
    method: 'get',
    url: '/user',
  })
    .catch((error) => {
      callback && callback(error);
      console.log('error from get user data: ', error);
    });
};
export const forgotPassword = (data, navigate) => (dispatch) => {
  dispatch({ type: SHOW_BTN_SPINNER });
  axios({
    ...axios.defaults,
    method: 'post',
    data,
    url: '/reset_password_message',
  })
    .then((response) => {
      navigate('checkEmail');
      dispatch({ type: HIDE_BTN_SPINNER });
    })
    .catch((error) => {
      navigate('checkEmail');
      dispatch({ type: HIDE_BTN_SPINNER });
      console.log('error from signUp: ', error.response);
    });
};

export const recoverPassword = (data, navigate) => (dispatch) => {
  dispatch({ type: SHOW_BTN_SPINNER });
  axios({
    ...axios.defaults,
    method: 'post',
    data,
    url: '/reset_password',
  })
    .then((response) => {
      dispatch({ type: RECOVER_PASSWORD_SUCCESS });
      navigate('auth');
      dispatch({ type: HIDE_BTN_SPINNER });
    })
    .catch((error) => {
      const message = error.response.data.length ? error.response.data[0].message : error.response.data.message;

      alert('Oops...',message);
      dispatch({ type: HIDE_BTN_SPINNER });
      console.log('error from signUp: ', message);
    });
};


export const logout = email => (dispatch) => {
  dispatch({ type: SHOW_BTN_SPINNER });
  AsyncStorage.getItem(USER_TOKEN).then((value) => {
    if (value) {
      AsyncStorage.removeItem(USER_TOKEN);
      dispatch({ type: CLEAR_USER, payload: email });
      dispatch({ type: HIDE_BTN_SPINNER });
    } else {
      dispatch({ type: CLEAR_USER, payload: '' });
      dispatch({ type: HIDE_BTN_SPINNER });
    }
  })
    .then((res) => {
      dispatch({ type: CLEAR_USER, payload: '' });
      dispatch({ type: HIDE_BTN_SPINNER });
    });
};

export const fillToken = data => ({ type: FILL_TOKEN, payload: data });

export const getAppliedGigs = (data) => {
  const appliedArr = [];
  const scheduledArr = [];
  const completedArr = [];
  data.map((offer) => {
    if (offer.applied === false && offer.gig.status !== 'archive' && offer.actual) {
      isDateOnFuture(offer.gig.start_time) && appliedArr.push({ ...offer.gig, offer_id: offer.id });
    } else if (offer.gig && offer.gig.status === 'completed') {
      completedArr.push(offer.gig);
    } else if (offer.applied === true) {
      scheduledArr.push(offer.gig);
    }
  });
  return { appliedArr, scheduledArr, completedArr };
};

export const getOfferID = (data) => {
  const offerID = [];
  data.map((offer) => {
    if (offer.applied === false && offer.gig.status !== 'archive' && offer.actual) {
      isDateOnFuture(offer.gig.start_time) && offerID.push({ ...offer.gig, offer_id: offer.id });
    }
  });
  return offerID;
};
