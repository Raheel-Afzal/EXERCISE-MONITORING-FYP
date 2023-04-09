import React, { useState } from 'react'
import { Text } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import COLORS from '../../consts/colors'
import GofitRB from '../components/GofitRB'
import { GofitBtnMain } from '../components/Button'

const GenderSelection = ({navigation}) => {

    const options = [
        { label: 'Male', value: 'male'},
        { label: 'Female', value: 'female'},

    ];

    const [selectedOption, setSelectedOption] = useState("Male");

    return (
        <View style={styles.Screencontainer}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Tell Us About YourSelf</Text>
            </View>
            <View style={styles.Main}>
                <View>
                    <GofitRB options={options} onSelect={(newValue) => setSelectedOption(newValue)} />
                </View>
            </View>
            <View style={styles.Footer}>
                <GofitBtnMain
                    style={styles.FooterBtn}
                    title='Continue'
                    // onPress={() => { console.log("selectedOption", selectedOption.value) }}
                    onPress={() => navigation.navigate('AgeSelection')}
                />
            </View>
        </View>
    )
}

export default GenderSelection

const styles = StyleSheet.create({
    Screencontainer: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    header: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    headerText: {
        color: COLORS.dark,
        fontSize: 25,
        fontWeight: 800,
        marginBottom: 10,
    },
    Main: {
        flex: 5,
    },
    Footer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    FooterBtn: {
        width: 290,
    }

})