import React, { useState } from 'react'
import {
    Image,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import COLORS from '../../consts/colors';
import categories from '../../consts/categories';

const ListCategories = () => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity activeOpacity={0.8}>
                <View
                    style={{
                        backgroundColor: COLORS.primary,
                        ...style.categoryBtn,
                        marginLeft: 10,
                    }}>
                    <View style={{ ...style.categoryBtnImgCon, marginLeft: 2 }}>
                        <Image
                            source={categories[selectedCategoryIndex].image}
                            style={{ height: 45, width: 45 }}
                        />
                    </View>
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            marginLeft: 10,
                            color: COLORS.white,
                            textTransform: 'uppercase',
                        }}>
                        {categories[selectedCategoryIndex].name}
                    </Text>
                </View>
            </TouchableOpacity>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={style.categoriesListContainer}>
                {categories.map(
                    (category, index) =>
                        selectedCategoryIndex !== index && (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={0.8}
                                onPress={() => setSelectedCategoryIndex(index)}>
                                <View
                                    style={{
                                        backgroundColor: COLORS.secondary,
                                        ...style.categoryBtn,
                                    }}>
                                    <View style={style.categoryBtnImgCon}>
                                        <Image
                                            source={category.image}
                                            style={{ height: 35, width: 35, resizeMode: 'cover' }}
                                        />
                                    </View>
                                    <Text
                                        style={{
                                            fontSize: 15,
                                            fontWeight: 'bold',
                                            marginLeft: 10,
                                            color: COLORS.primary,
                                        }}>
                                        {category.name}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ),
                )}
            </ScrollView>
        </View>
    );
};


export default ListCategories
const style = StyleSheet.create({


    categoriesListContainer: {
        marginLeft: -20,
        paddingVertical: 15,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    categoryBtn: {
        height: 45,
        width: 120,
        marginRight: 7,
        borderRadius: 30,
        alignItems: 'center',
        paddingHorizontal: 5,
        flexDirection: 'row',
    },
    categoryBtnImgCon: {
        height: 35,
        width: 35,
        backgroundColor: COLORS.white,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },


});
