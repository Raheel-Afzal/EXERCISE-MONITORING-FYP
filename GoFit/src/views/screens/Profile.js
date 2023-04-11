import React, { useCallback, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-paper';
import COLORS from '../../consts/colors';
import UnitDisplay from '../components/UnitDisplay';
import IP from '../../consts/IP';
import { useFocusEffect } from '@react-navigation/native';

const Profile = ({ navigation, route }) => {

    const userData = route.params.userData
    const [selectedWeightUnit, setSelectedWeightUnit] = useState('kg');
    const [selectedHeightUnit, setSelectedHeightUnit] = useState('ft');
    const [height, setHeight] = useState(userData.height);
    const [weight, setWeight] = useState(`${userData.weight} kg`)

    const [progressPics, setProgressPics] = useState([]);
    const getProgressPhotos = async () => {
        try {
            const response = await fetch(`http://192.168.0.104/EM_API/api/ProgressPhotos/getProgressPhotos?USERID=${userData.uid}`);
            const json = await response.json();
            setProgressPics(json)
        } catch (error) {
            console.error(error);

        }
    }
    useFocusEffect(
        useCallback(() => {
            getProgressPhotos()
        }, [])
    );
    const convertHeight = (value, unit) => {
        if (unit === 'cm') {
            const [feet, inches] = userData.height.split('-');
            const totalInches = (feet * 12) + Number(inches);
            const cm = totalInches * 2.54;
            return `${cm.toFixed(0)} cm`;
        } else {
            const totalInches = value.split(' ')[0] / 2.54;
            const calculatedFeet = Math.floor(totalInches / 12);
            const calculatedInches = totalInches % 12;
            return `${calculatedFeet}' ${calculatedInches.toFixed(0)}"`;
        }
    };

    const handleWeightUnitChange = (unit) => {
        unit === 'lbs' ?
            setWeight(`${(userData.weight * 2.20462).toFixed(0)} lbs`)
            :
            setWeight(`${userData.weight} kg`);

        setSelectedWeightUnit(unit)
    }

    const handleUnitChange = (unit) => {
        if (unit === 'cm') {
            setHeight(convertHeight(height, 'cm'));
        } else {
            const feet = userData.height.split('-')[0]
            const inches = userData.height.split('-')[1]
            setHeight(`${feet}\' ${inches}\''`);
        }
        setSelectedHeightUnit(unit);
    };

    useEffect(() => {
        const feet = userData.height.split('-')[0]
        const inches = userData.height.split('-')[1]
        setHeight(`${feet}\' ${inches}\''`);
    }, [userData])

    const images = [
        { id: 1, img: '../../assets/RaheelPic.jpg' },
        { id: 2, img: '../../assets/RaheelPic.jpg' },
        { id: 3, img: '../../assets/RaheelPic.jpg' },
        { id: 4, img: '../../assets/RaheelPic.jpg' },
        { id: 5, img: '../../assets/RaheelPic.jpg' },
        { id: 6, img: '../../assets/RaheelPic.jpg' },
        { id: 7, img: '../../assets/RaheelPic.jpg' },
        { id: 8, img: '../../assets/RaheelPic.jpg' },
        { id: 9, img: '../../assets/RaheelPic.jpg' },
        { id: 10, img: '../../assets/RaheelPic.jpg' },
    ]

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Profile</Text>
            </View>
            <View style={styles.userInfo}>
                <View style={styles.imgContainer}>

                    <Image
                        style={styles.profileImg}
                        source={userData.profilePic ? { uri: `http://${IP}/EM_API/UserImages/${userData.profilePic}` } : require('../../assets/user.png')}
                        resizeMode={'center'}
                    />
                </View>
                <View style={styles.userDetails}>
                    <Text style={styles.Name}>{userData.name}</Text>
                    <Text style={{ color: COLORS.dark }}>{userData.gender}, {userData.age} years old</Text>
                    <Text style={styles.bmi}>Bmi {userData.bmi}</Text>

                </View>
            </View>
            <TouchableOpacity style={styles.viewAll} onPress={() => { navigation.navigate('GalleryScreen', { userData }) }}>
                <Text>{"View All >"}</Text>
            </TouchableOpacity>
            <View style={styles.gallery}>
                <View style={styles.cameraIconBox}>
                    <Image
                        style={{ width: 40, height: 40 }}
                        source={require('../../assets/photo-camera.png')}
                        resizeMode={'center'}
                    />
                </View>
                {
                    progressPics.slice(0, 4).map((data,index) => (
                        <TouchableOpacity key={index}>
                            <Image
                                style={styles.galleryImg}
                                source={{ uri: `http://192.168.0.104/EM_API/Images/${data.photo}` }}
                                resizeMode={'center'}
                            />
                        </TouchableOpacity>
                    ))
                }
            </View>
            <Divider style={{ width: "60%", alignSelf: "center", height: 1 }} />
            <View style={styles.unit}>
                <Text style={styles.unitText}>Units</Text>
                <UnitDisplay
                    icon={require('../../assets/weight-scale.png')}
                    value={weight}
                    options={['kg', 'lbs']}
                    selectedUnit={selectedWeightUnit}
                    onUnitPress={handleWeightUnitChange}
                />
                <UnitDisplay
                    icon={require('../../assets/height.png')}
                    value={height}
                    options={['cm', 'ft']}
                    selectedUnit={selectedHeightUnit}
                    onUnitPress={handleUnitChange}
                />
            </View>

            <Divider style={{ width: "60%", alignSelf: "center", height: 1 }} />

            <View style={styles.footer}>
                <View style={styles.iconsWrapper}>
                    <Image
                        style={{ height: 30, width: 30 }}
                        source={require('../../assets/userP.png')}
                        resizeMode={'center'}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('EditProfileScreen', { userData })}>
                        <Text style={styles.editProfileText}>
                            Edit Profile
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.iconsWrapper}>
                    <Image
                        style={{ height: 30, width: 30 }}
                        source={require('../../assets/logout.png')}
                        resizeMode={'center'}
                    />
                    <Text style={styles.logoutText}>
                        Logout
                    </Text>
                </View>
            </View>
            <View style={styles.footerLogo}>
                <Image
                    style={{ height: 60, width: 60 }}
                    source={require('../../assets/Gofit.png')}
                    resizeMode={'center'}
                />
                <Image
                    style={{ height: 40, width: 40 }}
                    source={require('../../assets/Dumbel.png')}
                    resizeMode={'center'}
                />
            </View>

        </View>
    )
}

