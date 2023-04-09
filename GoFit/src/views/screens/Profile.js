import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-paper';
import COLORS from '../../consts/colors';

const Profile = () => {

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
                        source={require('../../assets/user.png')}
                        resizeMode={'center'}
                    />
                </View>
                <View style={styles.userDetails}>
                    <Text style={styles.Name}>Raheel Afzal</Text>
                    <Text style={{ color: COLORS.dark }}>Male, 23 years old</Text>
                    <Text style={styles.bmi}>Bmi 22</Text>

                </View>
            </View>
            <TouchableOpacity style={styles.viewAll}>
                <Text>{"View All >"}</Text>
            </TouchableOpacity>
            <View style={styles.gallery}>
                <View style={styles.cameraIconBox}>
                    <Image
                        style={{width:40,height:40}}
                        source={require('../../assets/photo-camera.png')}
                        resizeMode={'center'}
                    />
                </View>
                {
                    images.slice(0, 4).map((img) => (
                        <TouchableOpacity key={img.id}>
                            <Image
                                style={styles.galleryImg}
                                source={require('../../assets/RaheelPic.jpg')}
                                resizeMode={'center'}
                            />
                        </TouchableOpacity>
                    ))
                }
            </View>
            <Divider style={{ width: "60%", alignSelf: "center", height: 1 }} />
            <View style={styles.unit}>
                <Text style={styles.unitText}>Units</Text>
                <View style={styles.unitWrapper}>
                    <View style={styles.unitsIcon}>
                        <Image
                            style={{ height: 30, width: 30 }}
                            source={require('../../assets/weight-scale.png')}
                            resizeMode={'center'}
                        />
                    </View>
                    <Text style={styles.unitNumber}> 64 </Text>
                    <View style={styles.unitPicker}>
                        <Text style={styles.firstUnit}> kg </Text>
                        <Text style={styles.secondUnit}> lbs </Text>
                    </View>
                </View>
                <View style={styles.unitWrapper}>
                    <View style={styles.unitsIcon}>
                        <Image
                            style={{ height: 30, width: 30 }}
                            source={require('../../assets/height.png')}
                            resizeMode={'center'}
                        />
                    </View>
                    <Text style={styles.unitNumber}> 73 </Text>
                    <View style={styles.unitPicker}>
                        <Text style={styles.firstUnit}> cm </Text>
                        <Text style={styles.secondUnit}> ft & cm </Text>
                    </View>
                </View>
            </View>
            <Divider style={{ width: "60%", alignSelf: "center", height: 1 }} />

            <View style={styles.footer}>
                <View style={styles.iconsWrapper}>
                    <Image
                        style={{ height: 30, width: 30 }}
                        source={require('../../assets/userP.png')}
                        resizeMode={'center'}
                    />
                    <Text style={styles.editProfileText}>
                        Edit Profile
                    </Text>
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
        justifyContent:"center",
        alignItems:"center"
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
    unitWrapper: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    unitsIcon: {
        flex: 1.5,
    },
    unitPicker: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 10,
    },
    unitNumber: {
        fontSize: 15,
        textAlign: "center",
        borderBottomWidth: 1.3,
        borderBottomColor: COLORS.grey
    },
    firstUnit: {
        backgroundColor: '#3a9eff',
        color: COLORS.white,
        height: 24,
        width: 50,
        fontSize: 13,
        borderRadius: 20,
        textAlign: "center",
        textAlignVertical: "center"
    },
    secondUnit: {
        backgroundColor: '#aae3f9',
        height: 24,
        width: 60,
        fontSize: 13,
        borderRadius: 20,
        textAlign: "center",
        textAlignVertical: "center"
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