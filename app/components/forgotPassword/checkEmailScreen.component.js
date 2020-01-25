import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { styles, flexes } from '../../utils/styles.util';
import { colors } from '../../theme/consts.theme';

class CheckEmailScreenForgotPassword extends PureComponent {

    goToEmail = () => {
        Linking.openURL('message://').catch(err => console.error('An error occurred', err));
    }


    render() {
        return (
            <View style={[styles.containerCenterHorizontal, styles.fillAll, {backgroundColor: colors.white}]}>
                <View style={[styles.containerAllCentered, flexes(4.2)]}>
                    <Image
                        source={require('../../theme/images/okImage.png')}
                        style={styles.imageContain}
                    />
                </View>

                <View style={[styles.containerAllCentered, flexes(1.2), { backgroundColor: colors.inputsGrey }]}>
                    <Text style={{ textAlign: 'center' }}>
                        {'PLEASE CHECK YOUR EMAIL \n TO RECOVER YOUR PASSWORD'}
                    </Text>
                    <TouchableOpacity
                        onPress={this.goToEmail}
                    >
                        <Text style={localStyles.signUpText}>
                            GO TO EMAIL
                            </Text>
                    </TouchableOpacity>


                </View>
            </View>

        )
    }
}

const localStyles = {
    signUpText: {
        marginTop: 10,
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.pink
    }
}


export default CheckEmailScreenForgotPassword;