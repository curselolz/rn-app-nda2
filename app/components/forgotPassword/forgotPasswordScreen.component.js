import React, { PureComponent } from 'react';
import { View, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { styles } from '../../utils/styles.util';
import { Input, Button } from '../../containers/layout';
import { width, height } from '../../theme/consts.theme';
import { forgotPassword } from '../../store/actions/auth.actions';
import HeaderContainer from '../../containers/layout/header.container';

class ForgotPasswordScreen extends PureComponent {
    validation = () => {
      const { handleValidation, state } = this.refs.email;
      if (!this.refs.email.state.value) {
        Alert.alert('Oops...', 'Please provide an email address.');
      } else {
        handleValidation()
          ? this.props.forgotPassword({ email: state.value }, route => this.props.navigation.navigate(route))
          : Alert.alert('Oops...', 'Email address is invalid.', [{
            text: 'OK',
          }]);
      }
    }

    render() {
      return (
        <View style={[styles.containerCenterHorizontal, styles.fillAll]}>
          <HeaderContainer
              backButton
              goBack={this.props.navigation.goBack}
            />
          <View style={localStyles.forgotPassForm}>
              <Text style={localStyles.titleText}>
                        FORGOT PASSWORD
                </Text>
              <Input
                  ref="email"
                  type="email"
                  required
                />
              <Button
                  active
                  action={this.validation}
                  label="SUBMIT"
                />
            </View>
        </View>
      );
    }
}

const localStyles = {
  titleText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  forgotPassForm: {
    marginTop: height['10'],
    height: 250,
    width: width['80'],
    justifyContent: 'space-around',
    alignItems: 'center',
  },
};

const mapStateToProps = ({ auth }) => ({

});


export default connect(mapStateToProps, { forgotPassword })(ForgotPasswordScreen);
