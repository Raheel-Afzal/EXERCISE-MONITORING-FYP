import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../consts/colors';


const BottomCartCard = ({ItemsNo,price,navigation,data}) => {
    return (
        <View style={style.cartCardbtm}>
            <View style={style.priceSec}>
                <Text style={style.itemsTxt}>{ItemsNo} Item</Text>
                <Text style={style.priceTxt}>Rs. {price}.00</Text>
                <Text style={style.taxTxt}>plus Taxes</Text>
            </View>
            <TouchableOpacity style={style.cartBtn}  onPress={() => { navigation.navigate("CartScreen",{cartItems:data,price}) }}>
                <Text style={style.ViewCartText}>View Cart</Text>
                <Icon name='chevron-circle-right' color={COLORS.white} size={25} />
            </TouchableOpacity>
        </View>
    )
}

export default BottomCartCard

const style = StyleSheet.create({

    cartCardbtm: {
        flexDirection: "row",
        backgroundColor: COLORS.primary,
        height: 70,
        paddingHorizontal: 20,
    },
    priceSec: {
        flex: 2,
        justifyContent: "center",

    },
    cartBtn: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',

    },
    ViewCartText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: "700",
        marginRight: 10
    },
    itemsTxt: {
        color: COLORS.white,
        fontSize:13
    },
    priceTxt: {
        color: COLORS.white,
        fontSize:16,
        fontWeight:"600",

    },
    taxTxt: {
        color: COLORS.white,
        fontSize:10
    }

});