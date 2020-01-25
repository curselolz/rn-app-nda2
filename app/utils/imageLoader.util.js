import React, { PureComponent } from 'react';
import { Animated, Image, View } from 'react-native';
import { getPictureUri } from './getPictureUri.util';
import { colors } from '../theme/consts.theme';

class ImageLoader extends PureComponent {
    state = {
      animation: new Animated.Value(0.5),
      uri: this.props.source,
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.source !== nextProps.source) {
        this.setState({ uri: nextProps.source });
      }
    }

    componentWillMount() {
      const { id } = this.props;
      if (id) {
        // this.startLoading()
        getPictureUri(id, uri => this.setState({
          ...this.state,
          uri,
        }));
      }
    }

    unBlur = () => {
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }

    startLoading = () => {
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }

    render() {
      const { style } = this.props;


      const { uri, animation } = this.state;
      const opacity = {
        opacity: animation,
      };
      return (
        <View style={[style, { borderRadius: style.width / 2 }, styles.container]}>
          <Image
            style={[style, styles.image, { borderRadius: style.width / 2 }]}
            source={uri ? { uri } : require('../theme/images/menu-04.png')}
            onLoadEnd={this.unBlur}
            onLoadStart={this.startLoading}
          />
          <Animated.View
            style={[style, styles.blurView, { borderRadius: style.width / 2 }, opacity]}
          />
        </View>
      );
    }
}

const styles = {
  container: {
    backgroundColor: 'white',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.grey,
  },
  image: {
    resizeMode: 'cover',
  },
};

export default ImageLoader;
