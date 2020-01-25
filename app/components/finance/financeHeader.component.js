import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { width, colors } from '../../theme/consts.theme';

class FinanceHeader extends Component {
  render() {
    const { sumTotalEarnings, sumPendingTransactions } = this.props;

    return (
          <View style={[localStyles.container]}>
              <Image style={localStyles.backImage} source={require('../../theme/images/headerBack.png')} />
              <Text style={localStyles.title}>Total Earnings</Text>
              <View>
                  <Text style={{
                      color: colors.white,
                      fontSize: 30,
                      textAlign: 'right',
                    }}
                    >
                      {`$${sumTotalEarnings ? sumTotalEarnings.toFixed(2) : '0.00'}`}
                    </Text>
                  <Text style={localStyles.title}>
                      {`$${sumPendingTransactions ? sumPendingTransactions.toFixed(2) : '0.00'} in progress`}
                    </Text>
                </View>
            </View>
    );
  }
}

const localStyles = {
  container: {
    width: width['100'],
    height: 120,
    backgroundColor: colors.white,
    padding: width['5'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.white,
    fontSize: 14,
    paddingLeft: 3,
    fontWeight: '300',
  },
  backImage: {
    position: 'absolute',
    resizeMode: 'cover',
    width: width['100'],
    height: 120,
    left: 0,
    top: 0,
  },

};

const mapStateToProps = state => ({

});

export default connect(
  mapStateToProps, {},
)(FinanceHeader);
