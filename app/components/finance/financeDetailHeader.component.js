import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, Image,
} from 'react-native';
import { connect } from 'react-redux';
import { switchGigScreen } from '../../store/actions/gigs.actions';
import { width, colors, icons } from '../../theme/consts.theme';
import { styles } from '../../utils/styles.util';
import HeaderSlider from '../../containers/layout/headerSlider';

class GigsHeader extends Component {
  render() {
    const { user, navigate, selected } = this.props;
    return (
      <View style={[styles.containerAllCentered, localStyles.container]}>
        <Text style={localStyles.title}>
          {`Hello, ${user.first_name} ${user.last_name}!`}
        </Text>
        <View style={localStyles.navigatorView}>
          <View style={localStyles.feedView}>
                <TouchableOpacity
                    onPress={() => this.props.switchGigScreen(true)}
                    hitSlop={{
                        top: 20, bottom: 10, left: 10, right: 10,
                      }}
                  >
                    <Text style={localStyles.navigationText}>FEED</Text>
                  </TouchableOpacity>
              </View>
          <View style={localStyles.feedView}>
                <TouchableOpacity
                    onPress={() => this.props.switchGigScreen(false)}
                    hitSlop={{
                        top: 20, bottom: 10, left: 10, right: 10,
                      }}
                  >
                    <Text style={localStyles.navigationText}>APPLIED</Text>
                  </TouchableOpacity>
              </View>
        </View>
        <HeaderSlider selected={selected} />
        <TouchableOpacity
          style={localStyles.squareButton}
          onPress={() => navigate('sorting')}
          hitSlop={{
                top: 10, bottom: 10, left: 10, right: 10,
              }}
        >
          <Image source={icons.filters} style={{ resizeMode: 'stretch' }} />
        </TouchableOpacity>
      </View>
    );
  }
}

const localStyles = {
  container: {
    width: width['100'],
    height: 120,
    backgroundColor: colors.lightGrey,
  },
  title: {
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 18,
    width: width['60'],
    textAlign: 'center',
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
    height: 35,
    width: 35,
    position: 'absolute',
    right: 15,
    borderRadius: 5,
  },
};

const mapStateToProps = state => ({
  selected: state.gigs.selected,
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  { switchGigScreen },
)(GigsHeader);
