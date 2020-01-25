import React, { Component, PureComponent } from 'react';
import {
  View,
  Text,
  FlatList,
  Platform,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import FeedItem from './feedItem.component';
import { getGigs, loadMoreGigs } from '../../store/actions/gigs.actions';
import {
  width,
  height,
  colors,
  icons,
} from '../../theme/consts.theme';
import Loader from '../auth/loader.component';
import PopUpBadges from '../../containers/badgesPopUps/popUpBadges.container';


// class GigFeed extends Component {
class GigFeed extends PureComponent {
    state = {
      badgeVisible: true,
      refreshing: false,
    }

    renderItem = ({ item }) => (
      <FeedItem
        navigate={this.props.navigation.navigate}
        shadow
        active
        data={item}
      />
    )

    refreshingStarted = () => {
      this.props.getGigs(true);
    }

    addMoreGigs = () => {
      console.log('Load more gigs!');
      const { page } = this.props;
      const newPage = page + 1;
      this.props.loadMoreGigs(newPage);
    }

    keyExtractor = (item, index) => item.id.toString()

    render() {
      const { gigs, user, loaderVisible } = this.props;
      let badgeVisible = false;
      let badge = null;
      user && user.badges && user.badges.length && user.badges.map((item) => {
        if (item.new) {
          badgeVisible = true;
          badge = item.type;
        }
      });
      return (
        <View style={{
          flex: 1, position: 'relative',
        }}
        >
        {gigs && gigs.length && gigs !== null ? (
          <View style={[localStyle.container]}>
          {loaderVisible && <Loader />}
          <FlatList
            showsVerticalScrollIndicator={false}
            refreshing={this.props.refreshing}
            data={gigs}
            extraData={gigs}
            keyExtractor={this.keyExtractor}
            renderItem={item => this.renderItem(item)}
            onEndReached={this.addMoreGigs}
            onEndReachedThreshold={0.7}
            onRefresh={this.refreshingStarted}
            contentContainerStyle={{ paddingBottom: 50 }}
          />
          </View>
          ) : (
            <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={(
              <RefreshControl
                refreshing={this.props.refresherData}
                onRefresh={this.refreshingStarted}
              />
            )}
          >
            <Text style={[localStyle.title, { width: width['100'] * 0.9, textAlign: 'center', marginTop: 30 }]}>
                NO AVAILABLE GIGS YET
              </Text>
          </ScrollView>
          )}
          {badgeVisible && (
            <PopUpBadges
              action={() => console.log('Pop up closed')}
              image={badge && badge === 'email' ? icons.emailVerified : badge && icons.govIdVerified}
            />
          )}
        </View>
      );
    }
}

const localStyle = {
  container: {
    height: height['100'],
    width: width['100'],
    paddingHorizontal: width['5'],
    paddingBottom: Platform.OS === 'ios' ? 170 : 190,
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 0 : 0,
  },
  title: {
    fontSize: 20,
    color: colors.grey,
    marginVertical: 20,
  },
};

const mapStateToProps = ({ gigs, layout, auth }) => ({
  refresherData: layout.refresherData,
  gigs: gigs.gigs,
  page: gigs.page,
  refreshing: layout.refreshing,
  user: auth.user,
  loaderVisible: layout.loaderVisible,
});

export default connect(
  mapStateToProps, { getGigs, loadMoreGigs },
)(withNavigation(GigFeed));
