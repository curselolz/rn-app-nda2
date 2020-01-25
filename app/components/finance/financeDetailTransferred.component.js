import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  TextInput,
  Linking,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { TextInputMask } from 'react-native-masked-text';
import {
  colors,
  width,
  icons,
} from '../../theme/consts.theme';
import { capitalizeString } from '../../utils/string.util';
import {
  getTimeString,
  getDuration,
} from '../../utils/time.util';
import ImageLoader from '../../utils/imageLoader.util';
import { inputs } from '../../utils/inputs.util';
import HeaderComponent from '../../containers/layout/header.container';
import GigsReview from '../gigs/gigsReview.component';

class FinanceDetailTransferred extends Component {
  callPhoneNumber = (index) => {
    const { data } = this.props;


    const phone = data.employer.profile.phone;


    const email = data.employer.email;
    if (index === 1) {
      const url = `tel:${phone}`;
      Linking.canOpenURL(url)
        .then((supported) => {
          if (!supported) {
            console.log(`Can't handle url: ${url}`);
          } else {
            return Linking.openURL(url);
          }
        })
        .catch(err => console.error('An error occurred', err));
    } else {
      const url = `mailto:${email}`;
      console.log('mail to url: ', url);
      Linking.canOpenURL(url)
        .then((supported) => {
          if (!supported) {
            console.log(`Can't handle url: ${url}`);
          } else {
            return Linking.openURL(url);
          }
        })
        .catch(err => console.error('An error occurred', err));
    }
  }

