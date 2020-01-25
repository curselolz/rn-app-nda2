import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Button } from '../layout';

class SignUpNavigator extends PureComponent {
    handlePress = (chosen) => {
        this.props.chosen(chosen)
    }

    render() {
        const { selected } = this.props;
        return (
            <View style={styles.container}>
                <Button
                    action={() => this.handlePress('SW')}
                    label='I AM SEEKING WORK'
                    upperCase
                    active={(selected === 'SW')}
                />
                <Button
                    action={() => this.handlePress('CSH')}
                    label='I AM A COMPANY SEEKING WORKERS'
                    upperCase
                    active={(selected === 'CSH')}
                />
                <Button
                    action={() => this.handlePress('PSH')}
                    label={`I'M AN INDIVIDUAL SEEKING WORKERS`}
                    upperCase
                    active={(selected === 'PSH')}
                />
            </View>
        );
    }
}

const styles = {
    container: {
        marginTop: 20,
        height: 200,
        justifyContent: 'space-around'
    }
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(
    mapStateToProps,
)(SignUpNavigator);