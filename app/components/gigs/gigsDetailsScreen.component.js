import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import {
  addOffer,
  getIDOffer,
  removeOffer,
  getGigs,
  getGigById,
} from '../../store/actions/gigs.actions';
import { getUserData } from '../../store/actions/auth.actions';
import FeedItem from './feedItem.component';
import Header from '../../containers/layout/header.container';
import {
  width,
  colors,
  flex,
  shadows,
  height,
} from '../../theme/consts.theme';
import GigsReview from './gigsReview.component';
import RoundedButton from '../../containers/layout/rounderdButton.container';
import AppliedItem from '../schedule/appliedItem.component';
import {getUser} from '../../store/actions/auth.actions';

class GigsDetailsScreen extends PureComponent {
  state = {
    more: false,
  };

  componentWillMount() {
    const { params } = this.props.navigation.state;
    if (params && params.id) {
      getGigById(params.id);
    }
  }

  goBackAndReset = () => {
    this.props.navigation.goBack();
  }

  applyGig = () => {
    const {
      addOffer,
      detailsData,
      getUserData,
      stripe,
    } = this.props;
    if (stripe) {
      addOffer(detailsData.id, () => {
        getUserData(() => this.getGigs(), true);
      });
    } else {
      Alert.alert('Connect Bank Account',
        'You must connect your bank account before you can apply for Gigs. Thank you!',
        [{
          text: 'OK',
        }]);
    }
  }

  unApply = () => {
    const {
      detailsData,
      getUserData,
      removeOffer,
    } = this.props;
    removeOffer(detailsData.offer_id, false, () => {
      getUserData(() => this.getGigs(), true);
    });
  }

  getGigs = () => {
    this.props.navigation.pop();
    this.props.getGigs();
  }

  render() {
    const {
      returnTo,
      detailsData,
      userId,
      id,
      navigation,
    } = this.props;
    const { completed, applied, description } = detailsData;
    console.log(detailsData)
    if (!detailsData) {
      return <View />;
    }
    return (
      <View>
        <Header
          backButton
          navigation={navigation}
          title="Description"
        />
        <KeyboardAwareScrollView
          extraScrollHeight={150}
          viewIsInsideTabBar
          enableResetScrollToCoords={false}
          style={{ marginBottom: 100 }}
        >
          <View style={localStyles.cardWrapper}>
            {completed && <Text style={localStyles.subTitle}>GIG IS COMPLETED</Text>}
            <View style={[localStyles.card, shadows.default]}>
              <FeedItem
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
              applied ? completed
              && (
              <GigsReview
                gig_
                id={detailsData && detailsData.id}
                reviews={detailsData && detailsData.reviews}
                id={userId}
              />
              )
                : (
                  <View>
                    <RoundedButton
                      action={() => this.applyGig()}
                      label="APPLY"
                    />
                  </View>
                )
            }
            {
              !applied ? completed && <Text>abc</Text> : (
                <RoundedButton
                  action={() => this.unApply()}
                  label="Un-apply"
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
};

const mapStateToProps = ({ gigs, auth, layout }) => ({
  appliedGigs: gigs.appliedGigs,
  returnTo: gigs.returnTo,
  detailsData: gigs.detailsData,
  userId: auth.user.id,
  stripe: auth.user.stripe,
  idOffer: gigs.idOffer,
  loaderVisible: layout.loaderVisible,
});

export default connect(mapStateToProps,
  {
    addOffer,
    getIDOffer,
    removeOffer,
    getUserData,
    getGigs,
    getGigById,
    getUser
  })(GigsDetailsScreen);
