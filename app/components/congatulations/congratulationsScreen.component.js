import React, { PureComponent } from 'react';
import {
  View, Image, TouchableOpacity, Text,
} from 'react-native';
import { connect } from 'react-redux';
import { height, width } from '../../theme/consts.theme';

function mapStateToProps(state) {
  return {

  };
}

class CongratulationsScreen extends PureComponent {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('main')}
      >
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require('../../theme/images/congatulationsBck.png')}
          />
          <Text style={styles.topText}>
                CONGRATULATIONS!
          </Text>
          <Text style={styles.bottomText}>
                CLICK ANYWHERE TO CLOSE THIS SCREEN
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  container: {
    height: height['100'],
    width: width['100'],
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    resizeMode: 'cover',
    position: 'absolute',
    height: height['100'],
    width: width['100'],
    top: 0,
    left: 0,
  },
  topText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 100,
    color: '#fff',
  },
  bottomText: {
    fontSize: 14,
    marginBottom: 50,
    color: '#fff',
    textAlign: 'center',
  },
};

export default connect(
  mapStateToProps,
)(CongratulationsScreen);
