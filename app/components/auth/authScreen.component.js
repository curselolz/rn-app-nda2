import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  Platform,
  AsyncStorage
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { Client } from 'bugsnag-react-native';
import { styles, flexes } from '../../utils/styles.util';
import SignInForm from './signIn.component';
import { flex, colors } from '../../theme/consts.theme';
import LoaderComponent from './loader.component';
import { getUserData, logout, fillToken } from '../../store/actions/auth.actions';
import { BUG_SNAG_API_KEY } from '../../utils/config.util';
import { checkUserToken } from '../../utils/checkToken.util';
import { WEB_URL } from '../../utils/config.util';
// import AsyncStorage from '@react-native-community/async-storage';

const bugsnag = new Client('7fdf4d4746ca72f0e13e58e6e0bc22ac');

class AuthScreen extends PureComponent {
  componentWillMount() {
    const { fillToken, getUserData} = this.props;
    // checkUserToken(fillToken, getUserData);
    checkUserToken(fillToken,getUserData);
  }

  componentWillReceiveProps(nextProps) {
    const { user } = this.props;
    if (nextProps.user !== user && nextProps.user.email) {
      nextProps.user.type === 'employee'
        ? (this.props.navigation.navigate('main'))
        : Alert.alert('Oops...',
          'Employers have to use web browser to use this app',
          [{
            text: 'OK', onPress: () => this.sendToWeb(),
          },
          {
            text: 'LOG OUT', onPress: () => this.props.logout(),
          }]);
    }
  }

    sendToWeb = () => {
      this.props.logout();
      Linking.openURL(WEB_URL);
    }

    render() {
      const {
        recover,
        user,
        email,
        token,
        navigation,
      } = this.props;
      const { navigate } = navigation;
      if (token === 'loading') {
        return <LoaderComponent />;
      }
      return (
        <KeyboardAwareScrollView
          enableResetScrollToCoords={false}
          contentContainerStyle={styles.wrapper}
          enableOnAndroid
          enableAutomaticScroll
          keyboardOpeningTime={0}
          extraHeight={Platform.select({ android: 230, ios: 230 })}
        >
          <View style={[styles.containerCenterHorizontal, styles.fillAll, { backgroundColor: 'white' }]}>
            <View style={[styles.containerAllCentered, flexes(1.3)]}>
              <Image
                source={require('../../theme/images/headerImage.png')}
                style={styles.imageContain}
              />
            </View>
            <View style={[styles.containerAllCentered, flexes(3)]}>
              {user && !user.email && (
                <SignInForm
                  email={email}
                  navigate={route => navigate(route)}
                />
              )}
            </View>
            <View style={[styles.containerAllCentered,
              flexes(1.2), { backgroundColor: colors.inputsGrey }]}
            >
              <Text style={{ textAlign: 'center' }}>
                {!recover ? 'NEED AN ACCOUNT?' : 'YOUR PASSWORD \n WAS RECOVERED SUCCESSFULLY'}
              </Text>
              {!recover && (
                <TouchableOpacity
                  onPress={() => navigate('signUp')}
                >
                  <Text style={localStyles.signUpText}>SIGN UP</Text>
                </TouchableOpacity>
              )
              }
            </View>
          </View>
        </KeyboardAwareScrollView>
      );
    }
}

const localStyles = {
  signUpText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.pink,
    marginTop: 10,
  },
  wrapper: {
    ...flex.full,
    ...flex.centered,
    paddingBottom: 50,
    backgroundColor: 'transparent',
  },
};

const maStateToProps = ({ auth, layout }) => ({
  user: auth.user,
  loader: layout.loaderVisible,
  token: auth.token,
  recover: auth.recover,
  email: auth.email,
});

export default connect(maStateToProps, { getUserData, logout, fillToken })(AuthScreen);
