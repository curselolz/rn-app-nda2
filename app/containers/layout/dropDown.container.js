import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TouchableOpacity, NativeModules, LayoutAnimation, Image, Text, View,
} from 'react-native';
import { selectFiltration } from '../../store/actions/gigs.actions';
import {
  width, icons, flex, colors,
} from '../../theme/consts.theme';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental
    && UIManager.setLayoutAnimationEnabledExperimental(true);


class DropDown extends Component {
    state = {
      animation: 40,
      closed: true,
      selected: null,
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps !== this.props && !nextProps.active) {
        this.setState({ closed: !nextProps.active, selected: null }, () => {
          this.closingAnimation();
        });
      }
    }

    openDropDown = () => {
      this.props.action();
      this.setState({ closed: false });
      this.openAnimation();
    }

    selectRow = (selected) => {
      this.setState({ selected, closed: true });
      this.props.selectFiltration(selected);
      this.closingAnimation();
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
      const { selected, animation, closed } = this.state;


      const { active, types, title } = this.props;


      const height = { height: animation };
      return (
        <View
          style={[styles.container, styles.borders, height]}
        >
          <TouchableOpacity
            key="mainButton"
            style={[styles.container,
              { backgroundColor: active ? colors.pink : colors.grey },
              { ...flex.centered }]}
            disabled={!closed}
            onPress={this.openDropDown}
          >
            <Text style={{ color: colors.white, fontWeight: 'bold' }}>
              {selected ? selected.toUpperCase() : title}
            </Text>
            {closed && (
              <Image
                source={icons.arrowDown}
                style={styles.arrow}
              />
            )}
          </TouchableOpacity>
          {
                    !closed && (
                    <View>
                      {types.map((item, index) => (
                        <TouchableOpacity
                          key={index.toString()}
                          style={[styles.container, styles.rows, index === types.length - 1 && { borderBottomWidth: 0 }]}
                          onPress={() => this.selectRow(item.value)}
                        >
                          <Text>{item.label.toUpperCase()}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                    )

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
  borders: {
    borderWidth: 1,
    borderColor: colors.grey,
  },
  arrow: {
    position: 'absolute',
    right: 15,
    height: 10,
    width: 10,
    resizeMode: 'contain',
  },
  rows: {
    borderBottomWidth: 1,
    borderColor: colors.grey,
    width: width['100'] * 0.7,
    ...flex.centered,
  },
};


const mapStateToProps = state => ({

});

export default connect(
  mapStateToProps, { selectFiltration },
)(DropDown);
