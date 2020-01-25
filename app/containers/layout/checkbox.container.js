import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { colors, icons } from '../../theme/consts.theme'

class Checkbox extends Component {
    state = {
        selected: false
    }

    handleValidation = () => {
        return this.state.selected
    }

    render() {
        return (
            <View style={{flexDirection: 'row',  alignItems: 'center'}}>
                <TouchableOpacity
                    hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                    onPress={()=> this.setState({selected: !this.state.selected})}
                >
                    <View style={styles.checkboxOutside}>
                        {this.state.selected && <View style={styles.checked}/>}
                    </View>
                </TouchableOpacity>
                {this.props.remember && 
                    <Text style={{color: 'grey'}}>
                        Remember Me
                    </Text>
                }
            </View>

        )
    }
}

const styles = StyleSheet.create({
    checkboxOutside: {
        borderRadius: 15,
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.inputsGrey,
        marginRight: 10 
    },
    checkboxOutsideRequired: {
        borderColor: colors.red
    },
    checked :{
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: colors.pink
    }
})

export default Checkbox
