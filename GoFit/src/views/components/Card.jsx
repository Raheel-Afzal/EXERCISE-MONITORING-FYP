import React, { useState } from 'react'
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MuiIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import COLORS from '../../consts/colors';

import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';


const Card = ({ food, LoadCart }) => {
    const [qty, setQty] = useState(0);
    const [isLike, setIsLike] = useState(false);

    const handleAddCart = (getId, getName, getImage, getPrice, qty) => {

        LoadCart(getId, getName, getImage, getPrice, qty);

        setQty(curr => curr + 1)

    }
    const handleMinusQty = (getId, getName, getImage, getPrice, qty) => {

        LoadCart(getId, getName, getImage, getPrice, qty);
        setQty(curr => curr - 1)

    }
    const handlePlusQty = (getId, getName, getImage, getPrice, qty) => {

        LoadCart(getId, getName, getImage, getPrice, qty);
        setQty(curr => curr + 1)
    }


    return (
        <View style={style.card}>
            <View style={style.cardPic}>
                <Image source={food.image} style={{ height: 100, width: 100 }} resizeMode={"center"} />
            </View>
            <View style={style.cardContentContainer}>
                <View style={style.cardContent}>
                    <Text style={style.foodName}>{food.name}</Text>
                    <Text style={style.foodDes}>{food.description}</Text>
                </View>
                <View style={style.cardButtonContainer}>
                    <View style={{ flex: 4 }}>

                        <Text style={style.foodPrice}>from Rs. {food.price}.00</Text>

                        {

                            qty === 0 ?
                                <TouchableOpacity onPress={() => { handleAddCart(food.id, food.name, food.image, food.price, qty + 1) }} // handle ADD TO CART
                                    style={style.addCartBtn} activeOpacity={0.7}>
                                    <Text style={style.ADDtext}>ADD</Text >
                                    <MuiIcon name='cart-variant' size={20} style={{ transform: [{ scaleX: -1 }] }} color={COLORS.white} />
                                </TouchableOpacity>
                                :

                                <View style={style.qtyContainer}>

                                    <TouchableOpacity onPress={() => { handleMinusQty(food.id, food.name, food.image, food.price, qty - 1) }} style={style.IconBtn} >
                                        <EntypoIcon name='minus' size={25} color={COLORS.white} />
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 16, fontWeight: "600", color: COLORS.dark }}>
                                        {qty}
                                    </Text>
                                    <TouchableOpacity onPress={() => { handlePlusQty(food.id, food.name, food.image, food.price, qty + 1) }} style={style.IconBtn}>
                                        <EntypoIcon name='plus' size={25} color={COLORS.white} />
                                    </TouchableOpacity>
                                </View>

                        }

                    </View>
                    <View style={style.likeIcon}>
                        {
                            isLike ?
                                <AntIcon name='heart' size={25} color={COLORS.red} onPress={() => { setIsLike(false) }} />
                                :
                                <AntIcon name='hearto' size={25} color={COLORS.red} onPress={() => { setIsLike(true) }} />

                        }

                    </View>
                </View>
            </View>
        </View>
    );
};

export default Card

const style = StyleSheet.create({

    card: {

        flex: 1,
        flexDirection: "row",
        height: 170,
        //  width: cardWidth,
        width: 340,
        marginHorizontal: 10,
        marginVertical: 8,
        borderRadius: 5,
        elevation: 13,
        backgroundColor: COLORS.white,
    },
    cardPic: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',


    },
    cardContentContainer: {
        flex: 2,
    },
    cardContent: {
        flex: 1.4,

    },
    cardButtonContainer: {
        flex: 1,
        flexDirection: "row",

    },
    foodName: {
        fontSize: 17,
        fontWeight: "500",
        marginVertical: 10,
        color: COLORS.dark,
    },
    foodDes: {
        fontSize: 12,
        width: 215,

    },
    foodPrice: {
        fontSize: 12.5,
        color: COLORS.white,
        backgroundColor: COLORS.red,
        width: 115,
        borderRadius: 5,
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingVertical: 3,
    },
    addCartBtn: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
        marginVertical: 10,
        backgroundColor: COLORS.red,
        width: 80,
        height: 28,
        borderRadius: 5,
    },
    ADDtext: {
        color: COLORS.white,
        marginRight: 5,
    },
    qtyContainer: {
        width: 80,
        height: 40,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    IconBtn: {
        backgroundColor: COLORS.red,
        borderRadius: 3,
    },
    likeIcon: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 10,

    }

});