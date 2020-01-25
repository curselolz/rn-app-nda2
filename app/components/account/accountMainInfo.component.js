import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, Image,
} from 'react-native';
import { connect } from 'react-redux';
import { TextInputMask } from 'react-native-masked-text';
import { logout } from '../../store/actions/auth.actions';
import {
  width, shadows, colors, icons, flex,
} from '../../theme/consts.theme';
import Button from '../../containers/layout/button.container';
import GigVSFiatSlider from './GigVsFiatSlider.component';

import { renderIntercom } from '../interCom/interCom.component';
import PopUpBadges from '../../containers/badgesPopUps/popUpBadges.container';

class AccountMainInfo extends Component {
    logoutPressed = () => {
      const { navigate, user, logout } = this.props;
      const { email } = user;
      logout(email);
      navigate('auth');
    }

    render() {
      const { user, navigate, badgeVisible } = this.props;
      const badgesArray = user.badges;
      const { verifications } = user;
      const status = badgesArray && badgesArray.filter(item => item.type === 'government_id').length > 0
        ? 'verified'
        : verifications && verifications.filter(item => item.type === 'government_id').length > 0 && verifications[verifications.length - 1].status;
      const badges = [{ type: 'Gov ID', status },
        { type: 'Email', status: 'verified' }, { type: 'Phone', status: 'verified' }];
      return (
        <View style={localStyles.container}>
          <View style={localStyles.firstView}>
            <Text>
              {user.profile
                ? user.profile.description
                : ''}
            </Text>
          </View>
          <View style={localStyles.secondView}>
            <Text style={localStyles.budgesText}>BADGES</Text>
            <View style={localStyles.rowView}>
              {badges.map((item, index) => (
                <View
                  key={index.toString()}
                  style={{ alignItems: 'center' }}
                >
                  <TouchableOpacity
                    style={localStyles.badgesViews}
                    onPress={() => navigate('addBadges')}
                    disabled={item.status === 'pending' || item.status === 'verified'}
                  >
                    {item.status === 'pending'
                      ? <Text>Pending...</Text>
                      : !item.status || item.status === 'declined'
                        ? <Text style={{ fontSize: 70, color: colors.white, fontWeight: '900' }}>+</Text>
                        : (
                          <Image
                            source={item.type === 'Phone'
                              ? icons.phoneVerified
                              : item.type === 'Email'
                                ? icons.emailVerified
                                : icons.govIdVerified}
                            style={localStyles.badges}
                          />
                        )
                      }
                  </TouchableOpacity>
                  <Text style={{ fontWeight: '300' }}>{item.type}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={localStyles.thirdView}>
            <Text style={localStyles.leftAlignedText}>PAYMENT INFORMATION</Text>
            <TouchableOpacity
              style={[localStyles.infoViews]}
              onPress={() => navigate('addBankScreen')}
            >
              {
                            user && user.stripe
                              ? (
                                <React.Fragment>
                                  <Image source={require('../../theme/images/maney.png')} />
                                  <Text> ACH account</Text>
                                  <Text>
                                      ....
                                    {' '}
                                    {user && user.stripe && user.stripe.banks[0].last4 || 'XXXX'}
                                    {' '}
                                  >
                                  </Text>
                                </React.Fragment>
                              )
                              : (
                                <React.Fragment>
                                  <View />
                                  <Text>Add Bank Account</Text>
                                  <Text>></Text>
                                </React.Fragment>
                              )
                        }
            </TouchableOpacity>

            {/* <GigVSFiatSlider
              ref="slider"
            /> */}
            <Text style={localStyles.leftAlignedText}>CONTACT INFORMATION</Text>
            <View style={[localStyles.infoViews]}>
              <Image source={require('../../theme/images/phone.png')} />
              {user.profile && user.profile.phone !== ''
                ? (
                  <TextInputMask
                    value={user.profile.phone}
                    editable={false}
                    defaultValue={user.profile.phone}
                    style={{ width: '65%', textAlign: 'center', color: colors.black }}
                    type="custom"
                    options={{
                      mask: '+1 (999) 999-9999',
                    }}
                  />
                )
                : <Text>+1(XXX) XXX-XXXX</Text>}
              <Text />
            </View>
            <View style={[localStyles.infoViews]}>
              <Image source={require('../../theme/images/email.png')} />
              <Text>{user.email}</Text>
              <Text />
            </View>

          </View>
          <View style={localStyles.fourthView}>
            <Button
              active
              label="SUPPORT"
              action={() => renderIntercom(user)}
            />
            <TouchableOpacity
              style={[localStyles.logoutButton, shadows.default]}
              onPress={this.logoutPressed}
            >
              <Text>SIGN OUT</Text>

            </TouchableOpacity>
          </View>
          {badgeVisible && (
            <PopUpBadges
              action={() => console.log('Pop up closed')}
              image={icons.govIdVerified}
            />
          )}
        </View>
      );
    }
}

const localStyles = {
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  firstView: {
    width: width['100'],
    padding: width['5'],
  },
  secondView: {
    marginVertical: 10,
    width: width['100'],
    backgroundColor: colors.greyWhite,
    alignItems: 'center',
    padding: width['10'],
    justifyContent: 'center',
  },
  thirdView: {
    marginVertical: 10,
    // height: 350,
    width: width['100'],
    paddingHorizontal: width['10'],
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fourthView: {
    marginVertical: 10,
    width: width['100'],
    alignItems: 'center',
    justifyContent: 'center',
    padding: width['5'],
  },
  logoutButton: {
    width: width['80'],
    height: 40,
    backgroundColor: '#fff',
    ...flex.centered,
    marginVertical: 20,
    borderColor: colors.grey,
    borderWidth: 1,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    width: width['100'],
  },
  badgesViews: {
    width: width['100'] / 4,
    height: width['100'] / 4,
    marginBottom: 15,
    ...flex.centered,
  },
  infoViews: {
    width: width['100'] * 0.9,
    height: 40,
    backgroundColor: '#fff',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
  leftAlignedText: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 15,
  },
  budgesText: {
    color: colors.pink,
    fontSize: 16,
    position: 'absolute',
    top: 15,
  },
  badges: {
    width: width['100'] / 4,
    height: width['100'] / 4,
    resizeMode: 'contain',
  },

};

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});


export default connect(mapStateToProps, { logout })(AccountMainInfo);
