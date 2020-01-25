import React, { Component } from 'react';
import { View } from 'react-native';
import { flex } from '../../theme/consts.theme';
import ScheduleHeader from './scheduleHeader.component';
import ScheduleToCompletedAnimation from '../../containers/schedule/sheduledtoCompletedAnimation.container';

class ScheduleScreen extends Component {
  render() {
    return (
          <View style={styles.container}>
              <ScheduleHeader />
              <ScheduleToCompletedAnimation
              navigate={route => this.props.navigation.navigate(route)}
            />
            </View>
    );
  }
}

const styles = {
  container: {
    ...flex.full,
  },

};

export default ScheduleScreen;
