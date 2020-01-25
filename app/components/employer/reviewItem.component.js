import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text } from 'react-native';
import {
  width, shadows, colors, flex, icons,
} from '../../theme/consts.theme';
import ImageLoader from '../../utils/imageLoader.util';
import { getTimeString, getDateString } from '../../utils/time.util';
import { getGigByIdReviews } from '../../store/actions/gigs.actions';

class ReviewItem extends Component {
  render() {
    const { data } = this.props;
    const stars = [1, 1, 1, 1, 1];
    const date = data && getDateString(data.created_at);
    const time = data && getTimeString(data.created_at);
    const primary = data && data.gig.primary_category;
    const secondary = data && data.gig.secondary_category;

    // name = data && data.fromUser.company_name
    //     ? data.fromUser.company_name
    //     : data && `${data.fromUser.first_name && data.fromUser.first_name}` +
    //     `  ${data.fromUser.last_name && data.fromUser.last_name[0]}.`,

    const avatarId = data.fromUser !== null ? data.fromUser.avatar_id : 0;
    const name = data.fromUser !== null ? data.fromUser.company_name : '';
    const userScoreMotivation = data && data.vote ? data.vote.motivation : 0;
    const userScoreFriendliness = data && data.vote ? data.vote.friendliness : 0;
    const userScoreProfessionalism = data && data.vote ? data.vote.professionalism : 0;
    const userScorePunctuality = data && data.vote ? data.vote.punctuality : 0;
    const userScoreReliability = data && data.vote ? data.vote.reliability : 0;
    const userScore = (userScoreMotivation + userScoreFriendliness + userScoreProfessionalism + userScorePunctuality + userScoreReliability) / 5;

    return (
      <View style={[styles.container, shadows.default]}>
        <View style={styles.topRowView}>
          <ImageLoader
            id={avatarId}
            style={styles.image}
          />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: colors.grey }}>{date}</Text>
              <Text style={{ marginLeft: 10, color: colors.grey }}>{time}</Text>
            </View>
            <Text
              style={[styles.name, { width: width['100'] / 3 * 2, maxHeight: 40 }]}
              numberOfLines={2}
            >
              {name}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Text style={styles.primary}>
            {primary.toUpperCase()}
            :
          </Text>
          <Text style={styles.secondary}>{secondary.toUpperCase()}</Text>
        </View>
        <View style={styles.starsView}>
          {
                        stars.map((item, index) => (
                          <Image
                            key={index.toString()}
                            style={styles.stars}
                            source={userScore >= index && userScore - index >= 1
                              ? icons.fullStar
                              : userScore > index && userScore - index > 0.49
                                ? icons.halfStar
                                : icons.emptyStar}
                          />
                        ))
                    }
        </View>
        <Text style={styles.description}>
          {data.description && data.description}
        </Text>
      </View>
    );
  }
}

const styles = {
  container: {
    width: width['100'] * 0.9,
    backgroundColor: colors.white,
    marginBottom: width['5'] / 2,
    paddingHorizontal: 15,
  },
  topRowView: {
    flexDirection: 'row',
    height: 80,
    flex: 1,
    alignItems: 'center',
  },
  primary: {
    fontSize: 15,
  },
  secondary: {
    fontWeight: '300',
    fontSize: 15,
  },
  name: {
    fontSize: 16,
  },
  image: {
    height: 50,
    width: 50,
  },
  description: {
    paddingVertical: 15,
  },
  starsView: {
    flexDirection: 'row',
    height: 20,
    ...flex.centered,
    marginBottom: 5,
  },
  stars: {
    height: 15,
    width: 15,
    marginRight: 5,
    resizeMode: 'contain',
  },
};

export default connect(
  null, { getGigByIdReviews },
)(ReviewItem);
