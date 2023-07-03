import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import COLORS from '../../consts/colors';
import EntypoIcon from 'react-native-vector-icons/Entypo';


const CartCard = ({ item }) => {

    console.log(item);
    const [itemQty, setItemQty] = useState(item.qty);

    const handleItemQty = (getQty) => {
        setItemQty(getQty);
    }

    return (

        <View style={style.cartCard}>
            <Image source={item.image} style={{ height: 70, width: 70, top: -25 }} resizeMode={"contain"} />
            <View
                style={style.cardContent}>
                <EntypoIcon name='cross' size={25} style={style.CrossIcon} />
                <View style={style.cardFoodSec}>
                    <Text style={style.foodName}>{item.name}</Text>
                    <Text style={{ top: -22, fontSize: 10 }}>Take Away</Text>
                </View>
                <View style={style.line}></View>
                <View style={style.qtyContainer}>
                    <Text>Rs {item.price}</Text>
                    <View style={style.qtyCounter}>
                        <EntypoIcon onPress={() => { handleItemQty(itemQty - 1) }} name='minus' size={20} style={style.IconBtnMinus} />
                        <Text style={{ fontSize: 14, fontWeight: "600", color: COLORS.grey }}>
                            {itemQty}
                        </Text>
                        <EntypoIcon onPress={() => { handleItemQty(itemQty + 1) }} name='plus' size={20} style={style.IconBtnPlus} />
                    </View>
                    <Text style={style.foodPrice}>Rs. {item.price * item.qty}</Text>
                </View>
            </View>
        </View>



    );
};
export default CartCard;


const style = StyleSheet.create({

    cartCard: {
        height: 120,
        elevation: 15,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardContent: {
        height: "100%",
        marginLeft: 10,
        flex: 2,
        justifyContent: 'flex-end',
        //backgroundColor:"red"

    },
    line: {
        height: 1,
        left: -65,
        width: "120%",
        backgroundColor: COLORS.light

    },

    actionBtn: {
        paddingVertical: 7,
        width: 90,
        height: 32,
        backgroundColor: COLORS.primary,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    cardFoodSec: {
        height: 58
    },
    foodName: {
        top: -10,
        fontSize: 17,
        fontWeight: "500",
        marginVertical: 10,
        color: COLORS.dark,
        paddingVertical: 5,
        //  backgroundColor:'red'

    },
    foodPrice: {
        fontSize: 12.5,
        color: COLORS.white,
        backgroundColor: COLORS.red,
        width: 65,
        borderRadius: 5,
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingVertical: 2,

    },
    qtyText: {
        fontWeight: 'bold',
        fontSize: 18,
        left: 62,
        zIndex: 2,
        backgroundColor: COLORS.white,
        width: 36,
        height: 36,
        borderRadius: 50,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderColor: COLORS.primary,
        borderWidth: 3,
        // paddingHorizontal:10,

    },

    qtyContainer: {
        flexDirection: 'row',
        height: 35,
        marginBottom: 10,
        alignItems: 'center',
        width: "140%",
        left: -85,
        justifyContent: "space-around",
        //borderTopWidth: 1.5,
        // borderColor: COLORS.light,
        paddingTop: 5,
        //   backgroundColor:'red',

    },
    IconBtnPlus: {
        // backgroundColor: COLORS.red,
        borderLeftWidth: 1,
        borderColor: COLORS.light,
        paddingLeft: 7,
        color: COLORS.grey


    },
    IconBtnMinus: {
        // backgroundColor: COLORS.red,
        borderRightWidth: 1,
        paddingRight: 7,
        borderColor: COLORS.light,
        color: COLORS.grey

    },
    CrossIcon: {
        top: 20,
        left: 195,
        color: COLORS.red
    },
    Footer: {
        marginBottom: 80,
    },
    qtyCounter: {
        flexDirection: "row",
        width: 110,
        justifyContent: 'space-around',
        borderRadius: 5,

        backgroundColor: COLORS.white,
        //backgroundColor:'red'
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    }

});