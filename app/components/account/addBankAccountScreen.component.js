import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  PixelRatio,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../../containers/layout/header.container';
import { Input } from '../../containers/layout';
import Button from '../../containers/layout/button.container';

import {
  getBankAccountToken,
  setBankAccount,
  updateBankAccount,
  deleteBankAccount,
} from '../../store/actions/profile.actions';
import {
  icons,
  shadows,
  width,
  colors,
  height,
  flex,
} from '../../theme/consts.theme';
import { getUserData } from '../../store/actions/auth.actions';
import {
  getFirstTwo,
  getSecondTwo,
  lastFour,
  lastTwo,
} from '../../utils/string.util';
import StateDropDown from '../../containers/layout/stateDropDown';
import { STATES } from '../../data/statesData';

class AddBankAccountScreen extends Component {
    state = {
      imagePickerActive: true,
      pickerOpen: false,
    };

    showImagePicker = (item) => {
      this.setState({ imagePickerActive: false });
      ImagePicker.showImagePicker(
        {
          maxWidth: (width['100'] * PixelRatio.get()) / 4,
          maxHeight: (height['100'] * PixelRatio.get()) / 4,
          quality: 0.5,
        },
        (res) => {
          this.setState({
            [item]: {
              type: 'image/jpg',
              name: res.fileName || 'my photo.JPG',
              ...res,
            },
            imagePickerActive: true,
          });
        },
      );
    };

    collectData = () => {
      const {
        state,
        city,
        address,
        zip,
        dob,
        ssn,
        p_id,
        document,
        documentBack,
      } = this.state;

      const {
        bankAccountId, setBankAccount, getUserData, navigation, updateBankAccount,
      } = this.props;

      const more = this.props.navigation.state.params;
      const newFormData = new FormData();
      if (more) {
        if (more.document === 'true') {
          newFormData.append('document', {
            ...document,
          });
          newFormData.append('documentBack', {
            ...documentBack,
          });
        }
        if (more.p_id === 'true') {
          newFormData.append('p_id', p_id);
        }
        updateBankAccount(newFormData, () => {
          getUserData();
          navigation.goBack();
        });
      } else {
        newFormData.append('address_state', state);
        newFormData.append('address_city', city);
        newFormData.append('address_line1', address);
        newFormData.append('address_postal_code', zip);
        newFormData.append('dob_day', getSecondTwo(dob));
        newFormData.append('dob_month', getFirstTwo(dob));
        newFormData.append('dob_year', lastFour(dob));
        newFormData.append('ssn_last_4', ssn);
        newFormData.append('btok', bankAccountId);
        setBankAccount(newFormData, () => {
          getUserData();
          navigation.goBack();
        });
      }
    };

    handleChange = (item, value) => {
      this.setState({ [item]: value, pickerOpen: false });
    };

