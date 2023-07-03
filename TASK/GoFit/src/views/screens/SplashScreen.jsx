import AnimatedLottieView from 'lottie-react-native';
import React, { useEffect } from 'react';
import { ImageBackground, StatusBar, StyleSheet, View } from 'react-native';
import GofitIcons from '../../consts/ICONS';


const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('LoginScreen')
        }, 3000);
    }, []);

    return (
        <>

            <StatusBar backgroundColor={"#7552ff"} barStyle="dark-content" />
            <View style={styles.container}>
                <ImageBackground
                    source={require('../../assets/splashscreen.png')}
                    style={styles.imageBackground}
                />                
               <AnimatedLottieView  autoPlay source={GofitIcons.splashLoader} style={styles.LottieView}/>
            </View>

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    LottieView:{
        position:'absolute',
        bottom:-28,
        width:'80%',
        alignSelf:"center"
    }
});

export default SplashScreen;
