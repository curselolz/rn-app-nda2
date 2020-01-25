import React, { PureComponent } from 'react';
import {View, Animated} from 'react-native'
import { connect } from 'react-redux';
import { width, colors } from '../../theme/consts.theme';

function mapStateToProps(state) {
    return {

    };
}

class HeaderSlider extends PureComponent {
    state = {
        animation: new Animated.Value(0)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selected !== this.props.selected) {
            if (nextProps.selected) {
                this.moveLeft()
            }else{
                this.moveRight()
            }
        }
    }

    moveRight =()=> {
        Animated.timing(this.state.animation, {
            toValue: width['100']/2,
            duration: 300,
        }).start()
    }

    moveLeft =()=> {
        Animated.timing(this.state.animation, {
            toValue: 0,
            duration: 300,
        }).start()
    }

    render() {
        const leftConstrain = { left: this.state.animation}
        return (
            <Animated.View style={[styles.sliderView, leftConstrain]}/>
        );
    }
}

const styles = {
    sliderView:{
        width: width['100']/2,
        position: 'absolute',
        bottom: -1,
        left: 0,
        height: 4,
        backgroundColor: colors.pink
    }
}

export default connect(
    mapStateToProps,
)(HeaderSlider);