export default Profile
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 25,
    },
    header: {
        flex: 1.5,
        justifyContent: "flex-end",

    },
    headerText: {
        fontSize: 26,
        fontWeight: '600',
        color: COLORS.dark,
        marginLeft: 35,

    },
    userInfo: {
        flex: 4,
        flexDirection: "row",
    },
    imgContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    profileImg: {
        height: 110,
        width: 110,
        borderRadius: 100,
        borderWidth: 0.5,
        borderColor: COLORS.primary
    },
    userDetails: {
        flex: 1.2,
        justifyContent: "center",
        gap: 5,
    },
    Name: {
        fontSize: 26,
        fontWeight: "600",
        color: COLORS.dark,
    },
    bmi: {
        textAlign: "center",
        textAlignVertical: "center",
        color: COLORS.white,
        backgroundColor: '#3a9eff',
        width: 60,
        height: 22,
        borderRadius: 8,
        marginTop: 5
    },
    viewAll: {
        alignItems: "flex-end",
        marginBottom: 10,
    },
    gallery: {
        flex: 2,
        flexDirection: "row",
    },
    cameraIconBox: {
        height: 55,
        width: 55,
        marginHorizontal: 4,
        borderRadius: 5,
        backgroundColor: "#ebebeb",
        justifyContent: "center",
        alignItems: "center"
    },
    galleryImg: {
        height: 55,
        width: 55,
        marginHorizontal: 4,
        borderRadius: 5,

    },
    unit: {
        flex: 5,
        marginVertical: 15,

    },
    unitText: {
        fontSize: 20,
        color: COLORS.dark,
        fontWeight: "500",
    },

    unitPicker: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 10,
    },
    selectedUnit: {
        backgroundColor: '#3a9eff',
        color: COLORS.white,
        height: 24,
        width: 55,
        fontSize: 13,
        borderRadius: 20,
        textAlign: "center",
        textAlignVertical: "center"
    },
    unSelectedUnit: {
        backgroundColor: '#aae3f9',
        color: COLORS.dark
    },
    footer: {
        flex: 3.5,
        justifyContent: "space-around",
        marginTop: 10,

    },
    editProfileText: {
        marginTop: 5,
        fontWeight: "500",
        color: COLORS.dark,
        fontSize: 16,


    },
    logoutText: {
        fontWeight: "500",
        color: "#f15959",
        fontSize: 16,
        marginBottom: 5,
    },
    iconsWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,

    },
    footerLogo: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        marginBottom: 20
    },
})