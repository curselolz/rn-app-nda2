import React, { PureComponent } from 'react';
import { View, Platform } from 'react-native';
import { setAxiosDefaults } from './utils/axios.util';
import MainNavigator from './utils/navigation.util';


const prefix = Platform.OS == 'android' ? 'gigkloudapp://gigkloudapp/' : 'gigkloudapp://';
class App extends PureComponent {

  componentWillMount() {
    setAxiosDefaults()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MainNavigator
          uriPrefix={prefix}
        />
      </View>

    );
  }
}
export default App;
