import React, { useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import COLORS from '../../consts/colors'
import IP from '../../consts/IP'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { GoFitInput, GoFitSecuredInput } from '../components/GoFitInput'
import { GofitBtnMain } from '../components/Button'

const EditProfile = ({ route }) => {
    const { userData } = route.params
    const [feet, inches] = userData.height.split('-')
    const [userDetail, setUserDetail] = useState({
        name: userData.name,
        height: feet + " feet " + inches + " inches ",
        weight: userData.weight
    })
    return (
        <View style={styles.container}>
            <View style={styles.whiteBox}>
                <Icon
                    style={{ top: 7 }}
                    name='keyboard-backspace'
                    size={35}
                    color={COLORS.dark}
                />
                <Text style={styles.headerText}>Edit Profile</Text>
            </View>
            <Image
                style={styles.profileImg}
                source={userData.profilePic ? { uri: `http://${IP}/EM_API/UserImages/${userData.profilePic}` } : require('../../assets/user.png')}
                resizeMode={'center'}
            />
            <View style={styles.blueBox}>
                <GoFitInput value={userDetail.name} placeholder={'Name'} icon={require('../../assets/icons/avatar.png')} />
                <GoFitInput value={userDetail.height} placeholder={'Height'} icon={require('../../assets/icons/height.png')} />
                <GoFitInput value={userDetail.weight} placeholder={'Weight'} icon={require('../../assets/icons/weight.png')} />
                <GoFitSecuredInput />
                <GofitBtnMain style={styles.saveBtn} title={'Save'} />

            </View>
        </View>
    )
}

export default EditProfile
const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex: 1
    },
    whiteBox: {
        flexDirection: "row",
        height: 200,
        paddingTop: 10,
        paddingHorizontal: 10
    },
    headerText: {
        marginLeft: 60,
        fontSize: 30,
        color: COLORS.dark,
        fontWeight: 600,

    },
    blueBox: {
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        height: 565,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    profileImg: {
        position: "absolute",
        height: 180,
        width: 180,
        borderRadius: 100,
        borderWidth: 0.5,
        borderColor: COLORS.primary,
        alignSelf: "center",
        top: 100,
        zIndex: 1
    },
    saveBtn: {
        backgroundColor:'#505fff',
        borderWidth: 1,
        borderColor: COLORS.light,
        width: 150,
        alignSelf: "center"
    }


})
