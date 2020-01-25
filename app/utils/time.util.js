// import moment from 'moment';
import moment from 'moment-timezone';
import { capitalizeString } from './string.util';

export const getDateString = data => moment.utc(data).format('DD-MMM-YYYY');


export const getFullData = (data) => {
  let time = moment(data).format('MMMM Do YY, hh:mma');
  time = time.substring(0, time.length - 1);
  return time;
};

export const getTimeString = (data) => {
  let time = moment.utc(data).format('hh:mma');
  time = time.substring(0, time.length - 1);
  return time;
};

export const getUpdatedTime = (data) => {
  moment.tz.setDefault("America/New_York");
  const result = moment.utc(data).fromNow();;
  return capitalizeString(result);
};

export const isDateOnFuture = (date) => {
  const utcDay = new Date(date).getUTCDate();
  const day = new Date().getDate();
    if(utcDay - day >= 0) {
      let diff = (new Date(date).getTime() - new Date().getTime()) / 1000;
      diff /= 60;
      const a = Math.abs(Math.round(diff));
        return a > 0 ? true : false;
    } else {
        return false;
    }
  // const difference = moment(date).diff(moment(), 'hours', true);
  // return difference > 0;
};

export const getDuration = (start, end) => moment(end).diff(moment(start), 'minutes', true);


export const getFutureDateString = (start) => {
  const date = moment(start).calendar('days');
  return moment(date).format('ddd, MMM Do');
};

export const getMiliSeconds = date => moment(date).format('x');
