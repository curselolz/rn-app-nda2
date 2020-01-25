import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { getUserData } from '../../store/actions/auth.actions';
import { getAttachment } from '../../store/actions/profile.actions'
import GigsHeader from './gigsHeader.component';
import { styles } from '../../utils/styles.util';
import { getGigs } from '../../store/actions/gigs.actions';
import FeddToAppliedAnimatedView from '../../containers/gigs/feddToApliedAnimation.container';

class GigsScreen extends Component {

  componentWillMount() {
    const {  profile, getAttachment, getGigs } = this.props;
    getGigs();
    if (profile.avatarId) {
      getAttachment(profile.avatarId, 'self')
    }
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={[styles.fillAll]}>
        <GigsHeader
          navigate={(route)=> navigation.navigate(route)}
        />
        <FeddToAppliedAnimatedView
            navigate={(route) => this.props.navigation.navigate(route)}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ auth, profile, gigs }) => ({
  user: auth,
  profile,
  selected: gigs.selected,
});

export default connect(mapStateToProps, { getUserData, getAttachment, getGigs })(GigsScreen);
