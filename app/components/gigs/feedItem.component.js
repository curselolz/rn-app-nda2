import React, { PureComponent } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  PixelRatio,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import {
  width,
  height,
  shadows,
  colors,
  icons,
} from '../../theme/consts.theme';
import {
  fillGigDetailsScreen,
  getGigById,
} from '../../store/actions/gigs.actions';
import {
  getTimeString,
  getDateString,
  getUpdatedTime,
  getDuration,
} from '../../utils/time.util';
import ImageLoader from '../../utils/imageLoader.util';
import { capitalizeString } from '../../utils/string.util';
import { statesTransform } from '../../data/stateTransform';


class FeedItem extends PureComponent {
  navigateToEmployerDetails = () => {
    const { uri } = this.refs.imageLoader.state;
    const { navigation, data } = this.props;
    navigation.navigate('employerDetails', {
      data: data.creator,
      pictureUri: uri,
    });
  };

  toDetails = () => {
    const { data, completed } = this.props;
    completed === undefined
      ? (this.props.fillGigDetailsScreen({
        route: 'gigs',
        data: { applied: this.props.applied, completed: undefined, ...data },
      }),
      this.props.navigate('gigDetails'))
      : (this.props.fillGigDetailsScreen({
        route: 'Schedule',
        data: { applied: true, completed, ...data },
      }),
      this.props.navigate('scheduleDetails'));
  };

  calculatedUserScore = () => {
    const {
      data,
    } = this.props;
    console.log(data);
    const dataCreator = data.creator;
    const dataVotes = data.creator.profile === undefined || data.creator.profile === null
    || data.creator.profile.votes === undefined ? [0] : data.creator.profile.votes;

    const friendless = dataCreator && dataVotes.length > 0
      ? dataVotes ? dataVotes.map(frendless => frendless.friendliness) : [0] : [0];
    const professionalism = dataCreator && dataVotes.length > 0
      ? dataVotes ? dataVotes.map(frendless => frendless.professionalism) : [0] : [0];
    const punctuality = dataCreator && dataVotes.length > 0
      ? dataVotes ? dataVotes.map(frendless => frendless.punctuality) : [0] : [0];
    const reliability = dataCreator && dataVotes.length > 0
      ? dataVotes ? dataVotes.map(frendless => frendless.reliability) : [0] : [0];
    const motivation = dataCreator && dataVotes.length > 0
      ? dataVotes ? dataVotes.map(frendless => frendless.friendliness) : [0] : [0];
    const friendlessAvg = dataCreator && dataVotes.length > 0
      ? dataVotes ? friendless.reduce((a, b) => a + b, 0) / dataVotes.length : 0 : 0;
    const professionalismAvg = dataCreator && dataVotes.length > 0
      ? dataVotes ? professionalism.reduce((a, b) => a + b, 0) / dataVotes.length : 0 : 0;
    const punctualityAvg = dataCreator && dataVotes.length > 0
      ? dataVotes ? punctuality.reduce((a, b) => a + b, 0) / dataVotes.length : 0 : 0;
    const reliabilityAvg = dataCreator && dataVotes.length > 0
      ? dataVotes ? reliability.reduce((a, b) => a + b, 0) / dataVotes.length : 0 : 0;
    const motivationAvg = dataCreator && dataVotes.length > 0
      ? dataVotes ? motivation.reduce((a, b) => a + b, 0) / dataVotes.length : 0 : 0;
    const userScore = (
      friendlessAvg + professionalismAvg + punctualityAvg + reliabilityAvg + motivationAvg
    ) / 5;
    return userScore;
  }

