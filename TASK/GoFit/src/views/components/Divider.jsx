import React from 'react'
import { View, Text ,StyleSheet} from 'react-native'
import COLORS from '../../consts/colors'
const Divider = ({text}) => {
    return (
        <View style={styles.Sperator}>
            <View style={styles.Line}></View>
            <Text style={styles.LineText}>{text}</Text>
            <View style={styles.Line}></View>
        </View>
    )
}

export default Divider
const styles = StyleSheet.create({
    Sperator: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        marginTop:60

    },
    Line: {
        height: 1,
        backgroundColor: COLORS.grey,
        width: '30%',
    },
    LineText: {
        color: COLORS.grey,
        paddingHorizontal: 10,

    },
})