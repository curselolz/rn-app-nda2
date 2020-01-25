import { AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import { USER_TOKEN } from '../store/actions/constants/index.constants';
import { setAxiosDefaults } from './axios.util';

export const checkUserToken = (fillToken, getUserData, callback) => {
  AsyncStorage.getItem(USER_TOKEN).then((response) => {
      response
      ? userExistCheck(response, getUserData, fillToken, callback)
      : (fillToken(), callback && callback('error: error'));
  })
    .catch((error) => {
      fillToken();
    });
};

const userExistCheck = (response, getUserData, fillToken, callback) => {
  setAxiosDefaults(response);
  getUserData(() => {
    fillToken(response);
    callback && callback();
  });
};
