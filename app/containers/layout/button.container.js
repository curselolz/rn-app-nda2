import React, { Component } from 'react'
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { colors, weight, flex, width } from '../../theme/consts.theme';
import { connect } from 'react-redux'

class Button extends Component {
    render() {
        let {
            state,
            transparent,
            disabled,
            filter,
            upperCase,
            label,
            action,
            logout,
            active,
            stylesApply
        } = this.props
        return (
            <TouchableOpacity
                onPress={disabled ? null : action}
                style={[styles.button,
                transparent && styles.buttonTransparent,
                disabled && styles.buttonDisabled,
                filter && styles.buttonFilter,
                !active && {backgroundColor: colors.grey},
                stylesApply && {
                    borderWidth:1,
                    borderColor:'rgba(0,0,0,0.2)',
                    borderRadius:20,
                    backgroundColor:'white',
                    marginTop:35,
            }
        ]}
            >
                {state.spinnerVisible && !logout
                    ? <ActivityIndicator size='large' color='#fff'/>
                    : <Text style={[stylesApply ? {color:'black'} : styles.buttonText]}>
                        {upperCase
                            ? label.toUpperCase()
                            : label
                        }
                    </Text>
                }

            </TouchableOpacity>
        );
    }
}

const styles = {
    button: {
        backgroundColor: colors.pink,
        width: width['80'],
        alignSelf: 'center',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: colors.white,
        fontWeight: weight.default,
        fontWeight: 'bold'
    },
    buttonTransparent: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderWidth: 1,
        borderColor: colors.white
    },
    buttonDisabled: {
        backgroundColor: colors.grey
    },
    buttonFilter: {
        position: 'absolute',
        bottom: 10
    }
}

const mapStateToProps = state => {
    return {
        state: state.layout
    }
}

export default connect(mapStateToProps, null)(Button)
