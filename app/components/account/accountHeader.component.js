import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  PixelRatio,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import { setUserImage, switchEditing, getAttachment } from '../../store/actions/profile.actions';
import {
  width,
  colors,
  flex,
  icons,
  height,
} from '../../theme/consts.theme';
import ImageLoader from '../../utils/imageLoader.util';

class AccountHeader extends Component {
  componentDidMount() {
    const {
      user,
      employer,
    } = this.props;
    if (!employer) {
      const userData = user.profile;
      const userDataVotes = user.profile.votes;

      const friendless = userData && userDataVotes === undefined && userDataVotes === null
        ? '' : userDataVotes.length > 0
          ? userDataVotes.map(frendless => frendless.friendliness) : [0];
      const professionalism = userData && userDataVotes === undefined
        ? '' : userDataVotes.length > 0
          ? userDataVotes.map(frendless => frendless.professionalism) : [0];
      const punctuality = userData && userDataVotes === undefined && userDataVotes === null
        ? '' : userDataVotes.length > 0
          ? userDataVotes.map(frendless => frendless.punctuality) : [0];
      const reliability = userData && userDataVotes === undefined && userDataVotes === null
        ? '' : userDataVotes.length > 0
          ? userDataVotes.map(frendless => frendless.reliability) : [0];
      const motivation = userData && userDataVotes === undefined && userDataVotes === null
        ? '' : userDataVotes.length > 0
          ? userDataVotes.map(frendless => frendless.friendliness) : [0];

      const friendlessAvg = userData && userDataVotes === undefined && userDataVotes === null
        ? '' : userDataVotes.length > 0
          ? friendless.reduce((a, b) => a + b, 0) / userDataVotes.length : 0;
      const professionalismAvg = userData && userDataVotes === undefined && userDataVotes === null
        ? '' : userDataVotes.length > 0
          ? professionalism.reduce((a, b) => a + b, 0) / userDataVotes.length : 0;
      const punctualityAvg = userData && userDataVotes === undefined && userDataVotes === null
        ? '' : userDataVotes.length > 0
          ? punctuality.reduce((a, b) => a + b, 0) / userDataVotes.length : 0;
      const reliabilityAvg = userData && userDataVotes === undefined && userDataVotes === null
        ? '' : userDataVotes.length > 0
          ? reliability.reduce((a, b) => a + b, 0) / userDataVotes.length : 0;
      const motivationAvg = userData && userDataVotes === undefined && userDataVotes === null
        ? '' : userDataVotes.length > 0
          ? motivation.reduce((a, b) => a + b, 0) / userDataVotes.length : 0;
      const userScore = (friendlessAvg + professionalismAvg + punctualityAvg + reliabilityAvg + motivationAvg) / 5;
      this.setState({ userScoreState: userScore });
    }
  }

  calcAverage = (arrayAverage) => {
    const {
      user,
      employer,
    } = this.props;
    const userData = user.profile;
    const userDataVotes = user.profile.votes;
    const res = arrayAverage.reduce((a, b) => a + b, 0) / userDataVotes.length;
    return res;
  }

