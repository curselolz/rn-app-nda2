import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native'
import { width, colors } from '../../theme/consts.theme';
import ReviewItem from '../employer/reviewItem.component';
import Header from '../../containers/layout/header.container';



class EmployeeReviewsScreen extends Component {
    render() {
        const { data } = this.props;
        console.log(data)
        return (
            <View>
                <Header
                    title='Reviews'
                    navigation={this.props.navigation}
                    backButton
                />
                <ScrollView
                    style={{ marginBottom: 100}}
                >
                    <View style={styles.reviewsContainer}>
                        {data && data.map((item, index) =>
                            <ReviewItem
                                key={index.toString()}
                                data={item}
                            />
                        )}
                    </View>
                </ScrollView>

            </View>
        );
    }
}

const styles = {
    description: {
        padding: width['100'] * 0.05,
        width: width['100'],
        backgroundColor: colors.white
    },
    title: {
        fontSize: 18,
        color: colors.grey,
        marginLeft: width['5'],
        marginVertical: 20
    },
    reviewsContainer: {
        padding: width['5']
    }
}

const mapStateToProps = ({ auth }) => ({
    data: auth.user.reviews
})

export default connect(
    mapStateToProps,
)(EmployeeReviewsScreen);
