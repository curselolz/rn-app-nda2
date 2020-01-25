import React, { Component } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import filedStar from '../../theme/images/filedStar.png';
import emptyStar from '../../theme/images/emptyStar.png';



class StarView extends Component {

    state = {
        animated: new Animated.Value(1),
        stars: 0
    }

    scale = () => {
        Animated.sequence([
            Animated.timing(this.state.animated, {
                toValue: 1.3,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.animated, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start()
    }

    pickStar = (item) => {
        this.props.action(item)
        this.scale()
    }

    render() {
        const data = [1,2,3,4,5],
        {value} = this.props,
        scale = {
            transform: [
                {
                    scale:this.state.animated
                }
            ]
        }
        return (
            <View style={styles.container}>
            {data && data.map((item, index) => 
                <TouchableOpacity 
                key={index.toString()} 
                onPress={() => this.pickStar(item)}
                hitSlop={{ top: 10, bottom: 10, left: 5, right: 5 }}
                >
                <Animated.Image
                    style={[styles.star, scale]}
                    source={value && value > index ? filedStar : emptyStar}
                />

                </TouchableOpacity>
            )}


            </View>
        );
    }
}


const styles = {
    container: {
        width: 150,
        height: 35,
        flexDirection : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    star: {
        height: 20,
        width: 20,
        resizeMode: 'stretch'
    }
}

export default StarView;