    validator = () => {
      let verified = false;
      const {
        account_number,
        routing_number,
        full_name,
        state,
        city,
        address,
        zip,
        dob,
        ssn,
        p_id,
        document,
        documentBack,
      } = this.state;
      const { bankAccountId, getBankAccountToken } = this.props;
      const more = this.props.navigation.state.params;
      if (!bankAccountId && !more) {
        const verified1 = account_number && account_number.length > 2 && account_number.length < 18;
        const verified2 = routing_number && routing_number.length === 11;
        const verified3 = full_name && full_name.length;
        verified = verified1 && verified2 && verified3;
        if (!verified && !verified1) {
          Alert.alert('Oops...', 'Please confirm your account number.', [{
            text: 'OK',
          }]);
        } else if (!verified && !verified2) {
          Alert.alert('Oops...', 'Please confirm your routing number.', [{
            text: 'OK',
          }]);
        } else if (!verified) {
          Alert.alert('Oops...', 'Please confirm your first & last name.', [{
            text: 'OK',
          }]);
        }
      } else if (more) {
        if (more.p_id === 'true' && more.document === 'true') {
          !p_id || (p_id && p_id.length !== 11)
            ? Alert.alert('Oops...', 'Please confirm your SSN.', [{
              text: 'OK',
            }])
            : !document
              ? Alert.alert('Oops...', 'Please Add Your SSN picture.', [{
                text: 'OK',
              }])
              : !documentBack
                ? Alert.alert('Oops...', 'Please Add Your SSN picture.', [{
                  text: 'OK',
                }])
                : (verified = true);
        } else if (more.p_id === 'true') {
          !p_id || (p_id && p_id.length !== 11)
            ? Alert.alert('Oops...', 'Please confirm your SSN.', [{
              text: 'OK',
            }])
            : (verified = true);
        } else {
          !document
            ? Alert.alert('Oops...', 'Please Add Your SSN picture.', [{
              text: 'OK',
            }])
            : !documentBack
              ? Alert.alert('Oops...', 'Please Add Your SSN picture.', [{
                text: 'OK',
              }])
              : (verified = true);
        }
      } else {
        !state
          ? Alert.alert('Oops...', 'Please select a State.', [{
            text: 'OK',
          }])
          : !city
            ? Alert.alert('Oops...', 'Please provide a City.', [{
              text: 'OK',
            }])
          // ? console.log(city)
            : !address
              ? Alert.alert('Oops...', 'Please provide a street.', [{
                text: 'OK',
              }])
              : !zip || (zip && zip.length !== 5)
                ? Alert.alert('Oops...', 'Please provide a Zip Code.', [{
                  text: 'OK',
                }])
                : !ssn || (ssn && ssn.length !== 4)
                  ? Alert.alert('Oops...', 'Please confirm your SSN.', [{
                    text: 'OK',
                  }])
                  : !dob || (dob && dob.length !== 10)
                    ? Alert.alert('Oops...', 'Please confirm your Birth Date.', [{
                      text: 'OK',
                    }])
                    : Number(getFirstTwo(dob)) > 12
                                        || Number(getFirstTwo(dob)) < 1
                      ? Alert.alert('Oops...', 'Wrong month in DOB field.', [{
                        text: 'OK',
                      }])
                      : Number(getSecondTwo(dob)) > 31
                                            || Number(getSecondTwo(dob)) < 1
                        ? Alert.alert('Oops...', 'Wrong day in DOB field.', [{
                          text: 'OK',
                        }])
                        : Number(lastFour(dob)) > 2018
                                                || Number(lastFour(dob)) < 1900
                          ? Alert.alert('Oops...', 'Wrong year in DOB field.', [{
                            text: 'OK',
                          }])
                          : (verified = true);
      }
      return verified;
    };

    deleteBank = () => {
      const { deleteBankAccount, getUserData } = this.props;
      deleteBankAccount(() => {
        getUserData(() => {
          this.props.navigation.goBack();
        });
      });
    }

    confirmPressed = () => {
      const { bankAccountId, getBankAccountToken } = this.props;
      const { account_number, routing_number, full_name } = this.state;
      const more = this.props.navigation.state.params;

      if (this.validator()) {
        if (bankAccountId || more) {
          this.collectData();
        } else {
          const params = {
            // mandatory
            accountNumber: account_number.replace(/ /g, ''),
            countryCode: 'us',
            currency: 'usd',
            // optional
            routingNumber: routing_number.replace(/ /g, ''), // 9 digits
            accountHolderName: full_name,
            accountHolderType: 'individual', // "company" or "individual"
          };
          getBankAccountToken(params);
        }
      } else {
        console.log('else validator 2 ');
      }
    };

