import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text, Linking } from 'react-native';
import { connect } from 'react-redux';
import {recoverPassword} from '../../store/actions/auth.actions';
import { Input, Button } from '../layout';
import { width, colors } from '../../theme/consts.theme';


class RecoverPassForm extends PureComponent {

    handleSignUp = () => {
        this.validate()
            && this.secondaryValidation()
            && this.collectData()
    }

    validate = () => {
        let requiredFields = Object.values(this.refs).filter(field => field.props.required),
            valid = requiredFields.map(field => {
                return !!field.handleValidation()
            });
        valid.includes(false) && alert('Please fill all inputs')
        return !valid.includes(false)
    };

    collectData = () => {
        const {email, secret_key} = this.props.navigationParams
            data = {
                email,
                secret_key,
                password: this.refs.new_password.state.value,
                password_confirmation: this.refs.confirm.state.value
            };

        this.props.recoverPassword(data, (route) => this.props.navigate(route))
    };

    secondaryValidation = () => {
        const { confirm, new_password } = this.refs
        new_password.state.value.length < 8
            ? alert('Password must be minimum 8 digits')
            : confirm.state.value !== new_password.state.value && alert('Passwords did not mach!!!')

        return confirm.state.value === new_password.state.value && new_password.state.value.length > 7
    }

    render() {
        const data = ['new_password', 'confirm']
        return (
            <View style={styles.container}>

            <Text style={styles.title}>RECOVER PASSWORD</Text>
                <View style={styles.centerView}>
                {data.map((item, index) =>
                    <Input
                        key={index.toString()}
                        ref={item}
                        type={item}
                        required
                    />
                )}
                </View>
                <Button
                    action={this.handleSignUp}
                    label='SUBMIT'
                    upperCase
                    active
                />

            </View>
        );
    }
}

const styles = {
    container: {
        marginTop: 20,
        padding: width['10'],
        marginBottom: 70,
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width['80'],
        marginTop: 10,
        marginBottom: 15
    },
    forgotLink: {
        color: colors.pink,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: colors.pink
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    centerView: {
        marginVertical: 40
    }
}

export default connect( null,{recoverPassword})(RecoverPassForm);