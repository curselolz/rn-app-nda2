import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  addOffer,
  getGigs,
  getGigById,
  removeOffer,
} from '../../store/actions/gigs.actions';
import { getUserData, fillToken } from '../../store/actions/auth.actions';
import Header from '../../containers/layout/header.container';
import { getIDOffer } from '../../store/actions/gigs.actions';
import {
  width,
  colors,
  flex,
  shadows,
  height,
} from '../../theme/consts.theme';
import GigsReview from '../gigs/gigsReview.component';

import AppliedItem from './appliedItem.component';
import { checkUserToken } from '../../utils/checkToken.util';
import RoundedButton from '../../containers/layout/rounderdButton.container';
import { getDateString, isDateOnFuture } from '../../utils/time.util';
import {getUser} from '../../store/actions/auth.actions';

class ScheduledGigDetails extends PureComponent {
    state = {
      more: false,
    };

    componentWillMount() {
      const { params } = this.props.navigation.state;
      const { getUserData, fillToken, getGigById } = this.props;
      if (params && params.id) {
        checkUserToken(fillToken, getUserData, (err) => {
          if (!err) {
            getGigById(params.id, false);
          } else {
            Alert.alert('Oops...',
              'Please sign in to see your gigs!',
              [{
                text: 'OK',
              }]);
            this.props.navigation.navigate('auth');
          }
        });
      }
    }

    componentDidMount() {
      console.log('mount schedule detail')
      const {
        getIDOffer,
        detailsData,
        userReponse,
      } = this.props;
      getIDOffer(detailsData,userReponse);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.navigation !== this.props.navigation) {
        const { params } = nextProps.navigation.state;
        if (params && params.id) {
          nextProps.getGigById(params.id, false);
        }
      }
    }

    goBackAndReset = () => {
      this.props.navigation.goBack();
    }

    unCompleted = () => {
      const {
        idOffer,
        detailsData,
        getUserData,
        removeOffer,
      } = this.props;
      const startTime = moment().utc().format();
      const userTime = detailsData.start_time;
      const diff = moment(userTime).diff(startTime, 'hours');
      let star = 0;
      if (diff < 24) {
        star = 1;
      } else if (diff < 72) {
        star = 3;
      } else if (diff < 168) {
        star = 4;
      } else {
        star = 0;
      }
      if (star > 0) {
        Alert.alert('Warning', `If you confrim cancellation, you get ${star} review star `,
          [
            {
              text: 'I agree',
              onPress: () => {
                if (idOffer && idOffer !== null && idOffer.length > 0) {
                  if (Array.isArray(idOffer)) {
                    removeOffer(idOffer[0].id, idOffer[0].applied, () => {
                      getUserData(() => this.getGigs(), true);
                    });
                  }
                } else {
                  const {
                    getIDOffer,
                    detailsData,
                    userReponse,
                  } = this.props;
                  getIDOffer(detailsData,userReponse);
                }
              },
            },
            {
              text: 'Cancel', onPress: () => console.log('cancel'),
            },
          ], { cancelable: false });
      } else if (idOffer && idOffer !== null && idOffer.length > 0) {
        if (Array.isArray(idOffer)) {
          removeOffer(idOffer[0].id, idOffer[0].applied, () => {
            getUserData(() => this.getGigs(), true);
          });
        }
      }
    }

    getGigs = () => {
      this.props.navigation.pop();
      this.props.getGigs();
    }

    render() {
      const { detailsData, userId } = this.props;
      console.log(detailsData)
      const { completed, applied, description } = detailsData || {};
      const noteText = 'NOTE: Please ensure that you arrive at the address '
                + 'listed below on the appropriate date and time.  We recommend'
                + ' arriving 15 minutes early.  If you expect to arrive late, '
                + 'please to notify employer immediately.';
      const inProgress = isDateOnFuture(detailsData.start_time);
      if (!detailsData) {
        return (
          <View>
            <Header
              backButton
              navigation={this.props.navigation}
              title="Description"
            />
          </View>
        );
      }
      return (
        <View>
          <Header
            backButton
            navigation={this.props.navigation}
            title="Description"
          />
          {!completed && (
            <View style={localStyles.noteWrapper}>
              <Text style={{
                color: 'white',
                fontWeight: '300',
              }}
              >
                {noteText}
              </Text>
            </View>
          )}
          <KeyboardAwareScrollView
            extraScrollHeight={150}
            viewIsInsideTabBar
            enableResetScrollToCoords={false}
            style={{ marginBottom: completed ? 100 : 200, paddingBottom: 60 }}
          >
            <View style={localStyles.cardWrapper}>
              {completed && <Text style={localStyles.subTitle}>GIG IS COMPLETED</Text>}
              <View style={[localStyles.card, shadows.default]}>
                <AppliedItem
                  data={detailsData}
                  navigation={this.props.navigation}
                />
                {completed ? <View />
                  : (
                    <React.Fragment>
                      <View style={localStyles.greyRow} />
                      <View style={localStyles.descriptionWrapper}>
                        <Text style={!this.state.more && localStyles.text}>
                          {description || 'No description has been added.'}
                        </Text>
                      </View>
                    </React.Fragment>
                  )
                }
              </View>
              {
              !completed && (
              <TouchableOpacity
                hitSlop={{
                  top: 10,
                  bottom: 10,
                  left: 10,
                  right: 10,
                }}
                onPress={() => this.setState({ more: !this.state.more })}
              >
                <Text
                  style={{ color: this.state.more ? colors.grey : colors.pink, marginTop: 10 }}
                >
                  {this.state.more ? 'hide' : 'see more'}
                </Text>
              </TouchableOpacity>
              )
            }
              {
              applied && !completed && inProgress ? (
                <RoundedButton
                  action={() => this.unCompleted()}
                  label="Cancel gig"
                />
              )
                : (
                  <View />
                )
            }
              {
              applied
              && completed
              && (
              <GigsReview
                gig_id={detailsData && detailsData.id}
                reviews={detailsData && detailsData.reviews}
                id={userId}
              />
              )
              }
            </View>
          </KeyboardAwareScrollView>
        </View>
      );
    }
}

const localStyles = {
  cardWrapper: {
    width: width['100'],
    padding: width['5'],
    ...flex.centered,
  },
  descriptionWrapper: {
    padding: 15,
  },
  card: {
    backgroundColor: colors.white,
    padding: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'red',
  },
  greyRow: {
    height: 2,
    backgroundColor: colors.lightGrey,
    width: width['80'],
    alignSelf: 'center',
  },
  applyButton: {
    height: 50,
    width: 150,
    borderRadius: 25,
    backgroundColor: colors.white,
    ...flex.centered,
    marginVertical: 30,
  },
  text: {
    maxHeight: height['100'] * 0.27,
  },
  subTitle: {
    marginBottom: width['5'],
    color: colors.pink,
    fontSize: 18,
    fontWeight: '500',
  },
  noteWrapper: {
    width: width['100'],
    paddingHorizontal: 20,
    backgroundColor: colors.grey,
    height: 100,
    ...flex.centered,
  },
};

const mapStateToProps = ({ gigs, auth }) => ({
  idOffer: gigs.idOffer,
  appliedGigs: gigs.appliedGigs,
  detailsData: gigs.scheduleDetails,
  userId: auth.user.id,
  userReponse: gigs.userResponse,
});

export default connect(mapStateToProps, {
  addOffer,
  getUserData,
  getGigs,
  getGigById,
  fillToken,
  getIDOffer,
  removeOffer,
  getUser,
})(ScheduledGigDetails);
