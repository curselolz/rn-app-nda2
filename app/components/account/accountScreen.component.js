import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getUserData } from '../../store/actions/auth.actions';
import { flex } from '../../theme/consts.theme';
import AccountHeaderComponent from './accountHeader.component';
import AccountMainInfo from './accountMainInfo.component';
import AccountEditingContainer from '../../containers/account/AccountEditing.container';

class AccountScreen extends Component {
  componentWillReceiveProps(nextProps) {
    const { navigation } = this.props;
    const { state } = navigation;
    if (state !== nextProps.navigation.state) {
      const { params } = nextProps.navigation.state;
      if (params) {
        this.reloadUser();
      }
    }
  }

    reloadUser = () => {
      this.props.getUserData();
    }

    render() {
      const { params } = this.props.navigation.state;
      const { navigation } = this.props;
      if (params !== undefined) {
        console.log('HELLO FROM UNDEFINED');
      }
      console.log('New params received !!!!!!!: ', params);
      let badgeVisible = null;
      if (params && params.gov_id === 'true') {
        badgeVisible = true;
      }

      const { edit } = this.props;
      return (
        <View style={styles.container}>
          <KeyboardAwareScrollView
            enableResetScrollToCoords={false}
                // contentContainerStyle={styles.wrapper}
          >
            <AccountHeaderComponent
              navigation={navigation}
            />
            {
            !edit ? (
              <AccountMainInfo
                navigate={route => navigation.navigate(route)}
                badgeVisible={badgeVisible}
              />
            )
              : (
                <AccountEditingContainer />
              )
            }
          </KeyboardAwareScrollView>
        </View>
      );
    }
}

const styles = {
  container: {
    // ...flex.full,
    alignItems: 'center',
  },
  wrapper: {
    ...flex.full,
    ...flex.centered,
    paddingBottom: 50,
    backgroundColor: 'transparent',
  },

};

const mapStateToProps = state => ({
  edit: state.profile.edit,
});

export default connect(
  mapStateToProps, { getUserData },
)(AccountScreen);
