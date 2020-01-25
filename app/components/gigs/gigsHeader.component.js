import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, Image, Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { switchGigScreen } from '../../store/actions/gigs.actions';
import { width, colors, icons } from '../../theme/consts.theme';
import { styles } from '../../utils/styles.util';
import HeaderSlider from '../../containers/layout/headerSlider';
import { getUserReviews } from '../../store/actions/auth.actions';

class GigsHeader extends Component {
  componentDidMount() {
    console.log('mount component');
    console.log(this.props.user);
    this.props.getUserReviews(131);
  }

  render() {
    const { user, navigate, selected } = this.props;
    return (
      <View style={[styles.containerAllCentered, localStyles.container]}>
        <Text style={localStyles.title}>
          {`Hello, ${user.first_name} ${
            user.last_name
          }!`}
        </Text>
        {/* <View style={localStyles.navigatorView}>
                  <View style={localStyles.feedView}>
                        <TouchableOpacity
                            onPress={() => this.props.switchGigScreen(true)}
                            hitSlop={{ top: 20, bottom: 10, left: 10, right: 10 }}
                        >
                            <Text style={localStyles.navigationText}>FEED</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={localStyles.feedView}>
                        <TouchableOpacity
                            onPress={() => this.props.switchGigScreen(false)}
                            hitSlop={{ top: 20, bottom: 10, left: 10, right: 10 }}
                        >
                            <Text style={localStyles.navigationText}>APPLIED</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
        {/* <HeaderSlider selected={selected} /> */}
        <TouchableOpacity
          style={localStyles.squareButton}
          onPress={() => navigate('sorting')}
          hitSlop={{
            top: 10, bottom: 10, left: 10, right: 10,
          }}
        >
          <Image source={icons.filters} style={localStyles.icon} />
        </TouchableOpacity>
      </View>
    );
  }
}

const localStyles = {
  container: {
    paddingTop: 40,
    width: width['100'],
    height: 90,
    backgroundColor: colors.lightGrey,
  },
  title: {
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 18,
    width: width['60'],
  },
  navigatorView: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    left: 0,
  },
  feedView: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationText: {
    color: colors.pink,
    fontSize: 16,
    fontWeight: '300',
  },
  squareButton: {
    paddingTop: 15,
    ...Platform.select({
      android: {
        position: 'absolute',
        right: 15,
        top: 25,
        height: 55,
        width: 55,
        paddingBottom: 15,
      },
      ios: {
        position: 'absolute',
        right: 15,
        height: 35,
        width: 35,
      },
    }),
    // paddingTop: 15,
    // height: 35,
    // width: 35,
    // position: 'absolute',
    // right: 15,
    // borderRadius: 5,
  },
  icon: {
    resizeMode: 'stretch',
  },
};

const mapStateToProps = state => ({
  selected: state.gigs.selected,
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  { switchGigScreen,getUserReviews },
)(GigsHeader);
