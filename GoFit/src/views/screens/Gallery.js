import React, { useCallback, useState } from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import COLORS from '../../consts/colors';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import IP from '../../consts/IP';
const Gallery = ({ route }) => {
    const userData = route.params.userData
    const [isLike, setIsLike] = useState(false);
    const LeftContent = props => <Avatar.Image {...props} source={require('../../assets/user.png')} />
    const DeleteIcon = () =>
        <TouchableOpacity onPress={() => { console.log("object") }} style={{ flexDirection: "row", alignItems: "center", backgroundColor: COLORS.light, padding: 5, borderRadius: 10 }}>
            <EntypoIcon name='cross' size={25} style={style.CrossIcon} />

        </TouchableOpacity>


    const [progressPics, setProgressPics] = useState([]);
    const getProgressPhotos = async () => {
        try {
            const response = await fetch(`http://${IP}/EM_API/api/ProgressPhotos/getProgressPhotos?USERID=${userData.uid}`);
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

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };


    const formatDateDifference = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const msDifference = today.getTime() - date.getTime();
        const daysDifference = Math.floor(msDifference / (1000 * 60 * 60 * 24));

        if (daysDifference === 0) {
            return 'Today';
        } else if (daysDifference === 1) {
            return 'Yesterday';
        } else if (daysDifference < 7) {
            return `${daysDifference} days ago`;
        } else if (daysDifference < 30) {
            const weeks = Math.floor(daysDifference / 7);
            return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
        } else if (daysDifference < 365) {
            const months = Math.floor(daysDifference / 30);
            return `${months} ${months === 1 ? 'month' : 'months'} ago`;
        } else {
            const years = Math.floor(daysDifference / 365);
            return `${years} ${years === 1 ? 'year' : 'years'} ago`;
        }
    };

    return (

        <FlatList
            keyExtractor={(item, index) => index}
            data={progressPics}
            renderItem={({ item }) => {
                return (
                    <View style={style.cardWrapper}>
                        <Card style={style.card}>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                                <Card.Title style={{ width: 200 }} titleStyle={{ fontSize: 14 }} title={formatDate(item.date)} subtitle={formatDateDifference(item.date)} subtitleStyle={{ fontSize: 12, bottom: 10 }} left={LeftContent} />
                                <DeleteIcon />
                            </View>
                            <Card.Cover source={{ uri: `http://${IP}/EM_API/Images/${item.photo}` }} style={{ borderRadius: 0 }} />
                            <Card.Content style={{ flexDirection: "row", marginTop: 10 }}>
                                <Text variant="labelLarge">Caption: </Text>
                                <Text style={{ width: 200, textAlign: "justify", lineHeight: 20 }}>  {item.caption ? item.caption : "no caption"}</Text>
                            </Card.Content>
                            <View style={style.likeIcon}>
                                {
                                    isLike ?
                                        <AntIcon name='heart' size={25} color={COLORS.red} onPress={() => { setIsLike(false) }} />
                                        :
                                        <AntIcon name='hearto' size={25} color={COLORS.red} onPress={() => { setIsLike(true) }} />

                                }
                            </View>
                        </Card>
                    </View>
                )
            }}

        />

    )
}
export default Gallery;
const style = StyleSheet.create({
    cardWrapper: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 10
    },
    card: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 10,
        borderRadius: 0
    },
    likeIcon: {
        alignSelf: "flex-end",
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 10,
        paddingRight: 5

    },
    CrossIcon: {
        color: COLORS.red
    }
})
