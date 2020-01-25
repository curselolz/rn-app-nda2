import React, { PureComponent } from 'react';
import { View, Animated } from 'react-native';
import { styles } from '../../utils/styles.util';

class Loader extends PureComponent {
    state = {
      animation: new Animated.Value(1),
    }

    componentWillMount() {
      this.pulsing();
    }

    pulsing = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(this.state.animation, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(this.state.animation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }

    render() {
      const scale = {
        transform: [
          {
            scale: this.state.animation,
          },
        ],
      };
      return (
        <View style={[styles.containerCenterHorizontal, styles.fillAll]}>
          <Animated.Image
            style={[styles.imageContain, scale]}
            source={require('../../theme/images/logo.png')}
          />
        </View>
      );
    }
}

export default Loader;
