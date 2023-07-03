import React, { useState } from 'react'
import { StyleSheet, TextInput, View, Image, TouchableOpacity } from 'react-native'
export const GoFitInput = ({ value, onChangeText, icon, placeholder }) => {
    return (
        <View>
            <TextInput
                style={styles.InputFields}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
            />
            {
                icon && <Image
                    source={icon}
                    resizeMode={'center'}
                    style={styles.icon}
                />
            }
        </View>
    )
}
export const GoFitSecuredInput = ({ value, onChangeText }) => {
    const [hidePassword, setHidePassword] = useState(true);

    return (
        <View>
            <TextInput
                style={styles.InputFields}
                value={value}
                placeholder={"Password"}
                onChangeText={onChangeText}
                secureTextEntry={hidePassword}
            />

            <Image
                source={require('../../assets/icons/lock.png')}
                resizeMode={'center'}
                style={styles.icon}
            />
            <TouchableOpacity style={{ position: 'relative', left: 230, bottom: 55, height: 20 }} onPress={() => { setHidePassword(!hidePassword) }}>
                {
                    hidePassword ?
                        <Image
                            source={require('../../assets/closeEye.png')}
                            resizeMode={'center'}
                            style={styles.iconLeft}
                        />
                        :
                        <Image
                            source={require('../../assets/eyeOpen.png')}
                            resizeMode={'center'}
                            style={styles.iconLeft}
                        />
                }

            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    InputFields: {
        backgroundColor: '#efefef',
        borderWidth: 0.5,
        borderColor: "#dbdbdb",
        borderRadius: 10,
        paddingLeft: 52,
        fontSize: 16,
    },
    icon: {
        height: 20,
        position: "relative",
        bottom: 38,
        right: 40
    },
    iconLeft: {
        height: 20,

    }
});

