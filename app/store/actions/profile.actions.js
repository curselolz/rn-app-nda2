
import axios from 'axios';
import stripe from 'tipsi-stripe';
import {
  SET_PROFILE_IMAGE,
  SET_IMAGE,
  START_EDIT_PROFILE,
  END_EDIT_PROFILE,
  HIDE_BTN_SPINNER,
  SHOW_BTN_SPINNER,
  SET_USER_IMAGE_URI,
  CHANGE_AVATAR_ID,
  FILL_USER,
  EMPLOYER_IMAGE_URI,
  BANK_ACCOUNT_TOKEN_RECEIVED,
} from './constants/index.constants';
import { Alert } from 'react-native';
import { STRIPE_DEFAULTS } from '../../utils/config.util';

// stripe.setOptions(STRIPE_DEFAULTS);
stripe.setOptions({
        publishableKey: 'pk_test_lXd2OOEkcms8eOPVCGo8aGTH',
        androidPayMode: 'test'
})
export const setUserImage = (data, photo, callBack) => dispatch => {
    axios({
        ...axios.defaults,
        method: 'post',
        data: data,
        headers: {
            ...axios.defaults.headers,
            'Content-Type': 'multipart/form-data'
        },
        url: '/attachments',
    })
        .then(response => {
            response.data.id && callBack
                ? callBack({ id: response.data.id, photo })
                : response.data.id
                    ? dispatch({ type: SET_PROFILE_IMAGE, payload: { id: response.data.id, photo } })
                    : dispatch({ type: SET_PROFILE_IMAGE, payload: { id: null, photo } })
        })
        .catch(error => {
            console.log(error)
            console.log('error from set user image: ', error)
        })
}
export const setUserImageGov = (data, photo, callBack) => dispatch => {
    axios({
        ...axios.defaults,
        method: 'post',
        data: data,
        headers: {
            ...axios.defaults.headers,
            'Content-Type': 'multipart/form-data'
        },
        url: '/attachments',
    })
        .then(response => {
            response.data.id && callBack
                ? callBack({ id: response.data.id, photo })
                : response.data.id
                    ? dispatch({ type: SET_IMAGE, payload: { id: response.data.id, photo } })
                    : dispatch({ type: SET_IMAGE, payload: { id: null, photo } })
        })
        .catch(error => {
            console.log(error)
            console.log('error from signUp: ', error)
        })
}

export const updateProfile = (data, check) => dispatch => {
    console.log('data');
    console.log(data)
    dispatch({ type: SHOW_BTN_SPINNER })
    axios({
        ...axios.defaults,
        method: 'put',
        data: data,
        url: '/profile',
    })
        .then(response => {
            dispatch({ type: HIDE_BTN_SPINNER })
            dispatch({ type: CHANGE_AVATAR_ID, payload: response.data.profile.avatar_id })
            dispatch({ type: FILL_USER, payload: response.data })
            dispatch({ type: END_EDIT_PROFILE })
        })
        .catch(error => {
            dispatch({ type: HIDE_BTN_SPINNER })
            console.log('error update profile: ', error.response)
        })
}

export const getAttachment = (id) => dispatch => {
    axios({
        ...axios.defaults,
        method: 'get',
        url: `/attachments/${id}`,
    })
        .then(response => {
            dispatch({ type: HIDE_BTN_SPINNER })
            dispatch({ type: SET_USER_IMAGE_URI, payload: response.data })
        })
        .catch(error => {
            dispatch({ type: HIDE_BTN_SPINNER })
            console.log('error GET ATTACHMENTS: ', error)
        })
}

export const setBankAccount = (data, callback) => dispatch => {
    console.log(data)
    dispatch({ type: SHOW_BTN_SPINNER })
    axios({
        ...axios.defaults,
        method: 'post',
        url: `/accounts`,
        headers: {
            ...axios.defaults.headers,
            'Content-Type': 'multipart/form-data'
        },
        data
    })
        .then(response => {
            dispatch({ type: HIDE_BTN_SPINNER })
            callback && callback()
        })
        .catch(error => {
            Alert.alert('Oops...',error.response.data)
            dispatch({ type: HIDE_BTN_SPINNER })
            console.log('error after SET BANK ACCOUNT: ', error.response)
        })
}

export const switchEditing = () => (dispatch, getState) => {
  const editState = getState().profile.edit;
  dispatch({ type: editState ? END_EDIT_PROFILE : START_EDIT_PROFILE });
};

export const sendGovIdVerification = (data, callback) => dispatch => {
    dispatch({ type: SHOW_BTN_SPINNER })
    axios({
        ...axios.defaults,
        method: 'post',
        data,
        url: '/verifications',
        // url:`/attachments/${data}&fullSize=1`
    })
        .then(response => {
            console.log(response);
            callback()
            dispatch({ type: HIDE_BTN_SPINNER })
        })
        .catch(error => {
            console.log(error)
            dispatch({ type: HIDE_BTN_SPINNER })
            Alert.alert('Oops...', error.response.data.message)
            console.log('error SEND gov id verification: ', error.response)
        })
}

export const getBankAccountToken = (params) => dispatch => {
    dispatch({ type: SHOW_BTN_SPINNER })

    stripe.createTokenWithBankAccount(params)
        .then(response => {
            console.log('Token: ', response);
            dispatch({ type: HIDE_BTN_SPINNER });
            dispatch({ type: BANK_ACCOUNT_TOKEN_RECEIVED, payload: response });
        })
        .catch(error => {
            console.log('Token or error: ', error);
            Alert.alert('Oops...', 'Something went wrong!!! \nPlease try again later!');
            dispatch({ type: HIDE_BTN_SPINNER });
        })
}

export const deleteBankAccount = (callback) => dispatch => {
    dispatch({ type: SHOW_BTN_SPINNER })
    axios({
        ...axios.defaults,
        method: 'delete',
        url: `/accounts`
    })
        .then(response => {
            dispatch({ type: HIDE_BTN_SPINNER })
            callback && callback()
        })
        .catch(error => {
            Alert.alert('Oops...', error.response.data.message)
            dispatch({ type: HIDE_BTN_SPINNER })
            console.log('error after Delete bank account: ', error.response)
        })
}

export const updateBankAccount = (data, callback) => dispatch => {
    dispatch({ type: SHOW_BTN_SPINNER })
    axios({
        ...axios.defaults,
        method: 'put',
        url: `/accounts`,
        headers: {
            ...axios.defaults.headers,
            'Content-Type': 'multipart/form-data'
        },
        data
    })
        .then(response => {
            dispatch({ type: HIDE_BTN_SPINNER })
            callback && callback()
        })
        .catch(error => {
            Alert.alert('Oops...', error.response)
            dispatch({ type: HIDE_BTN_SPINNER })
            console.log('error after Update BANK ACCOUNT: ', error.response)
        })
}
