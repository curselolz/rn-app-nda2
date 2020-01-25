import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { switchScheduleScreens } from '../../store/actions/schedule.actions';
import { width, colors } from '../../theme/consts.theme';
import { styles } from '../../utils/styles.util';
import HeaderSlider from '../../containers/layout/headerSlider';


class ScheduleHeader extends Component {
  render() {
    const { selected } = this.props;
    return (
      <View style={[styles.containerAllCentered, localStyles.container]}>
        {/* <View style={localStyles.navigatorView}>
              <View style={localStyles.feedView}>
                    <TouchableOpacity
                          onPress={() => this.props.switchScheduleScreens(true)}
                          hitSlop={{
 top: 20, bottom: 20, left: 20, right: 20
}}
                        >
                          <Text style={localStyles.navigationText}>
                                SCHEDULED
                            </Text>
                        </TouchableOpacity>
                  </View>
                <View style={localStyles.feedView}>
                      <TouchableOpacity
                      onPress={() => this.props.switchScheduleScreens(false)}
                      hitSlop={{
 top: 20, bottom: 20, left: 20, right: 20
}}
                    >
                      <Text style={localStyles.navigationText}>COMPLETED</Text>
                    </TouchableOpacity>
                    </View>

            </View>
        <HeaderSlider
              selected={selected}
            /> */}
      </View>
    );
  }
}

const localStyles = {
  container: {
    width: width['100'],
    height: 80,
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
};

const mapStateToProps = state => ({
  selected: state.schedule.selected,
});

export default connect(
  mapStateToProps, { switchScheduleScreens },
)(ScheduleHeader);
