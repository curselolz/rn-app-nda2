import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { updateProfile, switchEditing } from '../../store/actions/profile.actions';
import { logout, getUserData } from '../../store/actions/auth.actions';
import { width, colors } from '../../theme/consts.theme';
import Input from '../layout/input.container';
import Button from '../layout/button.container';
import { styles } from '../../utils/styles.util';
import { unmask } from '../../utils/unmusking.util';

class AccountEditing extends Component {
  static defaultProps = {
    user : {
      profile : {
        phone : ""
      }
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.user ? this.props.user.email : '',
      phone: this.props.user ? this.props.user.profile.phone : '',
      description: '',
    };
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps) {
  //     const { user } = nextProps;
  //     return {
  //       email: user ? user.email : this.state.email,
  //     //phone: user && user.profile ? user.profile.phone : this.state.phone,
  //       description: user && user.profile ? user.profile.description : this.state.description,
  //     };
  //   }
  //   return null;
  // }

    handleChange = (item, value) => {
      this.setState(
        prevState => ({
          ...prevState,
          [item] : value
        }),_ => {
          console.log(
            item,
            value,
            this.state
          )
        }
      )
    }

    validator = () => {
      const emailRef = this.refs.email;
      const { phone } = this.state;
      const isPhoneFull = unmask(phone).length === 11;
      if (!isPhoneFull) {
        Alert.alert('Oops...', 'Phone is invalid.');
      } else if (!emailRef.handleValidation()) {
        Alert.alert('Oops...', 'Email is invalid.');
      }
      return !!emailRef.handleValidation() && isPhoneFull;
    }

    applyChanges = () => {
      const { phone, email, description } = this.state;
      const isNewEmail = this.props.user.email !== email;
      const isValidData = this.validator();
      const data = {
        email: isNewEmail ? email : undefined,
        profile: {
          avatar_id: this.props.profile.changedId,
          description,
          phone: unmask(phone),
        },
      };
      isValidData && this.props.updateProfile(data);
      isValidData
            && isNewEmail
                && Alert.alert('Email change', 'Please check your email to confirm your updated email address.');
    }


    render() {
      const { email, phone, description } = this.state;
      console.log( email, phone, description);
      console.log(this.props)
      return (
        <View style={[localStyles.container, styles.containerCenterHorizontal]}>
          <View style={localStyles.topView}>
            <Input
              type="description"
              multiline
              callbackChange={value => this.handleChange('description', value)}
              defaultValue={description}
            //   style={{ minHeight: 60, marginBotton: 30 }}
              style={{ maxHeight: 70, paddingTop: 3, paddingBottom: 3 }}
            />
          </View>
          <View style={localStyles.bottomView}>
            <Input
              ref="phone"
              type="phone"
              value={this.state.phone}
              callbackChange={this.handleChange}
              defaultValue={phone}
              required
            />
            <Input
              ref="email"
              type="email"
              keyType="send"
              submitAction={this.applyChanges}
              value={this.state.phone}
              callbackChange={value => this.handleChange('email', value)}
              defaultValue={email}
              required
            />
          </View>
          <View style={localStyles.buttonContainer}>
            <Button
              action={this.applyChanges}
              active
              label="UPDATE"
            />
          </View>
        </View>
      );
    }
}

const localStyles = {
  container: {
    backgroundColor: '#fff',
  },
  topView: {
    // height: 130,
    width: width['100'] * 0.9,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
    paddingVertical: width['5'],

  },
  mainInfoView: {
    width: width['100'] * 0.9,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
    paddingVertical: 20,
  },
  middleView: {
    width: width['100'] * 0.9,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
    paddingVertical: 20,
  },
  bottomView: {
    width: width['100'] * 0.9,
    paddingVertical: 20,
  },
  buttonContainer: {
    marginVertical: 25,
  },
  stripeButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  stripeImage: {
    width: 230,
    height: 50,
    resizeMode: 'contain',
  },

};

const mapStateToProps = ({ auth, profile }) => ({
  user: auth.user,
  profile,
  token: auth.token,
});


export default connect(mapStateToProps, {
  logout,
  updateProfile,
  switchEditing,
  getUserData,
})(AccountEditing);