  calcDataToDisplay = () => {
    const {
      data,
    } = this.props;
    const primaryCategory = (data.primary_category && data.primary_category.toUpperCase()) || '';
    const secondaryCategory = (data.secondary_category && data.secondary_category.toUpperCase()) || '';
    const startDate = (data.start_time && getDateString(data.start_time)) || '';
    const startTime = (data.start_time && getTimeString(data.start_time)) || '';
    const duration = (data.end_time && getDuration(data.start_time, data.end_time)) || '';
    const durationString = duration
      ? `${Math.floor(duration / 60)}h:${duration % 60}m`
      : '';
    const created = (data.created_at && getUpdatedTime(data.created_at)) || '';
    const hourPrice = data.primary_category && data.hour_price / 100;
    const priceLabel = data.primary_category && data.primary_category === 'peer2peer'
      ? `$${data.contract_price / 100}`
      : data.primary_category && `$${hourPrice}/Hr`;
    const totalContractPrice = data.primary_category && data.primary_category === 'peer2peer'
      ? data.contract_price / 100
      : data.primary_category && hourPrice * (duration / 60);
    const gigKloudFee = totalContractPrice && totalContractPrice * 0.1;
    const totalEarnings = totalContractPrice && totalContractPrice * 0.9;
    const stars = [1, 1, 1, 1, 1];
    const addressArray = data && data.address.split(',');
    const rowState = addressArray[3].trim();
    const transformedState = statesTransform[rowState];
    const place = data && `${addressArray[2]}, ${transformedState}`;
    const creatorName = data.creator && data.creator.company_name
      ? capitalizeString(data.creator.company_name)
      : data.creator
            && data.creator.first_name
            && data.creator.last_name
            && `${data.creator.first_name
              && capitalizeString(data.creator.first_name)} ${data.creator
              .last_name && capitalizeString(data.creator.last_name[0])}.`;
    if (data.creator.profile === null) {
      Alert.alert('Oops', 'Server error,please contact for developer with profile error');
    }
    const dataReturn = {
      primaryCategory,
      secondaryCategory,
      startDate,
      startTime,
      duration,
      durationString,
      created,
      hourPrice,
      priceLabel,
      totalContractPrice,
      gigKloudFee,
      totalEarnings,
      stars,
      addressArray,
      rowState,
      transformedState,
      place,
      creatorName,
    };
    return dataReturn;
  }

