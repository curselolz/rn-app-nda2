import React, { PureComponent } from 'react';
import {
  View,
  ScrollView,
  Platform,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { colors, width } from '../../theme/consts.theme';
import FinanceHeader from './financeHeader.component';
import { styles } from '../../utils/styles.util';
import TransactionsCell from './transactionsCell.component';

class FinanceScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sumTotalEarnings: 0,
      sumPendingTransactions: 0,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (this.props !== nextProps) {
      return {
        sumTotalEarnings: computeTotalEarnings(nextProps.transactions),
        sumPendingTransactions: computePendingTransactions(nextProps.transactions),
      };
    }

    return null;
  }


  render() {
    const { transactions, navigation } = this.props;
    const { sumTotalEarnings, sumPendingTransactions } = this.state;

    return (
      <View style={[styles.containerCenterHorizontal, styles.fillAll]}>
        <FinanceHeader sumTotalEarnings={sumTotalEarnings} sumPendingTransactions={sumPendingTransactions} />
        <ScrollView
          style={{ marginBottom: Platform.OS === 'android' ? 70 : 50 }}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {transactions && transactions.length ? transactions.map((item, index) => (
            <TransactionsCell
              key={index.toString()}
              data={item}
              index={index}
              navigation={navigation}
            />
          ))
            : <Text style={[localStyles.title, { width: width['100'] * 0.9, textAlign: 'center' }]}>NO ACTIVE TRANSACTIONS YET</Text>
          }
        </ScrollView>
      </View>
    );
  }
}

const localStyles = {
  title: {
    fontSize: 20,
    color: colors.grey,
    marginVertical: 20,
  },
};

// from transactionsCell.component.js:
//  {data.gig.status === 'completed' ? 'Transferred' : data.gig.status === 'in_progress' ?  'Pending' : 'Canceled' }
computeTotalEarnings = (transactions) => {
  let sumTotalEarnings = 0;
  transactions && transactions.forEach((transaction) => {
    if (transaction.gig.status === 'completed') {
      const payout = transaction.payout_amount 
                     && (transaction.payout_amount / 100)
                     || (transaction.gig.total_price) 
                     && (transaction.gig.total_price / 100 * 0.88);

      sumTotalEarnings += payout;
    }
  });
  return sumTotalEarnings;
};

computePendingTransactions = (transactions) => {
  let sumPendingTransactions = 0;
  transactions && transactions.forEach((transaction) => {
    if (transaction.gig.status === 'in_progress') {
      const payout = transaction.payout_amount 
                     && (transaction.payout_amount / 100)
                     || (transaction.gig.total_price) 
                     && (transaction.gig.total_price / 100 * 0.88);

      sumPendingTransactions += payout;
    }
  });
  return sumPendingTransactions;
};

const mapStateToProps = ({ finance }) => ({
  transactions: finance.transactions,
});

export default connect(mapStateToProps)(FinanceScreen);
