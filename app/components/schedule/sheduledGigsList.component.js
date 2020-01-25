import React, { PureComponent } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { withNavigation } from 'react-navigation';
import { width, colors } from '../../theme/consts.theme';
import { getFutureDateString } from '../../utils/time.util';
import FeedItem from '../gigs/feedItem.component';


class ScheduledGigs extends PureComponent {
  render() {
    const { scheduled } = this.props;
    console.log('Schedule befor sorting: ', scheduled);

    scheduled && scheduled.sort((a, b) => moment(a.start_time) - moment(b.start_time));
    console.log('Schedule after sorting : ', scheduled);
    return (
      <View>
        <ScrollView
          style={localStyle.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >

          {scheduled && scheduled.length ? scheduled.map((item, index) => (
                <View
                    style={localStyle.itemContainer}
                    key={index.toString()}
                  >
                    <View style={localStyle.titleView}>
                        <Text style={localStyle.title}>{getFutureDateString(item.start_time)}</Text>
                      </View>

                    <FeedItem
                        navigate={this.props.navigation.navigate}
                        shadow
                        active
                        completed={false}
                        data={item}
                      />
                  </View>
              ))
                : <Text style={[localStyle.title, { width: width['100'] * 0.9, textAlign: 'center', marginTop: 20 }]}>NO SCHEDULED GIGS YET</Text>
                    }
        </ScrollView>


      </View>
    );
  }
}

const localStyle = {
  itemContainer: {
  },
  container: {
    width: width['100'],
    paddingHorizontal: width['5'],
    paddingBottom: 40,
    // marginBottom: 120
  },
  title: {
    fontSize: 20,
    color: colors.grey,
  },
  titleView: {
    justifyContent: 'center',
    flex: 1,
    height: 55,
  },

};

const mapStateToProps = ({ schedule }) => ({
  scheduled: schedule.scheduledGigs,
});

export default connect(
  mapStateToProps,
)(withNavigation(ScheduledGigs));
