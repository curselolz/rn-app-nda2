import React, { Component } from 'react';
import {
  View,
  FlatList,
  Text,
  Platform,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { getUserData,refreshingAppliedGig } from '../../store/actions/auth.actions';
import { getGigs } from '../../store/actions/gigs.actions';
import {
  width,
  colors,
  flex,
} from '../../theme/consts.theme';
import FeedItem from './feedItem.component';
import { isEquivalent } from '../../utils/checkEqual';
import Loader from '../auth/loader.component';

class AppliedGigs extends Component {

  // shouldComponentUpdate(nextProps) {
  //   if (isEquivalent(JSON.stringify(nextProps.appliedGigs),JSON.stringify(this.props.appliedGigs))) {
  //     return false;
  //   }
  //   return true;
  // }

    refreshingStarted = () => {
      const { getUserData,  } = this.props;
      getUserData();
    }

    renderItem = ({ item }) => (
      <FeedItem
        navigate={this.props.navigation.navigate}
        shadow
        active
        applied
        data={item}
      />
    )

    keyExtractor = (item, index) => item.id.toString()

    render() {
      const { appliedGigs,refreshing,loaderVisible } = this.props;
      if (appliedGigs !== null) {
        appliedGigs.sort((a, b) => b.offer_id - a.offer_id);
      }
      return (
        <View style={[localStyles.container]}>
          {appliedGigs && appliedGigs.length
            ? (
              <FlatList
                // style={{ marginBottom: height['100'] / 4 - 10 }}
                showsVerticalScrollIndicator={false}
                // refreshing={refreshing}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={this.refreshingStarted}
                  />
                }
                // onRefresh={this.refreshingStarted}
                data={appliedGigs}
                extraData={appliedGigs}
                keyExtractor={this.keyExtractor}
                renderItem={item => this.renderItem(item)}
                contentContainerStyle={{ paddingBottom: 50 }}
              />
            )
            : <Text style={[localStyles.title, { width: width['100'] * 0.9, textAlign: 'center', marginTop: 20 }]}>NO APPLIED GIGS YET</Text>
          }
        </View>
      );
    }
}

const localStyles = {
  container: {
    paddingBottom: Platform.OS === 'ios' ? 0 : 0,
    alignItems: 'center',
    ...flex.full,
    marginBottom: Platform.OS === 'ios' ? 0 : 30,
  },
  itemWrapper: {
    width: width['90'],
    height: 390,
  },
  title: {
    fontSize: 20,
    color: colors.grey,
    marginVertical: 20,
  },
};

const mapStateToProps = ({ gigs, layout }) => ({
  appliedGigs: gigs.appliedGigs,
  refreshing: layout.loaderVisible,
  detailsData: gigs.detailsData,
  loaderVisible: layout.loaderVisible,
});


export default connect(
  mapStateToProps, { getUserData, getGigs, refreshingAppliedGig },
)(withNavigation(AppliedGigs));
