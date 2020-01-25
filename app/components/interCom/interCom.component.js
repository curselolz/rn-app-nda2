import Intercom from 'react-native-intercom';

export const renderIntercom = (user) => {
    Intercom.registerIdentifiedUser({ userId: user.id })
    Intercom.setBottomPadding(80);
    Intercom.displayMessenger();
}
