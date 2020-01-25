import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, { PureComponent } from 'react';
import { View, Text,AsyncStorage } from 'react-native';
import { width, flex, colors } from '../../theme/consts.theme';
import CustomMarker from '../../utils/markerStyle';
// import AsyncStorage from '@react-native-community/async-storage';

class GigVSFiatSlider extends PureComponent {
  state = {
    sliderOneChanging: false,
    sliderOneValue: [10],
  };

  componentDidMount() {
    this.getAsyncValues();
  }

  async setAsyncValue() {
    try {
      await AsyncStorage.setItem('sliderOneValue', JSON.stringify(this.state.sliderOneValue));
    } catch (e) {
      console.log('err while saving slider value',e);
    }
  }

    sliderOneValuesChange = (values) => {
      let newValues = [0];
      newValues[0] = values[0];
      this.setState({
        sliderOneValue: newValues,
      });
    }

    sliderOneValuesChangeStart = () => {
      this.setState({
        sliderOneChanging: true,
      });
    }

    sliderOneValuesChangeFinish = () => {
      this.setState({ sliderOneChanging: false }, () => {
        if (!this.state.sliderOneChanging) {
          this.setAsyncValue();
        }
      });
    }

    getAsyncValues = async () => {
      try {
        const value = await AsyncStorage.getItem('sliderOneValue');
        if(value !== null) {
          this.setState({ sliderOneValue: JSON.parse(value) });
        }
      } catch(e) {
        console.log('error reading slider value',e);
      }
    }

    render() {
      const { sliderOneValue } = this.state;
      const gigsString = `GIGKOINS ${100 - sliderOneValue[0] * 10}%`;
      const fiatString = `$USD ${sliderOneValue[0] * 10}%`;
      return (
        <View style={styles.sliderWrapper}>
          <View style={styles.valuesWrapper}>
            <Text>{gigsString}</Text>
            <Text>{fiatString}</Text>
          </View>
          <MultiSlider
            selectedStyle={{
              backgroundColor: colors.pink,
            }}
            customMarker={CustomMarker}
            values={sliderOneValue}
            sliderLength={width['100'] * 0.9}
            onValuesChangeStart={this.sliderOneValuesChangeStart}
            onValuesChange={this.sliderOneValuesChange}
            onValuesChangeFinish={this.sliderOneValuesChangeFinish}
          />
        </View>
      );
    }
}

const styles = {
  sliderWrapper: {
    alignItems: 'center',
    paddingTop: 30,
  },
  valuesWrapper: {
    width: width['100'] * 0.9,
    ...flex.horizontal,
    ...flex.remote,
    marginVertical: 0
  },
  greyText: {
    color: colors.lightGrey,
  },
};

export default GigVSFiatSlider;
