import React, { PureComponent } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { withNavigation } from 'react-navigation';
import AppliedItem from './appliedItem.component';
import { width, height, colors } from '../../theme/consts.theme';
import { getFutureDateString, getUpdatedTime } from '../../utils/time.util';
import FeedItem from '../gigs/feedItem.component';


class CompletedGigs extends PureComponent {
  render() {
    console.log('completed gigs')
    const { completedGigs } = this.props;
    console.log(completedGigs)
    completedGigs && completedGigs.sort((a, b) => moment(b.start_time) - moment(a.start_time));
    return (
      <View>
        <ScrollView
          style={localStyle.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {completedGigs && completedGigs.length ? completedGigs.map((item, index) => (
            <View
              key={index.toString()}
            >
              <Text style={localStyle.title}>{getUpdatedTime(item.start_time)}</Text>
              <FeedItem
                navigate={this.props.navigation.navigate}
                shadow
                completed
                active
                data={item}
              />
            </View>
          ))
            : <Text style={[localStyle.title, { width: width['100'] * 0.9, textAlign: 'center', marginTop: 20 }]}>NO COMPLETED GIGS YET</Text>
                    }
        </ScrollView>
      </View>
    );
  }
}

const localStyle = {
  container: {
    width: width['100'],
    paddingHorizontal: width['5'],
    paddingBottom: 40,
    // marginBottom: 120,
  },
  title: {
    fontSize: 20,
    color: colors.grey,
    marginVertical: 20,
  },
};

const mapStateToProps = ({ schedule }) => ({
  completedGigs: schedule.completedGigs,
});

export default connect(
  mapStateToProps,
)(withNavigation(CompletedGigs));
