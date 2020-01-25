import React, { PureComponent } from 'react';
import {
  View, Text, TouchableOpacity, Image, Linking, Platform, TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { TextInputMask } from 'react-native-masked-text';
import { fillGigDetailsScreen } from '../../store/actions/gigs.actions';
import { colors, width, icons } from '../../theme/consts.theme';
import { getTimeString, getDuration } from '../../utils/time.util';
import { inputs } from '../../utils/inputs.util';
import ImageLoader from '../../utils/imageLoader.util';
import { capitalizeString } from '../../utils/string.util';


class AppliedItem extends PureComponent {
    navigateToEmployerDetails = () => {
      const { uri } = this.refs.imageLoader.state;
      const { data } = this.props;
      this.props.navigation.navigate('employerDetails', {
        data: data.creator,
        pictureUri: uri,
      });
    }

    callPhoneNumber = (index) => {
      const { data } = this.props;


      const phone = data && data.creator && data.creator.profile.phone;


      const email = data && data.creator && data.creator.email;
      if (index === 1) {
        Linking.openURL(`tel:${phone}`);
      } else {
        const url = `mailto:${email}`;
        Linking.openURL(url);
      }
    }

    render() {
      const { data } = this.props;
      const primaryCategory = data.primary_category && data.primary_category.toUpperCase() || '';


      const secondaryCategory = data.secondary_category && data.secondary_category.toUpperCase() || '';


      const startTime = data.start_time && getTimeString(data.start_time) || '';


      const duration = data.end_time && getDuration(data.start_time, data.end_time) || '';


      const durationString = duration ? (`${Math.floor(duration / 60)}h:${duration % 60}m`) : '';
      totalPrice = data.primary_category && (getDuration(data.start_time, data.end_time) * data.hour_price) / 100,
      priceLabel = data.primary_category && data.primary_category === 'peer2peer'
        ? `$${data.contract_price / 100}`
        : data.primary_category && `$${data.hour_price / 100}/Hr`,
      stars = [1, 1, 1, 1, 1],
      creatorName = data.creator
      && (data.creator.company_name && capitalizeString(data.creator.company_name)
     || `${data.creator.first_name && capitalizeString(data.creator.first_name)} ${data.creator.last_name && capitalizeString(data.creator.last_name[0])}.` || ''),

      rows = [{ type: 'location', label: data && data.address.replace(' ,', '') },
        { type: 'phone', label: data && data.creator && data.creator.profile.phone },
        { type: 'email', label: data && data.creator && data.creator.email },
        { type: 'money', label: priceLabel }];
      const dataCreator = data.creator;
      const dataVotes = data.creator.profile.votes === undefined ? [0] : data.creator.profile.votes;

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
      return (
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
                  id={data.creator && data.creator.profile && data.creator.profile.avatar_id}
                />
              </TouchableOpacity>
              <View style={{ flex: 1, marginLeft: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text
                    style={[localStyles.title, { width: width['100'] / 2 - 35, maxHeight: 40 }]}
                    numberOfLines={2}
                  >
                    {creatorName}
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: '700' }}>{data.identifier}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{
                    flexDirection: 'row', width: 90, flex: 1, paddingLeft: 3,
                  }}
                  >
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
                  </View>
                  <Text>{startTime}</Text>
                </View>
              </View>
            </View>

          </View>
          <View style={localStyles.categoryRowView}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: '700' }}>
                {primaryCategory}
:
                {' '}
              </Text>
              <Text style={{ fontWeight: '300' }}>{secondaryCategory}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              {duration ? <Text>{durationString}</Text> : <Text />}
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
      );
    }
}

const localStyles = {
  itemWrapper: {
    width: width['100'] * 0.9,
    paddingHorizontal: 20,
    height: 320,
    backgroundColor: colors.white,
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
    paddingTop: 10,
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

const mapStateToProps = state => ({

});

export default connect(
  mapStateToProps, { fillGigDetailsScreen },
)(AppliedItem);
