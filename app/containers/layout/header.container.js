import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { width, icons, colors } from '../../theme/consts.theme';
import { fillGigDetailsScreen } from '../../store/actions/gigs.actions';

class HeaderComponent extends PureComponent {
    goBack = () => {
      const { navigation, goBack } = this.props;
      if (goBack) {
        goBack();
      } else {
        navigation.goBack();
      }
    }

    render() {
      const { title, backButton, loading } = this.props;
      return (
        <View style={styles.container}>
          {
            title && <Text style={styles.title}>{title}</Text>
          }

          {
            backButton
            && (
              <TouchableOpacity
                disabled={loading && loading.spinnerVisible}
                style={styles.arrowBack}
                onPress={this.goBack}
                hitSlop={{
                  top: 10,
                  bottom: 10,
                  left: 10,
                  right: 10,
                }}
              >
                <Image
                  style={styles.arrowImage}
                  source={icons.arrowBack}
                />
              </TouchableOpacity>
            )
          }
        </View>
      );
    }
}

const styles = {
  container: {
    flexDirection: 'row',
    height: 100,
    justifyContent: 'center',
    width: width['100'],
    backgroundColor: colors.lightGrey,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 60,
  },
  arrowBack: {
    position: 'absolute',
    top: 57,
    left: width['100'] * 0.05,
  },
  arrowImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
};

const mapStateToProps = ({ layout }) => ({
  loading: layout,
});

export default connect(
  mapStateToProps, { fillGigDetailsScreen },
)(HeaderComponent);
