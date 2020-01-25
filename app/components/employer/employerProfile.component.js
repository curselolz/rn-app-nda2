import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { flex } from '../../theme/consts.theme';
import AccountHeaderComponent from '../account/accountHeader.component';
import EmployerReview from './emploeyerReviews.component';

class EmployerProfile extends Component {

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <AccountHeaderComponent
            employer={this.props.navigation.state.params}
            navigation={this.props.navigation}
          />
          <EmployerReview
            data={this.props.navigation.state.params}
          />

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
  mapStateToProps, {},
)(EmployerProfile);
