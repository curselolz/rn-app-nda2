import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FinanceDetailPending from './financeDetailPending.component';
import FinanceDetailTransferred from './financeDetailTransferred.component';


const FinanceDetail = ({ navigation }) => {
  const { data } = navigation.state.params;
  let status = '';
  let returnComponent;
  if (data.gig.status === 'completed') {
    status = 'Transferred';
  } else if (data.gig.status === 'archive') {
    status = 'Canceled';
  } else {
    status = 'Pending';
  }

  if (status === 'Transferred') {
    returnComponent = <FinanceDetailTransferred navigation={navigation} data={data} />;
  } else {
    returnComponent = <FinanceDetailPending navigation={navigation} data={data} />;
  }
  return (
    <KeyboardAwareScrollView>
      { returnComponent }
    </KeyboardAwareScrollView>
  );
};

export default FinanceDetail;
