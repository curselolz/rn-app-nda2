import React, { PureComponent } from 'react';
import {
  View, Image, TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles, flexes, colors } from '../../utils/styles.util';
import { flex } from '../../theme/consts.theme';
import RecoverPasswordFormContainer from '../../containers/recoverPassword/recoverPasswordForm.container';

class RecoverPasswordScreen extends PureComponent {
  render() {
    const navigationParams = this.props.navigation.state.params;
    return (
      <KeyboardAwareScrollView
            contentContainerStyle={styles.wrapper}
          >
            <View style={[styles.containerCenterHorizontal, styles.fillAll]}>
                <View style={[styles.containerAllCentered, flexes(1.2)]}>
                    <Image
                        source={require('../../theme/images/headerImage.png')}
                        style={styles.imageContain}
                      />
                  </View>

                <View style={[styles.containerAllCentered,, flexes(3)]}>
                    <RecoverPasswordFormContainer
                        navigationParams={navigationParams}
                        navigate={route => this.props.navigation.navigate(route)}
                      />
                  </View>

                <View style={[styles.containerAllCentered, flexes(1)]} />
              </View>

          </KeyboardAwareScrollView>

    );
  }
}

const localStyles = {
  signUpText: {
    fontSize: 24,
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


export default RecoverPasswordScreen;
