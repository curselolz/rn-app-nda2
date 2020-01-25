import {Dimensions} from 'react-native'
const {width, height} = Dimensions.get('window');


export const styles = {
    fillAll:{
        width,
        height,
    },
    containerAllCentered: {
        width,
        alignItems: 'center',
        justifyContent: 'center', 
    },
    containerCenterHorizontal: {
        alignItems: 'center',
    },
    viewRowDirection: {
        flexDirection: 'row',
    },
    imageContain: {
        width: '60%',
        resizeMode: 'contain',
        // backgroundColor: 'red'
    },
    titleText: {
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 30 
    }
}

export const flexes = (number) => ({
    flex: number
})

export const colors = {
    white: '#fff',
    pink: '#ff006e',
    grey: '#f1f1f1'
}