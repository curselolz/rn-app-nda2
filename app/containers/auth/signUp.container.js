import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import { connect } from 'react-redux';
import SignUpNavigatorContainer from './signUpNavigator.container';
import SignUpFormContainer from './signUpForm.container';
import { width } from '../../theme/consts.theme';



class SignUpContainer extends Component {

    state = {
        chosen: null
    }

    render() {
        const {chosen} = this.state;
        let data = [
            {
                label: 'Email',
                type: 'email',
            },

            {
                label: 'Password',
                type: 'password',
            },

            {
                label: 'Confirm password',
                type: 'confirm',
            },

            {
                label: 'Referral code',
                type: 'referralCode',
            }
        ]
        if (this.state.chosen === 'CSH') {
            data.splice(0, 0, {
                label: 'Company name',
                type: 'company_name',
            })
        }else{
            data.splice(0, 0, {
                label: 'Last name',
                type: 'last_name',
            })
            data.splice(0, 0, {
                label: 'First name',
                type: 'first_name',
            })
        }
        return (
            <View>
                <SignUpNavigatorContainer
                    chosen={(chosen) => this.setState({ chosen })}
                    selected={chosen}
                />
                {
                    chosen && 
                        <SignUpFormContainer
                            data={data}
                            navigate={(route) => this.props.navigate(route)}
                            chosenType={chosen}
                        />
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => ({

})

export default connect(
    mapStateToProps,
)(SignUpContainer);