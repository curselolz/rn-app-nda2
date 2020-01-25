import React, { PureComponent, Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors, width, icons } from '../../theme/consts.theme';
import { getFullData } from '../../utils/time.util';
import ImageLoader from '../../utils/imageLoader.util';
class TransactionsCell extends PureComponent {
// class TransactionsCell extends PureComponent {
  render() {
    const { index, data, navigation } = this.props;
    const payout = data.payout_amount && data.payout_amount / 100 || data.gig.total_price && data.gig.total_price / 100 * 0.88;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('FinanceDetail',{ data, status: data.gig.status})}
      >
        <View
          style={[
            localStyles.rowView,
            index % 2 === 1 && { backgroundColor: colors.white }
          ]}
          key={index.toString()}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ImageLoader
              id={data.employer.profile.avatar_id}
              style={localStyles.rowImage}
            />
            <View style={localStyles.middleView}>
              <Text style={[{ fontSize: 10, color: colors.grey }]}>{getFullData(data.charge_created)}</Text>
              <Text style={[{ fontSize: 15, marginTop: 8 }]}>{data && data.gig.primary_category.toUpperCase()}</Text>
              <Text style={[{ fontSize: 12, fontWeight: '300' }]}>{data && data.gig.secondary_category.toUpperCase()}</Text>
              <Text
                style={[{ fontSize: 16, marginTop: 7 ,width: width['100'] / 2}]}
                numberOfLines={1}
              >{data.employer.company_name || `${data.employer.first_name || ''} ${data.employer.last_name || ''}`}</Text>
            </View>
          </View>
          <View>
            <Text
              style={[
                localStyles.alignRight,
                {
                  color: data.gig.status === 'completed'
                  ? colors.pink
                  : data.gig.status === 'in_progress'
                    ? colors.grey
                    : colors.red, fontSize: 11
              }
            ]}
          >
            {data.gig.status === 'completed' ? 'Transferred' : data.gig.status === 'in_progress' ?  'Pending' : 'Canceled' }
            </Text>
            <Text style={[localStyles.alignRight, { fontSize: 16, marginTop: 5 }]}>
              ${payout ? payout.toFixed(2) : 0}
            </Text>
            <Text style={{ fontSize: 12, textAlign: "right" }}>0 Gigkoins</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const localStyles = {
  rowView: {
    backgroundColor: colors.lightGrey,
    height: 100,
    width: width['100'],
    padding: width['5'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowImage: {
    height: 55,
    width: 55,
  },
  middleView: {
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  alignRight: {
    textAlign: 'right',
    fontWeight: '500',
  },
};

export default TransactionsCell;
