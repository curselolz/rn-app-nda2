import React, { PureComponent } from 'react';
import { Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { width, colors } from '../../theme/consts.theme';
import ScheduledGigs from '../../components/schedule/sheduledGigsList.component';
import CompletedGigs from '../../components/schedule/completedGigsList.component';


class TransitionContainer extends PureComponent {
    state = {
      index: 0,
      routes: [
        { key: 'first', title: 'SCHEDULE' },
        { key: 'second', title: 'COMPLETED' },
      ],

    }

    render() {
      return (
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            first: ScheduledGigs,
            second: CompletedGigs,
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: colors.pink }}
              labelStyle={{ color: colors.pink }}
              style={{ backgroundColor: colors.lightGrey }}
            />
          )}
        />
      );
    }
}

const styles = {
  container: {
    flexDirection: 'row',
    width: width['100'] * 2,
    marginLeft: 0,
  },
};

const mapStateToProps = state => ({
  selected: state.schedule.selected,
});

export default connect(
  mapStateToProps,
)(TransitionContainer);
