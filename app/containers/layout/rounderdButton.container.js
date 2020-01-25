import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, weight, flex, width, shadows } from '../../theme/consts.theme';
import { connect } from 'react-redux';

class RoundedButton extends Component {
    render() {
        let {
            state,
            disabled,
            upperCase,
            label,
            action,
        } = this.props
        return (
            <TouchableOpacity
                onPress={() => action()}
                style={[styles.button, shadows.default]}
                disabled={disabled}
            >
                {state.spinnerVisible
                    ? <ActivityIndicator size='large' color={colors.pink} />
                    : <Text style={styles.buttonText}>
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

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: 150,
        borderRadius: 25,
        backgroundColor: colors.white,
        ...flex.centered,
        marginVertical: 30
    },
    buttonText: {
        color: colors.pink,
        fontWeight: 'bold'
    },
})

const mapStateToProps = state => {
    return {
        state: state.layout
    }
}

export default connect(mapStateToProps, null)(RoundedButton)