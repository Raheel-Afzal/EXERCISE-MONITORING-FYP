import React, { useState } from 'react'
import { View, Text, StyleSheet, ToastAndroid } from 'react-native'
import { Picker, } from '@react-native-picker/picker';
import COLORS from '../../consts/colors';
import { GofitBtnMain } from '../components/Button';
import IP from '../../consts/IP';
import { TextInput } from 'react-native-paper';

const AgeSelection = ({ route, navigation }) => {
    const ageArray = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 78, 79, 80, 81, 82, 83, 84, 95, 96, 87, 88, 89, 90]
    const { userData } = route.params;
    const [age, setAge] = useState('21');
    const [height, setHeight] = useState('173');
    const [weight, setWeight] = useState('64');

    const handleSaveData = async () => {

        const weightInKg = parseFloat(weight);
        const heightInCm = parseFloat(height);
        const bmiResult = (weightInKg / ((heightInCm / 100) * (heightInCm / 100))).toFixed(2);



        const totalInches = heightInCm / 2.54;
        const feetValue = Math.floor(totalInches / 12);
        const inchesValue = Math.round(totalInches % 12);



        try {
            let data = new FormData();
            data.append('name', userData.name);
            data.append('email', userData.email);
            data.append('password', userData.password);
            data.append('profilePic', userData.imageData);
            data.append('gender', userData.gender);
            data.append('age', age);
            data.append('height', `${feetValue}-${inchesValue}`);
            data.append('weight', weight);
            data.append('bmi', bmiResult);

            const requestOptions = {
                method: 'POST',
                body: data,
            };
            const response = await fetch(
                `http://${IP}/EM_API/api/user/addUser`,
                requestOptions,
            );
            const results = await response.json();
            ToastAndroid.show(results, ToastAndroid.SHORT);
            if(response.ok){
                navigation.navigate('LoginScreen')
            }
        } catch (error) {
            console.log('ERROR REQUEST', error);
        }

    };
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignContent: "center" }}>
            <View style={{ backgroundColor: COLORS.primary, flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                <Text style={{ color: COLORS.white, fontSize: 20, textAlign: 'center' }}>This information is used to calculate your bmi</Text>
            </View>
            <View style={styles.picker}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>How old are you?</Text>
                </View>
                <View style={styles.heightInCm}>
                    <TextInput
                        mode='outlined'
                        style={{ width: 50, alignSelf: 'center' }}
                        value={age}
                        onChangeText={(text) => setAge(text)}
                    />
                    <Text style={{ fontSize: 30 }}>Year old</Text>
                </View>
            </View>
            <View style={styles.picker}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>What is your weight?</Text>
                </View>
                <View style={styles.heightInCm}>
                    <TextInput
                        mode='outlined'
                        style={{ width: 100, alignSelf: 'center' }}
                        value={weight}
                        onChangeText={(text) => setWeight(text)}
                    />
                    <Text style={{ fontSize: 30 }}>Kg</Text>
                </View>
            </View>
            <View style={styles.picker}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>What is your height?</Text>
                </View>
                <View style={styles.heightInCm}>
                    <TextInput
                        mode='outlined'
                        style={{ width: 100, alignSelf: 'center' }}
                        value={height}
                        onChangeText={(text) => setHeight(text)}
                    />
                    <Text style={{ fontSize: 30 }}>cm</Text>
                </View>
            </View>
            <View style={styles.Footer}>
                <GofitBtnMain

                    style={styles.FooterBtn}
                    title='Continue'
                    onPress={() => { handleSaveData() }}
              
                />
            </View>
        </View>
    )
}

export default AgeSelection
const styles = StyleSheet.create({
    picker: {
        flex: 2,
        justifyContent: 'center'
    },
    header: {
        justifyContent: "flex-end",
        alignItems: "center"
    },
    headerText: {
        color: COLORS.dark,
        fontSize: 30,
        fontWeight: 800,
        marginBottom: 10,
    },
    FooterBtn: {
        width: 290,
    },
    Footer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    heightInCm: {
        flexDirection: 'row',
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    }
})