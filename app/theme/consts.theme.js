import { Dimensions } from 'react-native';

export const colors = {
  white: '#FFF',
  greyWhite: 'rgb(240,240,240)',
  red: '#A93536',
  black: '#1C1C1C',
  grey: '#B6B8BC',
  darkBlue: '#012D5E',
  orange: '#ffa35f',
  pink: '#ff006e',
  lightGrey: '#E9E9ED',
  inputsGrey: 'rgb(200, 200,200)',
  textMainColor: 'rgb(120,120,120)',
};

export const weight = {
  default: '500',
  semibold: '600',
  bold: '900',
};

export const width = {
  100: Dimensions.get('window').width,
  80: Dimensions.get('window').width * 0.8,
  60: Dimensions.get('window').width * 0.6,
  34: Dimensions.get('window').width * 0.34,
  33: Dimensions.get('window').width * 0.33,
  32: Dimensions.get('window').width * 0.32,
  31: Dimensions.get('window').width * 0.31,
  30: Dimensions.get('window').width * 0.30,
  29: Dimensions.get('window').width * 0.29,
  28: Dimensions.get('window').width * 0.28,
  27: Dimensions.get('window').width * 0.27,
  17: Dimensions.get('window').width * 0.17,
  14: Dimensions.get('window').width * 0.14,
  50: Dimensions.get('window').width * 0.5,
  40: Dimensions.get('window').width * 0.4,
  20: Dimensions.get('window').width * 0.2,
  10: Dimensions.get('window').width * 0.1,
  5: Dimensions.get('window').width * 0.05,
};

export const height = {
  100: Dimensions.get('window').height,
  80: Dimensions.get('window').height * 0.8,
  60: Dimensions.get('window').height * 0.6,
  40: Dimensions.get('window').height * 0.4,
  20: Dimensions.get('window').height * 0.2,
  10: Dimensions.get('window').height * 0.1,
};

export const flex = {
  full: {
    flex: 1,
  },
  remote: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  horizontal: {
    flexDirection: 'row',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export const icons = {
  fullStar: require('./images/filedStar.png'),
  halfStar: require('./images/halfStar.png'),
  emptyStar: require('./images/emptyStar.png'),
  appleLogo: require('./images/apple_logo_PNG19679.png'),
  phone: require('./images/phone.png'),
  email: require('./images/email.png'),
  location: require('./images/location.png'),
  money: require('./images/maney.png'),
  greyMoney: require('./images/greyMoney.png'),
  greyLocation: require('./images/greyLocation.png'),
  greySchedule: require('./images/greySchedule.png'),
  filters: require('./images/filtersButton.png'),
  settingsActive: require('./images/settingsButton.png'),
  settingsNotActive: require('./images/unactiveSetings.png'),
  skrepka: require('./images/skrepochka.png'),
  phoneVerified: require('./images/phoneVerified.png'),
  emailVerified: require('./images/EmailVerified.png'),
  govIdVerified: require('./images/govIdVerified.png'),
  arrowBack: require('./images/ArrowBack.png'),
  reviewsButton: require('./images/reviewsButton.png'),
  connectStripe: require('./images/blue-on-dark.png'),
  arrowDown: require('./images/arrowDown.png'),
  demoImage: require('./images/check.jpg'),
  stripeLogo: require('./images/stripeLogo.png'),
};

export const shadows = {
  default: {
    shadowColor: '#55595C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
};
