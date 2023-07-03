import React from 'react';
import { View,  Text } from 'react-native';
import WebView from 'react-native-webview';
import IP from '../../consts/IP';
import COLORS from '../../consts/colors';

const AI_SCREEN = () => {
    return (
        <View style={{ flex: 1 ,backgroundColor:COLORS.primary}}>
            <WebView source={{ uri: `http://${IP}:8000/getvideo` }}   containerStyle={{ transform: [{rotate: '90deg'},{scale:1.8}],}}/>
        </View>

    );
};

export default AI_SCREEN;