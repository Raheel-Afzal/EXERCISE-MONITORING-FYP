import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ToastAndroid, Alert } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import ImagePicker from '../components/ImagePicker';
import IP from '../../consts/IP';
const AddProgressImage = ({navigation}) => {
    // States
    const [caption, setCaption] = useState('');
    const [imageData, setImageData] = useState({});
    // Navigation hooks
    const route = useRoute();
    let userID = route.params.uid;
    // Utility Functions
  
    const handleSaveImage = async () => {

        try {
            let data = new FormData();
            data.append('caption', caption);
            data.append('uid', userID);
            data.append('photo', imageData);

            const requestOptions = {
                method: 'POST',
                body: data,
            };
            const response = await fetch(
                `http://${IP}/EM_API/api/ProgressPhotos/addProgressPhoto`,
                requestOptions,
            );
            
            const results = await response.json();
            ToastAndroid.show(results, ToastAndroid.SHORT);
            if(response.ok){
                navigation.navigate('Profile')
            }
           
        } catch (error) {
            console.log('ERROR REQUEST', error);
        }

    };
    return (
        <View style={styles.container}>
            <Text variant="displaySmall" style={styles.headlingText}>
                Add Progress Pic
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    mode='outlined'
                    value={caption}
                    placeholder="Enter Caption"
                    onChangeText={text => setCaption(text)}
                />
            </View>
            <ImagePicker imageData={imageData} setImageData={setImageData} />
            <Button mode="contained" style={styles.LoginButton} onPress={handleSaveImage}>
                Save Picture
            </Button>
        </View>
    );
};

export default AddProgressImage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 12,
        paddingHorizontal: 18,
    },
    headlingText: {
        textAlign: 'center',
        marginBottom: 20,
        // textDecorationLine: 'underline',
        fontWeight: 'bold',
        color: '#6B4FAB',
    },
    inputContainer: {
        marginBottom: 10,
    },
    input: {
        marginVertical: 10,
    },
    textContainer: {
        flexDirection: 'row-reverse',
        marginBottom: 20,
    },
    text: {
        color: 'gray',
        fontSize: 14,
        marginTop: 15,
    },
    LoginButton: {

        backgroundColor: "#F9813A",
        height: 45,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        marginVertical: 60,
        alignSelf: 'center'
    },
});