  render() {
    const {
      data, navigation, detailsData, userId,
    } = this.props;
    const duration = data.gig.end_time && getDuration(data.gig.start_time, data.gig.end_time) || '';
    const hourPrice = data.gig.primary_category && data.gig.hour_price / 100;
    const primaryCategory = data.gig.primary_category && data.gig.primary_category.toUpperCase() || '';
    const secondaryCategory = data.gig.secondary_category && data.gig.secondary_category.toUpperCase() || '';
    const startTime = data.gig.start_time && getTimeString(data.gig.start_time) || '';
    const durationString = duration ? (`${Math.floor(duration / 60)}h:${duration % 60}m`) : '';
    const totalPrice = data.gig.primary_category && (getDuration(data.gig.start_time, data.gig.end_time) * data.gig.hour_price) / 100;
    const priceLabel = data.gig.primary_category && data.gig.primary_category === 'peer2peer'
      ? `$${data.gig.contract_price / 100}`
      : data.gig.primary_category && `$${hourPrice}/Hr`;
    const stars = [1, 1, 1, 1, 1];
    const creatorName = data.employer.company_name || data.gig.creator
    && (data.gig.creator.company_name && capitalizeString(data.gig.creator.company_name)
    || `${data.gig.creator.first_name && capitalizeString(data.gig.creator.first_name)} ${data.gig.creator.last_name
    && capitalizeString(data.gig.creator.last_name[0])}.`
    || '');
    const dataCreator = data.employer.profile;
    const dataVotes = data.employer.profile.votes === undefined ? [0] : data.employer.profile.votes;
    const friendless = dataCreator && dataVotes.length > 0 ? dataVotes ? dataVotes.map(frendless => frendless.friendliness) : [0] : [0];
    const professionalism = dataCreator && dataVotes.length > 0 ? dataVotes ? dataVotes.map(frendless => frendless.professionalism) : [0] : [0];
    const punctuality = dataCreator && dataVotes.length > 0 ? dataVotes ? dataVotes.map(frendless => frendless.punctuality) : [0] : [0];
    const reliability = dataCreator && dataVotes.length > 0 ? dataVotes ? dataVotes.map(frendless => frendless.reliability) : [0] : [0];
    const motivation = dataCreator && dataVotes.length > 0 ? dataVotes ? dataVotes.map(frendless => frendless.friendliness) : [0] : [0];
    const friendlessAvg = dataCreator && dataVotes.length > 0 ? dataVotes ? friendless.reduce((a, b) => a + b, 0) / dataVotes.length : 0 : 0;
    const professionalismAvg = dataCreator && dataVotes.length > 0 ? dataVotes ? professionalism.reduce((a, b) => a + b, 0) / dataVotes.length : 0 : 0;
    const punctualityAvg = dataCreator && dataVotes.length > 0 ? dataVotes ? punctuality.reduce((a, b) => a + b, 0) / dataVotes.length : 0 : 0;
    const reliabilityAvg = dataCreator && dataVotes.length > 0 ? dataVotes ? reliability.reduce((a, b) => a + b, 0) / dataVotes.length : 0 : 0;
    const motivationAvg = dataCreator && dataVotes.length > 0 ? dataVotes ? motivation.reduce((a, b) => a + b, 0) / dataVotes.length : 0 : 0;
    const userScore = (friendlessAvg + professionalismAvg + punctualityAvg + reliabilityAvg + motivationAvg) / 5;
    const totalContractPrice = data.gig.primary_category && data.gig.primary_category === 'peer2peer'
      ? data.gig.contract_price / 100
      : data.gig.primary_category && hourPrice * (duration / 60);
    const totalEarnings = totalContractPrice && totalContractPrice * 0.9;
    const rows = [{ type: 'location', label: data.gig.address },
      { type: 'phone', label: data.employer.profile.phone },
      { type: 'email', label: data.employer.email },
      { type: 'money', label: priceLabel }];
    const t = inputs.phone.type;
    return (
      <View style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <HeaderComponent
          title="Details"
          backButton
          navigation={navigation}
        />
        <View
          style={[localStyles.itemWrapper]}
          onPress={this.goToDetails}
        >
          <View style={localStyles.pictureRowView}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={this.navigateToEmployerDetails}
                hitSlop={{
                  top: 10, bottom: 10, left: 10, right: 10,
                }}
              >
                <ImageLoader
                  ref="imageLoader"
                  style={localStyles.logo}
                  id={dataCreator && dataCreator.avatar_id}
                />
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text
                    style={[localStyles.title, { width: width['100'] / 2 - 35, maxHeight: 40 }]}
                    numberOfLines={2}
                  >
                    {creatorName}
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: '700' }}>{data.gig.identifier}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', width: 90, flex: 1 }}>
                    {stars.map((item, index) => (
                      <Image
                        key={index.toString()}
                        source={userScore >= index && userScore - index >= 1
                          ? icons.fullStar
                          : userScore > index && userScore - index > 0.49
                            ? icons.halfStar
                            : icons.emptyStar}
                        style={localStyles.stars}
                      />
                    ))}
                    <Text>
                      {
                          data
                          && data.creator
                          && data.creator.profile.votes_number
                      }
                    </Text>
                  </View>
                  <Text>{startTime}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={localStyles.categoryRowView}>
            <View style={{ flexDirection: 'row' }}>
              <Text>
                {primaryCategory}
                :
              </Text>
              <Text style={{ fontWeight: '300' }}>{secondaryCategory}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              {duration ? <Text>{durationString}</Text> : <Text /> }
            </View>
          </View>
          <View style={localStyles.rowView}>
            <View style={localStyles.picturesView}>
              {rows.map(item => (
                <Image
                  key={item.type}
                  source={icons[item.type]}
                  style={localStyles.sideImages}
                />
              ))}
            </View>
            <View style={localStyles.labelsView}>
              {rows.map((item, index) => (
                <View
                  style={[localStyles.rowStyle, index === rows.length - 1 && { borderBottomWidth: 0 }]}
                  key={item.type}
                >
                  {item.type === 'phone'
                    ? (
                      <TextInputMask
                        onPress={this.callPhoneNumber}
                        editable={false}
                        value={item.label}
                        type={inputs.phone.type}
                        options={{
                          mask: inputs[item.type].mask,
                        }}
                        style={{ color: Platform.OS === 'android' ? colors.textMainColor : 'black' }}
                      />
                    )
                    : <Text style={{ paddingHorizontal: 4 }}>{item.label}</Text>
                  }
                  <TouchableOpacity
                    disabled={item.type === 'location' || item.type === 'money'}
                    onPress={() => this.callPhoneNumber(index)}
                    style={{ position: 'absolute', height: 50, width: width['100'] * 0.7 }}
                  />
                </View>
              ))}
            </View>
          </View>
        </View>
        <GigsReview
          gig_
          id={detailsData && detailsData.id}
          reviews={detailsData && detailsData.reviews}
          id={userId}
          gigIDFinance={data.gig.id}
        />
      </View>
    );
  }
}

const localStyles = {
  itemWrapper: {
    width: width['100'] * 0.9,
    paddingHorizontal: 20,
    height: 320,
    backgroundColor: colors.white,
    marginTop: 15,
  },
  pictureRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
    width: width['80'],
  },
  categoryRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    width: '100%',
  },
  rowView: {
    height: 200,
    flexDirection: 'row',
  },
  picturesView: {
    justifyContent: 'space-around',
    width: 40,
    backgroundColor: 'white',
  },
  labelsView: {
    justifyContent: 'space-between',
    flex: 1,
  },
  logo: {
    height: 50,
    width: 50,
  },
  stars: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    marginRight: 5,
  },
  sideImages: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  rowStyle: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    marginLeft: 5,
    marginBottom: 5,
    fontSize: 16,
  },
};

const mapStateToProps = ({ gigs, auth }) => ({
  detailsData: gigs.financeDetails,
  userId: auth.user.id,
});

export default connect(mapStateToProps)(FinanceDetailTransferred);
