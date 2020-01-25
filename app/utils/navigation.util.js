import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator, createStackNavigator,BottomTabBar } from 'react-navigation';
import AuthScreen from '../components/auth/authScreen.component';
import SignUpScreen from '../components/auth/signUpScreen.component';
import FinishRegistrationScreen from '../components/auth/finishRegistraitionScreen.component';
import ForgotPasswordScreen from '../components/forgotPassword/forgotPasswordScreen.component';
import CheckEmailScreenForgotPassword from '../components/forgotPassword/checkEmailScreen.component';
import RecoverPasswordScreen from '../components/forgotPassword/recoverPasswordScreen.component';
import CongratulationsScreen from '../components/congatulations/congratulationsScreen.component';
import { colors } from '../theme/consts.theme';
import GigsScreenComponent from '../components/gigs/gigsScreen.component';
import scheduleScreenComponent from '../components/schedule/scheduleScreen.component';
import financeScreenComponent from '../components/finance/financeScreen.component';
import financeDetail from '../components/finance/financeDetail.component';
import AccountScreen from '../components/account/accountScreen.component';
import GigsSortingScreen from '../components/gigs/gigsSortingScreen.component';
import GigDetailsScreen from '../components/gigs/gigsDetailsScreen.component';
import AddGovInfoScreen from '../components/account/addGovIdInfo.component';
import EmployerProfile from '../components/employer/employerProfile.component';
import EmployeeReviews from '../components/reviews/EmployeeReviewsScreen.component';
import AddBankAccountScreen from '../components/account/addBankAccountScreen.component';
import ScheduleDetails from '../components/schedule/scheduledGigDetails.component';


const GigsStack = createStackNavigator({
  gigs:GigsScreenComponent,
  sorting: GigsSortingScreen,
  gigDetails:GigDetailsScreen,
}, { headerMode: 'none'});
// const GigsStack = createAppContainer(GigsStack1);

const ScheduleStack = createStackNavigator({
  schedule: scheduleScreenComponent,
  scheduleDetails: {
    screen: ScheduleDetails,
    path: 'details',
  },
}, { headerMode: 'none'});
// const ScheduleStack = createAppContainer(ScheduleStack1);

const AccountStack = createStackNavigator({
  account: { screen: AccountScreen, path: 'profile' },
  addBadges: AddGovInfoScreen,
  addBankScreen: { screen: AddBankAccountScreen, path: 'addbank' },
  reviews: EmployeeReviews,
}, { headerMode: 'none'});
// const AccountStack = createAppContainer(AccountStack1);

const FinanceStack = createStackNavigator({
  Finance: {
    screen: financeScreenComponent,
  },
  FinanceDetail: {
    screen: financeDetail,
  },
}, { headerMode: 'none'});
// const FinanceStack = createAppContainer(FinanceStack1);

const MainTabNavigator = createBottomTabNavigator({
  Gigs: {
    screen:GigsStack,
    navigationOptions: {
      tabBarOptions: {
        activeTintColor: colors.pink,
      },
      tabBarLabel: '',
      tabBarIcon:({ tintColor }) => <Image source={require('../theme/images/menu-01.png')} style={{width: 30, height: 28, resizeMode: 'contain',tintColor }}/>
  }

  },
  Schedule: {
    screen: ScheduleStack,
    path: 'applied',
    navigationOptions: {
      tabBarOptions: {
        activeTintColor: colors.pink,
      },
      tabBarLabel: '',
      tabBarIcon:({ tintColor }) => <Image source={require('../theme/images/menu-02.png')} style={{width: 30, height: 28, resizeMode: 'contain',tintColor }}/>
  }
  },
  Finance: {
    screen: FinanceStack,
    navigationOptions: {
      tabBarOptions: {
        activeTintColor: colors.pink,
      },
      tabBarLabel: '',
      tabBarIcon:({ tintColor }) => <Image source={require('../theme/images/menu-03.png')} style={{width: 30, height: 28, resizeMode: 'contain',tintColor }}/>
  }
  },
  Account: {
    screen: AccountStack,
    path: 'account',
    navigationOptions: {
      tabBarOptions: {
        activeTintColor: colors.pink,
      },
      tabBarLabel: '',
      tabBarIcon:({ tintColor }) => <Image source={require('../theme/images/menu-04.png')} style={{width: 30, height: 28, resizeMode: 'contain',tintColor }}/>
  }
  },
}, { headerMode: 'none',tabBarOptions: {
  activeTintColor: colors.pink,
}},);

const MainNavigator = createStackNavigator({
  auth: {
    screen: AuthScreen,
    path: 'login',
  },
  signUp: SignUpScreen,
  finishRegistration: FinishRegistrationScreen,
  forgot: ForgotPasswordScreen,
  checkEmail: CheckEmailScreenForgotPassword,
  recoverPass: {
    screen: RecoverPasswordScreen,
    path: 'recover',
  },
  congratulations: CongratulationsScreen,
  employerDetails: EmployerProfile,
  main: {
    screen: MainTabNavigator,
    path: 'main',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },

}, { headerMode: 'none'});
// const MainNavigator = createAppContainer(MainNavigator1);
export default MainNavigator;


// {
//   static navigationOptions: ({ navigation }) => ({
//     navigationOptions: {
//       header: null,
//       headerMode: 'none'
//     },
//     tabBarIcon: ({ tintColor }) => {
//       const { routeName } = navigation.state;
//       if (routeName === 'Gigs') {
//         return (
//           <Image
//             source={require('../theme/images/menu-01.png')}
//             style={{
//               width: 30, height: 28, resizeMode: 'contain', tintColor,
//             }}
//           />
//         );
//       }
//       if (routeName === 'Schedule') {
//         return (
//           <Image
//             source={require('../theme/images/menu-02.png')}
//             style={{
//               width: 30, height: 28, resizeMode: 'contain', tintColor,
//             }}
//           />
//         );
//       } if (routeName === 'Finance') {
//         return (
//           <Image
//             source={require('../theme/images/menu-03.png')}
//             style={{
//               width: 30, height: 28, resizeMode: 'contain', tintColor,
//             }}
//           />
//         );
//       } if (routeName === 'Account') {
//         return (
//           <Image
//             source={require('../theme/images/menu-04.png')}
//             style={{
//               width: 30, height: 28, resizeMode: 'contain', tintColor,
//             }}
//           />
//         );
//       }
//     },
//     tabBarOptions: {
//       activeTintColor: colors.pink,
//     },
//   }),
// },
// {
//   navigationOptions: {
//     header: null,
//     headerMode: 'none'
//   },
