import React, { Component } from 'react';
import {
  TouchableOpacity, NativeModules, LayoutAnimation, Image, Text, View,
} from 'react-native';
import {
  width, icons, flex, colors,
} from '../../theme/consts.theme';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental
    && UIManager.setLayoutAnimationEnabledExperimental(true);


export default class DropDownContent extends Component {
    state = {
      animation: 40,
      closed: true,
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps !== this.props && !nextProps.active) {
        this.setState({ closed: !nextProps.active }, () => {
          this.closingAnimation();
        });
      }
    }

    openDropDown = () => {
      this.props.action();
      this.setState({ closed: false });
      this.openAnimation();
    }

    openAnimation = () => {
      LayoutAnimation.spring();
      this.setState({ animation: null });
    }

    closingAnimation = () => {
      LayoutAnimation.linear();
      this.setState({ animation: 40 });
    }

    render() {
      const { animation, closed } = this.state;
      const { active, title } = this.props;
      const height = { height: animation };

      return (
        <View
            style={[styles.container, height]}
          >
            <TouchableOpacity
                key="mainButton"
                style={[styles.container,
                    { backgroundColor: active ? colors.pink : colors.grey },
                    { ...flex.centered }]}
                disabled={!closed}
                onPress={() => {
                    this.openDropDown();
                  }
                    }
              >
                <Text style={{ color: colors.white, fontWeight: 'bold' }}>
                    {title}
                  </Text>
                {closed && (
                  <Image
  source={icons.arrowDown}
  style={styles.arrow}
/>
                  )}
              </TouchableOpacity>
            {
                    !closed && this.props.children
                }
          </View>

      );
    }
}

const styles = {
  container: {
    width: width['80'],
    height: 40,
    alignItems: 'center',
  },
  arrow: {
    position: 'absolute',
    right: 15,
    height: 10,
    width: 10,
    resizeMode: 'contain',
  },
};