  handleImage = () => {
    const { setUserImage } = this.props;
    ImagePicker.showImagePicker({
      maxWidth: width['100'] * PixelRatio.get() / 4,
      maxHeight: height['100'] * PixelRatio.get() / 4,
      quality: 0.5,
    }, (res) => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
        Alert.alert('Oops...', `ImagePicker Error: ${res.error}`);
      } else {
        const newFormData = new FormData();
        newFormData.append('file', {
          type: 'image/jpg',
          name: res.fileName || 'my photo.JPG',
          ...res,
        });
        setUserImage(newFormData, { ...res });
      }
    });
  };

  render() {
    const {
      user,
      profile,
      employer,
      navigation,
      switchEditing,
    } = this.props;

    const fullStars = [1, 1, 1, 1, 1];
    const uri = employer ? (employer.pictureUri && employer.pictureUri) : profile.user.photo.uri ? profile.user.photo.uri : '';
    const gigsCount = employer && employer.data
      ? employer.data.gigs && employer.data.gigs.filter(item => item.status === 'completed').length
      : user.incomingTransactions && user.incomingTransactions.filter(transaction => transaction.gig.status === 'completed').length;
    const fullName = (employer && employer.data && employer.data.company_name)
      ? employer.data.company_name
      : employer && employer.data
        ? `${employer.data.first_name} ${employer.data.last_name}`
        : user && `${user.first_name ? user.first_name : ''} ${user.last_name ? user.last_name : ''}`;
    const dataMain = employer || user;
    const dataCreator = dataMain === employer ? dataMain.data.profile : dataMain.profile;
    const dataVotes = dataCreator === undefined || dataCreator === null ? '' : dataCreator.votes;

    const friendless = dataCreator === null || dataVotes === undefined
      ? '' : dataVotes.length > 0
        ? dataVotes.map(frendless => frendless.friendliness) : [0];
    const professionalism = dataCreator === null || dataVotes === undefined
      ? '' : dataVotes.length > 0
        ? dataVotes.map(professionalism => professionalism.professionalism) : [0];
    const punctuality = dataCreator === null || dataVotes === undefined
      ? '' : dataVotes.length > 0
        ? dataVotes.map(punctuality => punctuality.punctuality) : [0];
    const reliability = dataCreator === null || dataVotes === undefined
      ? '' : dataVotes.length > 0
        ? dataVotes.map(reliability => reliability.reliability) : [0];
    const motivation = dataCreator === null || dataVotes === undefined
      ? '' : dataVotes.length > 0
        ? dataVotes.map(motivation => motivation.motivation) : [0];

    const friendlessAvg = dataCreator === null || dataVotes === undefined
      ? '' : dataVotes.length > 0
        ? friendless.reduce((a, b) => a + b, 0) / dataVotes.length : 0;
    const professionalismAvg = dataCreator === null || dataVotes === undefined
      ? '' : dataVotes.length > 0
        ? professionalism.reduce((a, b) => a + b, 0) / dataVotes.length : 0;
    const punctualityAvg = dataCreator === null || dataVotes === undefined
      ? '' : dataVotes.length > 0
        ? punctuality.reduce((a, b) => a + b, 0) / dataVotes.length : 0;
    const reliabilityAvg = dataCreator === null || dataVotes === undefined
      ? '' : dataVotes.length > 0
        ? reliability.reduce((a, b) => a + b, 0) / dataVotes.length : 0;
    const motivationAvg = dataCreator === null || dataVotes === undefined
      ? '' : dataVotes.length > 0
        ? motivation.reduce((a, b) => a + b, 0) / dataVotes.length : 0;

    // const friendlessAvg = this.calcAverage(friendless);
    // const professionalismAvg = this.calcAverage(professionalism);
    // const punctualityAvg = this.calcAverage(punctuality);
    // const reliabilityAvg = this.calcAverage(reliability);
    // const motivationAvg = this.calcAverage(motivation);

    const userScore = dataVotes === undefined && !employer ? this.state.userScoreState : (
      friendlessAvg + professionalismAvg + punctualityAvg + reliabilityAvg + motivationAvg
    ) / 5;
    return (
      <View style={styles.container}>
        <View style={styles.topView}>
          <View style={styles.leftView}>
            <Text style={[styles.topViewTexts]}>
              {
                userScore && userScore.toFixed(1)
              }
            </Text>
          </View>
          <View style={styles.rightView}>
            <Text style={[styles.topViewTexts, { right: width['14'] }]}>{gigsCount}</Text>
          </View>
        </View>
        <View style={styles.bottomView}>
          <View style={styles.leftView}>
            <TouchableOpacity
              disabled={employer}
              onPress={() => navigation.navigate('reviews')}
              style={styles.bottomViewTextTouch}
            >
              {fullStars.map((item, index) => (
                <Image
                  key={index.toString()}
                  style={styles.stars}
                  source={userScore >= index && userScore - index >= 1
                    ? icons.fullStar : userScore > index && userScore - index > 0.49
                      ? icons.halfStar
                      : icons.emptyStar}
                />
              ))}
            </TouchableOpacity>
          </View>
          <View style={styles.rightView}>
            <Text style={[styles.bottomViewText]}>{employer ? 'GIG POSTED' : 'GIGS COMPLETED'}</Text>
          </View>
          {!employer && (
            <TouchableOpacity
              onPress={() => switchEditing()}
              style={[styles.squareButton]}
            >
              <Image
                source={!profile.edit ? icons.settingsActive : icons.settingsNotActive}
                style={{ resizeMode: 'stretch', height: 36, width: 36,marginRight:15 }}
              />
            </TouchableOpacity>
          )}
          {/* { profile.edit ? <View /> : !employer && (
              <TouchableOpacity
                onPress={() => navigation.navigate('reviews')}
                style={[styles.squareButtonLeft]}
              >
                <Image
                  source={icons.reviewsButton}
                  style={{ resizeMode: 'stretch', height: 36, width: 36 }}
                />
              </TouchableOpacity>
            )} */}
        </View>
        <View style={styles.imageView}>
          <ImageLoader
            key="image"
            style={styles.image}
            source={uri || ''}
          />
          {!profile.imagePicked && profile.edit
                        && (
                        <TouchableOpacity
                          onPress={this.handleImage}
                          style={{ position: 'absolute', bottom: 76 }}
                        >
                          <Text
                            style={styles.editImage}
                          >
                                +
                          </Text>
                        </TouchableOpacity>
                        )
                    }
          <View />
          <View />
          <Text
            style={styles.nameText}
            numberOfLines={2}
          >
            {fullName}
          </Text>

        </View>
        {employer && (
          <TouchableOpacity
            style={styles.arrowBack}
            onPress={() => navigation.goBack()}
            hitSlop={{
              top: 10, bottom: 10, left: 10, right: 10,
            }}
          >
            <Image
              style={styles.arrowImage}
              source={icons.arrowBack}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = {
  container: {
    width: width['100'],
    height: 260,
    alignItems: 'center',
  },
  topView: {
    flex: 1,
    width: width['100'],
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: colors.lightGrey,
  },
  topViewTexts: {
    position: 'absolute',
    bottom: 10,
    fontSize: 24,
  },
  bottomView: {
    flex: 1,
    width: width['100'],
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  bottomViewText: {
    position: 'absolute',
    top: 10,
    fontSize: 12,
    flexDirection: 'row',
  },
  bottomViewTextTouch: {
    position: 'absolute',
    top: 10,
    flexDirection: 'row',
  },
  leftView: {
    position: 'absolute',
    left: 0,
    width: width['33'],
    alignItems: 'center',
    height: 130,
  },
  rightView: {
    position: 'absolute',
    right: 0,
    width: width['33'],
    alignItems: 'center',
    height: 130,
  },
  imageView: {
    position: 'absolute',
    height: 260,
    width: width['34'],
    ...flex.centered,
  },
  image: {
    width: width['34'],
    height: width['34'],
  },
  editImage: {
    fontSize: 90,
    color: colors.inputsGrey,

  },
  nameText: {
    position: 'absolute',
    fontSize: 20,
    bottom: 0,
    textAlign: 'center',
  },
  squareButton: {
    height: 90,
    width: 80,
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderRadius: 5,
    display:'flex',
    justifyContent:'flex-end',
    alignItems:'flex-end'
  },
  squareButtonLeft: {
    height: 36,
    width: 36,
    position: 'absolute',
    left: 15,
    bottom: 0,
    borderRadius: 5,
  },
  stars: {
    height: 13,
    width: 13,
    resizeMode: 'stretch',
    marginHorizontal: 2,
  },
  arrowBack: {
    position: 'absolute',
    top: 57,
    left: width['100'] * 0.05,
  },
  arrowImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
};

const mapStateToProps = ({ auth, profile }) => ({
  user: auth.user,
  profile,
});

export default connect(mapStateToProps,
  { setUserImage, switchEditing, getAttachment })(AccountHeader);
