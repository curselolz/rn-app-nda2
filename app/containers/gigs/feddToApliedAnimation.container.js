import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import {
  TabViewAnimated, TabView, TabBar, SceneMap,
} from 'react-native-tab-view';
import { connect } from 'react-redux';


import { width, colors } from '../../theme/consts.theme';
import GigsFeed from '../../components/gigs/gigsFeed.component';
import AppliedGigs from '../../components/gigs/appliedGigs.component';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};


class TransitionContainer extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'FEED' },
      { key: 'second', title: 'APPLIED' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} />;


  render() {
    const { navigate } = this.props;
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: GigsFeed,
          second: AppliedGigs,
        })}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
        initialLayout={initialLayout}
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
  selected: state.gigs.selected,
});

export default connect(
  mapStateToProps,
)(TransitionContainer);
