import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { signIn, getUserData } from '../../store/actions/auth.actions';
import { Input, Button } from '../../containers/layout/index';
import { colors, width } from '../../theme/consts.theme';
import Checkbox from '../../containers/layout/checkbox.container';
import { styles } from '../../utils/styles.util';
import Loader from './loader.component';

class SignInForm extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.authSuccess !== this.props.authSuccess) {
      nextProps.authSuccess && this.props.getUserData();
    }
  }

    handleSignIn = () => {
      this.collectData() && this.validate();
    };

    checkEmptyInput = () => {
        if(!this.refs.email.state.value) {
            return Alert.alert('Oops...',
            'Please provide a username.')
        } if (!this.refs.password.state.value) {
            return Alert.alert('Oops...',
            'Please provide a password.')
        } else {
            return true;
        }
    }

    validate = () => {
      const requiredFields = Object.values(this.refs).filter(field => field.props.required);


let valid = requiredFields.map((field) => {
          !field.handleValidation() && alert('Oops...', 'Username or Password is invalid. Please try again.');
          return !!field.handleValidation();
        });

      if (this.refs.password.state.value && this.refs.password.state.value.length < 8) {
        return Alert.alert('Oops...',
          'Email or Password is invalid. Please try again',
          [{
            text: 'OK',
          }],);
      }

      return !valid.includes(false);
    };

    collectData = () => {
      const fields = Object.values(this.refs);

let data = {};

      fields.map(field => field.props.type !== undefined && (data[field.props.type] = field.state.value));
      if (this.refs.check.state.selected) {
        this.checkEmptyInput() && this.props.signIn(data, true);
      } else {
        this.checkEmptyInput() && this.props.signIn(data);
      }
    };

    render() {
      const {
        authSuccess,
        authMsg,
        email,
        loaderVisible
      } = this.props;
      return (
          <View>
          {loaderVisible && <Loader />}
          <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.titleText}>SIGN IN</Text>
              <Input
                  defaultValue={email}
                  ref="email"
                  type="email"
                  required
                />
              <Input
                  ref="password"
                  type="password"
                  required
                  keyType="send"
                  submitAction={this.handleSignIn}
                />
              <View style={localStyles.row}>
                  <Checkbox
                      ref="check"
                      remember
                    />
                  <TouchableOpacity
                      onPress={() => this.props.navigate('forgot')}
                    >
                      <Text style={localStyles.forgotLink}>Forgot Password?</Text>
                    </TouchableOpacity>

                </View>
              <Button
                  action={this.handleSignIn}
                  label="SUBMIT"
                  upperCase
                  active
                />
            </View>
        </View>
      );
    }
}

const localStyles = StyleSheet.create({
  forgotLinkWrapper: {

  },
  forgotLink: {
    color: colors.pink,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width['100'] * 0.9,
    marginTop: 10,
    marginBottom: 15,
  },
});

const mapStateToProps = ({ auth, layout }) => ({
  authSuccess: auth.authSuccess,
  loaderVisible: layout.loaderVisible,
});

export default connect(mapStateToProps, { signIn, getUserData })(SignInForm);