  render() {
    const {
      shadow,
      active,
      completed,
      data,
      navigation,
    } = this.props;
    const {
      primaryCategory,
      secondaryCategory,
      startDate,
      startTime,
      duration,
      durationString,
      created,
      priceLabel,
      totalContractPrice,
      gigKloudFee,
      totalEarnings,
      stars,
      place,
      creatorName,
    } = this.calcDataToDisplay();
    const userScore = this.calculatedUserScore();
    return (
      <TouchableOpacity
        style={[localStyles.container, shadow && shadows.default]}
        onPressIn={this.toDetails}
        disabled={!active}
      >
        <View style={localStyles.topView}>
          <View style={{
            flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 3,
          }}
          >
            <TouchableOpacity
              disabled={!navigation}
              onPress={this.navigateToEmployerDetails}
              hitSlop={{
                top: 10, bottom: 10, left: 10, right: 10,
              }}
            >
              <ImageLoader
                ref="imageLoader"
                style={localStyles.employerLogo}
                id={
                data.creator
                && data.creator.profile
                && data.creator.profile.avatar_id
              }
              />
            </TouchableOpacity>
            <View>
              <View
                style={{
                  alignItems: 'center',
                }}
              >
                <View style={{ flex: 1, marginLeft: 5 }}>
                  <Text
                    style={[localStyles.title, { width: width['100'] / 2 - 35, maxHeight: 40, paddingLeft: 5 }]}
                    numberOfLines={2}
                  >
                    {creatorName}
                  </Text>
                  <View style={localStyles.starsRowView}>
                    {stars.map((item, index) => (
                      <Image
                        key={index.toString()}
                        style={localStyles.stars}
                        source={
                          userScore >= index && userScore - index >= 1
                            ? icons.fullStar
                            : userScore > index && userScore - index > 0.49
                              ? icons.halfStar
                              : icons.emptyStar
                        }
                      />
                    ))}
                    <Text style={{ marginLeft: 5 }}>
                      {data
                        && data.creator
                        && data.creator.profile.votes_number}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View>
            <Text
              style={[
                localStyles.title,
                { fontWeight: '700', textAlign: 'right' },
              ]}
            >
              {completed ? data.identifier : 'Start Time'}
            </Text>
            {!completed ? (
              <Text style={{ textAlign: 'right' }}>{startTime}</Text>
            ) : (
              <Text />
            )}
            {duration ? (
              <Text style={{ textAlign: 'right' }}>{durationString}</Text>
            ) : (
              <Text />
            )}
          </View>
        </View>
        <View style={localStyles.middleView}>
          <View>
            <View style={localStyles.topLeftView}>
              <Text style={{ fontWeight: '500' }}>
                {primaryCategory}
                :
                {' '}
              </Text>
              <Text style={{ fontWeight: '300' }}>{secondaryCategory}</Text>
            </View>
            <Text style={{ marginRight: 10, color: colors.grey }}>
              Posted
              {' '}
              {created}
            </Text>
          </View>
        </View>
        <View style={localStyles.bottomView}>
          <View style={localStyles.bottomRowView}>
            <Image
              style={localStyles.bottomImages}
              source={icons.greyLocation}
            />
            <Text
              style={[localStyles.bottomViewText, { textAlign: 'center' }]}
              numberOfLines={2}
            >
              {place}
            </Text>
          </View>
          <View style={localStyles.bottomRowView}>
            <Image style={localStyles.bottomImages} source={icons.greyMoney} />
            <Text style={localStyles.bottomViewText}>{priceLabel}</Text>
          </View>
          <View style={localStyles.bottomRowView}>
            <Image
              style={localStyles.bottomImages}
              source={icons.greySchedule}
            />
            <Text style={localStyles.bottomViewText}>{startDate}</Text>
          </View>
        </View>
        {completed && (
        <View style={localStyles.completedView}>
          <View>
            <Text style={localStyles.completedText}>CONTRACT PRICE:</Text>
            <Text style={localStyles.completedText}>GIGKLOUD FEE:</Text>
            <Text style={[localStyles.completedText, { color: 'black' }]}>
                TOTAL EARNINGS:
            </Text>
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <Text style={[localStyles.completedText, localStyles.alignRight]}>
                $
              {totalContractPrice && totalContractPrice.toFixed(2)}
            </Text>
            <Text style={[localStyles.completedText, localStyles.alignRight]}>
                -$
              {gigKloudFee && gigKloudFee.toFixed(2)}
            </Text>
            <Text
              style={[
                localStyles.completedText,
                localStyles.alignRight,
                { color: 'black' },
              ]}
            >
                $
              {totalEarnings && totalEarnings.toFixed(2)}
            </Text>
          </View>
        </View>
        )}
      </TouchableOpacity>
    );
  }
}

const localStyles = {
  completedText: {
    fontSize: 16,
    color: colors.grey,
    marginTop: 5,
  },
  alignRight: {
    textAlign: 'right',
  },
  container: {
    width: width['100'] * 0.9,
    minHeight: 180,
    paddingVertical: 10,
    backgroundColor: colors.white,
    marginVertical: width['5'] / 2,
  },
  topView: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
  },
  topLeftView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topRightView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  middleView: {
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  bottomView: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  bottomRowView: {
    flex: 1,
    alignItems: 'center',
  },
  employerLogo: {
    height: height['100'] / 4 / 3 - 5,
    width: height['100'] / 4 / 3 - 5,
  },
  starsRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 100,
  },
  stars: {
    height: 15,
    width: 15,
    marginLeft: 5,
    resizeMode: 'contain',
  },
  bottomImages: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  title: {
    // marginLeft: 5,
    // marginBottom: 5,
    fontSize: PixelRatio.get() <= 2 ? 14 : 16,
  },
  completedView: {
    borderColor: colors.grey,
    borderTopWidth: 1,
    marginTop: 15,
    marginHorizontal: 15,
    flexDirection: 'row',
    paddingTop: 10,
  },
  bottomViewText: {
    fontSize: 13,
  },
};

export default connect(
  null,
  { fillGigDetailsScreen },
)(withNavigation(FeedItem));