    render() {
      const mainData = ['address', 'city', 'state', 'zip', 'dob', 'ssn'];
      const bankInfo = ['account_number', 'routing_number', 'full_name'];
      const attachments = ['document', 'documentBack'];
      const { bankAccountId, user } = this.props;
      const more = this.props.navigation.state.params;
      const { pickerOpen } = this.state;
      return (
        <View>
          <Header
            backButton
            goBack={() => this.props.navigation.goBack()}
            title={user.stripe ? 'Bank Account' : 'Add Bank Account'}
          />
          {!!user.stripe && !more
            ? (
              <View style={[styles.infoContainer, {
                alignItems: 'center',
              }]}
              >
                <View style={styles.infoViews}>
                  <Image source={require('../../theme/images/maney.png')} />
                  <Text> ACH account</Text>
                  <Text>
                    ...
                    {' '}
                    {user && user.stripe && user.stripe.banks[0].last4 || 'XXXX'}
                  </Text>
                </View>
                <Button
                  active
                  action={this.deleteBank}
                  label="DELETE"
                />
              </View>
            )
            : more
              ? (
                <React.Fragment>
                  <View
                    style={styles.infoContainer}
                  >
                    {more.p_id === 'true' && (
                      <React.Fragment>
                        <Text style={styles.title}>ADITIONAL INFORMATION</Text>
                        <Input
                          key="p_id"
                          type="p_id"
                          callbackChange={value => this.handleChange('p_id', val998ue)}
                          required
                        />
                      </React.Fragment>
                    )}
                    {more.document === 'true' && (
                      <React.Fragment>
                        <Text style={styles.title}>ATTACHMENTS</Text>
                        {attachments.map((item, index) => (
                          <TouchableOpacity
                            disabled={!this.state.imagePickerActive}
                            key={index.toString()}
                            style={[styles.addImageButton, shadows.default]}
                            onPress={() => this.showImagePicker(item)}
                          >
                            <Text>
                              Add SSN
                              {' '}
                              {index == 0 ? 'front' : 'back'}
                              {' '}
                              photo
                            </Text>
                            <Image
                              source={
                                      this.state[item] && this.state[item].uri
                                        ? { uri: this.state[item].uri }
                                        : icons.skrepka
                                  }
                              style={styles.addImage}
                            />
                          </TouchableOpacity>
                        ))}
                      </React.Fragment>
                    )}
                    <View style={{ height: 30, width: width['100'] }} />
                    <Button
                      active
                      action={this.confirmPressed}
                      label="CONFIRM"
                    />
                  </View>
                </React.Fragment>
              )
              : (
                <KeyboardAwareScrollView
                  style={styles.infoContainer}
                  enableResetScrollToCoords={false}
                  scrollEnabled={!pickerOpen}
                  enableOnAndroid={!pickerOpen}
                >
                  {bankAccountId ? (
                    <React.Fragment>
                      <Text style={styles.titlePersonal}>PERSONAL DETAILS</Text>
                      <Text style={{ marginBottom: 15 }}>Please use your current mailing address.</Text>
                      {mainData.map(item => (
                        console.log(item),
                        item !== 'state'
                          ? (
                            <Input
                              key={item}
                              type={item}
                              // callbackChange={value => this.handleChange(item, value)}
                              callbackChange={this.handleChange}
                              keyType="send"
                              required
                            />
                          )
                          : (
                            <StateDropDown
                              open={() => this.setState({ pickerOpen: true })}
                              key={item}
                              action={value => this.handleChange(item, lastTwo(value))}
                              data={STATES}
                            />
                          )
                      ))}
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Text style={styles.title}>BANK ACCOUNT INFO</Text>
                      {bankInfo.map(item => (
                        console.log(`'${item}'`),
                        <Input
                          key={item}
                          type={item}
                          keyType="send"
                          submitAction={this.confirmPressed}
                          // callbackChange={value => this.handleChange(`'${item}'`, value)}
                          callbackChange={this.handleChange}
                          required
                        />
                      ))}
                      <Image
                        style={[styles.demo, { height: 170 }]}
                        source={icons.demoImage}
                      />
                    </React.Fragment>
                  )}
                  <View style={styles.button}>
                    <Button active label={bankAccountId ? 'CONFIRM' : 'NEXT'} action={this.confirmPressed} />
                  </View>
                </KeyboardAwareScrollView>
              )}
        </View>
      );
    }
}

const styles = {
  infoContainer: {
    padding: 20,
    marginBottom: 100,
  },
  infoViews: {
    width: width['100'] * 0.9,
    height: 40,
    backgroundColor: '#fff',
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 15,
  },
  titlePersonal: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 15,
    marginBottom: 5,
  },
  button: {
    marginTop: 10,
    marginBottom: 39,
    // marginVertical: 30,
  },
  addImageButton: {
    width: width['100'] * 0.9,
    height: 50,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  addImage: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  demo: {
    width: width['100'] * 0.9 - 10,
    height: 110,
    resizeMode: 'contain',
    marginVertical: 20,
    padding: 1,
  },
  logoutButton: {
    width: width['80'],
    height: 40,
    backgroundColor: colors.white,
    ...flex.centered,
    marginVertical: 20,
    borderColor: colors.grey,
    borderWidth: 1,
  },
};
const mapStateToProps = ({ profile, auth }) => ({
  bankAccountId: profile.bankAccountId,
  user: auth.user,
});

export default connect(
  mapStateToProps,
  {
    getBankAccountToken, setBankAccount, getUserData, deleteBankAccount, updateBankAccount,
  },
)(AddBankAccountScreen);
