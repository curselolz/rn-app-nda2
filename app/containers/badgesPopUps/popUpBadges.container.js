import React, { Component } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import { icons, width, height } from '../../theme/consts.theme';

class PopUpBadges extends Component {
    state = {
      a: new Animated.Value(0),
    }

    componentDidMount() {
      this.wholeAnimation();
    }

    scaleUp = () => {
      Animated.timing(this.state.a, {
        toValue: 3,
        duration: 500,
      }).start(() => {
        Animated.timing(this.state.a, {
          toValue: 2.5,
          duration: 200,
        }).start();
      });
    }

    wholeAnimation = () => {
      setTimeout(this.scaleUp, 1500);
      setTimeout(this.scaleDown, 4000);
    }

    scaleDown =() => {
      Animated.timing(this.state.a, {
        toValue: 0,
        duration: 300,
      }).start(() => {
        this.props.action();
      });
    }

    render() {
      const scale = {
        transform: [
          {
            scale: this.state.a,
          },
        ],
      };


      const image = this.props.image;
      return (
      //   <View style={{
      //   position: 'relative', width: width['100'], height: height['100'], opacity: 0,
      // }}
      // >
        <Animated.Image
          source={image}
          style={[styles.image, scale]}
        />
      // </View>
      );
    }
}

const styles = {
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    position: 'absolute',
    top: '30%',
    left: '40%',
  },
};

export default PopUpBadges;
