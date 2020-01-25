import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { width, colors } from '../../theme/consts.theme';
import ReviewItem from './reviewItem.component';

const mapStateToProps = ({ gigs }) => ({
  detailsData: gigs.scheduleDetails,

});

class EmployerReviews extends Component {
  render() {
    const { data } = this.props.data;
    console.log(data);
    console.log('data')
    return (
      <View>
        <Text style={styles.description}>
          {data.profile && data.profile.description}
        </Text>
        <Text style={styles.title}>REVIEWS</Text>
        <View style={styles.reviewsContainer}>
          {data.reviews && data.reviews.map((item, index) => (
            <ReviewItem
                  key={index.toString()}
                  data={item}
                />
          ))}
        </View>
      </View>
    );
  }
}

const styles = {
  description: {
    padding: width['100'] * 0.05,
    width: width['100'],
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 18,
    color: colors.grey,
    marginLeft: width['5'],
    marginVertical: 20,
  },
  reviewsContainer: {
    paddingHorizontal: width['5'],
  },
};

export default connect(
  mapStateToProps,
)(EmployerReviews);
