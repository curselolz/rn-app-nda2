import React, { PureComponent } from 'react';
import {
 View, Text, Image, TouchableOpacity 
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { styles, flexes, colors } from '../../utils/styles.util';
import { flex, height, width } from '../../theme/consts.theme';
import HeaderContainer from '../../containers/layout/header.container';
import SignUpContainer from '../../containers/auth/signUp.container';

class SignUpScreen extends PureComponent {
  render() {
    return (
          <View style={localStyles.container}>
              <HeaderContainer
                  title="SIGN UP"
                  backButton
                  goBack={this.props.navigation.goBack}
                />
              <KeyboardAwareScrollView
                  enableResetScrollToCoords={false}
                >
                  <SignUpContainer
                      navigate={route => this.props.navigation.navigate(route)}
                    />
                </KeyboardAwareScrollView>

            </View>


    );
  }
}

const localStyles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  signUpText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.pink,
  },
  wrapper: {
    ...flex.centered,
    paddingBottom: 50,
    width: width['100'],
    backgroundColor: 'transparent',
  },
};


export default SignUpScreen;
