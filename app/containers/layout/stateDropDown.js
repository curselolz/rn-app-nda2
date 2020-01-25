import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, LayoutAnimation, NativeModules, Image } from 'react-native';
import { width, colors, flex, icons } from '../../theme/consts.theme';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

export default class StateDropDown extends Component {
    state = {
        height: 70,
        selected: null,
        opened: false
    }

    openDropDown = () => {
        LayoutAnimation.spring()
        this.setState({ opened: true, height: 220 })
        this.props.open()
    }

    closeDropDown = (item) => {
        LayoutAnimation.linear()
        this.setState({ selected: item, opened: false, height: 70 })
        this.props.action(item)
    }

    render() {
        const { selected, opened, height } = this.state,
            { data } = this.props
        return (
            <View style={{ width: width['100'] * 0.9 +1, height: height }}>
                <View style={{flexDirection: 'row'}}>
                <Text>STATE</Text>
                <Text style={{color: colors.pink}}> *</Text>
                </View>

                {opened ?
                    <ScrollView 
                    style={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    >
                        {data && data.map((item, index) =>
                            <TouchableOpacity
                                key={index.toString()}
                                style={styles.rowContainer}
                                onPress={() => this.closeDropDown(item)}
                            >
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                    :
                    <TouchableOpacity
                        style={styles.dropdown}
                        onPress={this.openDropDown}
                    >
                        <Text>{selected || 'CHOOSE'}</Text>
                        <Image
                            source={icons.arrowDown}
                            style={styles.arrowDown}
                        />
                    </TouchableOpacity>
                }
            </View>
        );
    }

}
const styles = {
    rowContainer: {
        width: width['100'] * 0.9,
        height: 40,
        padding: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: colors.inputsGrey
    },
    dropdown: {
        backgroundColor: colors.inputsGrey,
        marginVertical: 6,
        paddingHorizontal:10,
        height: 40,
        width: width['100']*0.9,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    scrollContainer : {
        borderWidth: 1,
        borderColor: colors.grey,
        marginVertical: 6,
        width: width['100']*0.9-4
    },
    arrowDown: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    }
}