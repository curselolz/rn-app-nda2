import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/auth.actions';
import { Input, Button } from '../layout';
import { width, colors } from '../../theme/consts.theme';
import Checkbox from '../../containers/layout/checkbox.container';


class SignUpForm extends PureComponent {

    componentWillReceiveProps(nextProps) {
        if (nextProps.signUpSuccess !== this.prepareData.signUpSuccess && nextProps.signUpSuccess) {
            this.props.navigate('finishRegistration')
        }
    }

    handleSignUp = () => {
        this.validate()
            && this.collectData()
    }

    validate = () => {
        const { company_name, first_name, last_name, email, password, confirm, check } = this.refs

        const validFields =[
            { company_name: company_name && company_name.handleValidation() },
            { first_name: first_name && first_name.handleValidation() },
            { last_name: last_name && last_name.handleValidation() },
            { email: email.handleValidation() },
            { password_empty: !!password.state.value && password.state.value.length > 0 },
            { password: password.handleValidation() },
            { confirm: password.state.value === confirm.state.value },
            { check: check.state.selected }
        ]

        const firstInputError = validFields.find( field => {
            const fieldName = Object.keys(field)[0];
            return fieldName && field[fieldName] === false
        });

        firstInputError &&
             Alert.alert('Oops...', alertMessages[Object.keys(firstInputError)[0]])

        return validFields.every(field => {
            const fieldName = Object.keys(field)[0];
            return fieldName && field[fieldName] !== false
        })
    };

    collectData = () => {
        let fields = Object.values(this.refs),
            data = {};

        fields.map(field => field.props.type !== undefined && (data[field.props.type] = field.state.value));
        let dataToSend = this.prepareData(data)
        this.props.signUp(dataToSend)
    };

    prepareData = (oldData) => {
        const { chosenType } = this.props;
        let data = {
            type: chosenType === 'PSH' ? "person" : chosenType === 'CSH' ? 'employer' : 'employee',
            email: oldData.email,
            referral: oldData.referral,
            password: oldData.password,
            password_confirmation: oldData.confirm
        }
        if (chosenType === 'CSH') {
            data['company_name'] = oldData.company_name
        } else {
            data['first_name'] = oldData.first_name
            data['last_name'] = oldData.last_name
        }
        return data
    };

    goToLink = (link) => {


    };

    render() {
        const { data } = this.props;
        return (
            <View style={styles.container}>
                {data.map((item, index) => {
                    return   item.type !== 'confirm'  ?
                    (
                    <Input
                       key={index.toString()}
                       ref={item.type}
                       type={item.type}
                       required={item.type !== 'referralCode'}
                    /> ) :
                    (
                        <Input 
                           key={index.toString()}
                           ref={item.type}
                           type={item.type}
                           keyType='send'
                           required
                           submitAction={this.handleSignUp}
                        />)
                    }
                )}

                <View style={styles.row}>
                    <Checkbox
                        ref='check'
                        required
                    />
                    <View style={{flexDirection: 'row'}}>

                        <Text>I agree to</Text>
                        <TouchableOpacity
                            onPress={() => this.goToLink('Tou')}
                        >
                            <Text style={styles.forgotLink}> T.O.U.</Text>
                        </TouchableOpacity>
                        <Text> & </Text>
                        <TouchableOpacity
                            onPress={() => this.goToLink('Privacy policy')}
                        >
                            <Text style={styles.forgotLink}>Privacy Agreement</Text>
                        </TouchableOpacity>
                    </View>

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

const alertMessages = {
    company_name: 'Company Name is invalid.',
    first_name: 'First name is invalid.',
    last_name: 'Last name is invalid.',
    email: 'Email is invalid.',
    password_empty: 'Please select a password.',
    password: 'Passwords must be more than 8 characters.',
    confirm: 'Passwords do not match.',
    check: 'T.O.U. & Privacy Agreement are required!'
}

const styles = {
    container: {
        marginTop: 20,
        padding: width['5'],
        marginBottom: 70
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width['100'] * 0.9,
        marginTop: 10,
        marginBottom: 15
    },
    forgotLink: {
        color: colors.pink,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: colors.pink
    },
}

const mapStateToProps = ({ auth }) => ({
    signUpSuccess: auth.signUpSuccess
})

export default connect(mapStateToProps, { signUp })(SignUpForm);
