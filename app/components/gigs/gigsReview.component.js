import React, { PureComponent } from 'react';
import {
  View, Text, TouchableOpacity, Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { addReview, getGigById, getGigByIdTransaction } from '../../store/actions/gigs.actions';
import {
  width,
  colors,
  shadows,
  flex,
} from '../../theme/consts.theme';
import StarView from '../../containers/layout/starsReitingView.container';
import Input from '../../containers/layout/input.container';

class GigsReview extends PureComponent {
    state = {
      stars: 0,
    }

    componentWillMount() {
      const {
        getGigById,
        getGigByIdTransaction,
        gig_id,
        gigIDFinance,
      } = this.props;
      const id = gigIDFinance || gig_id;
      gigIDFinance ? getGigByIdTransaction(id, true) : getGigById(id, true);
      // getGigByIdTransaction(id, true);
    }

    sendReview = () => {
      const { stars, description } = this.state;
      const {
        addReview,
        getGigById,
        gigIDFinance,
      } = this.props;
      let { gig_id } = this.props;
      gig_id = gigIDFinance || gig_id;
      if (!stars) {
        return Alert.alert('Oops...',
          'Please select rating!',
          [{
            text: 'OK',
          }]);
      }
      const data = {
        gig_id,
        stars,
        description,
      };
      addReview(data, () => {
        gigIDFinance ? getGigByIdTransaction(gig_id, true) : getGigById(gig_id, true);
      });
    }

    render() {
      const { reviews, id } = this.props;
      let myReview = null;

      if (reviews) {
        reviews && reviews.map((item) => {
          if (item.from_user_id === id) {
            myReview = item;
          }
        });
      }
      if (!reviews) {
        return <View />;
      }

      return (
        <View style={localStyles.container}>
          <Text style={localStyles.title}>{myReview ? 'MY REVIEW' : 'LEAVE A REVIEW'}</Text>
          <View style={this.props.gigIDFinance ? localStyles.whiteWrapperWithoutFlex : localStyles.whiteWrapper}>
            <StarView
                ref="starsView"
                value={myReview ? myReview.stars : this.state.stars}
                action={value => this.setState({ stars: value })}
              />
            <Text style={localStyles.scoreText}>{`${myReview ? myReview.stars : this.state.stars}.0`}</Text>
            {myReview
                ? <Text style={localStyles.description}>{myReview.description}</Text>
                : (
                  <Input
                    type="review"
                    multiline
                    notWide
                    callbackChange={value => this.setState({ description: value })}
                  />
                )}
            <View style={localStyles.bottomView}>
                {!myReview
                          && (
                          <TouchableOpacity
                            style={[localStyles.submitButton, shadows.default]}
                            onPress={this.sendReview}
                          >
                            <Text style={{ color: colors.pink }}>SUBMIT</Text>
                          </TouchableOpacity>
                          )}
              </View>
          </View>
        </View>
      );
    }
}

const localStyles = {
  container: {
    // height: height['100'] / 2,
    width: width['100'] * 0.9,
    marginVertical: 30,
  },
  title: {
    padding: 20,
    fontSize: 18,
  },
  whiteWrapper: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
  },
  whiteWrapperWithoutFlex: {
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  scoreText: {
    position: 'absolute',
    top: 20,
    right: 30,
    fontSize: 18,
    fontWeight: '500',
  },
  bottomView: {
    flex: 1,
    ...flex.centered,
  },
  submitButton: {
    width: 150,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.white,
    ...flex.centered,
    marginVertical: 20,
  },
  description: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
};


export default connect(
  null, { addReview, getGigById, getGigByIdTransaction },
)(GigsReview);
