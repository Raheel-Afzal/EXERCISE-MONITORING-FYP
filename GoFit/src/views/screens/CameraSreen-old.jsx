import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import COLORS from '../../consts/colors';
import { useNavigation } from '@react-navigation/native';
import IP from '../../consts/IP';

const CameraScreen = () => {
    const navigation = useNavigation()
    const [isRecording, setIsRecording] = useState(false);

    const [ispPlay, setIsPlay] = useState(false)


    const startRecording = async () => {
        setIsPlay(false);
        setIsRecording(true);
        const options = { quality: RNCamera.Constants.VideoQuality['4:3'], orientation: RNCamera.Constants.Orientation.landscapeRight };
        const data = await this.camera.recordAsync(options);
        // Convert video to Blob or base64 data
        const videoData = new FormData();
        videoData.append('video', {
            uri: data.uri,
            type: 'video/mp4',
            name: 'video.mp4',
        });
        sendVideoToServer(videoData);
    };

    const stopRecording = () => {
        setIsRecording(false);
        this.camera.stopRecording();
    };

    const sendVideoToServer = async (videoData) => {
        try {
            const response = await fetch(`http://${IP}:8000/upload`, {
                method: 'POST',
                body: videoData,
            });
            if (response.ok) {
                navigation.navigate('AI_SCREEN')
                const video = await response;
                console.log("video", video)
                setIsPlay(true)
            } else {
                console.log('Error uploading video:', response.status);
            }
        } catch (error) {
            console.error('Error uploading video:', error);
        }
    };

    const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);
    const toggleCameraType = () => {
        setCameraType((prevType) =>
          prevType === RNCamera.Constants.Type.back
            ? RNCamera.Constants.Type.front
            : RNCamera.Constants.Type.back
        );
      };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <RNCamera

                    ref={(ref) => {
                        this.camera = ref;
                    }}
                    style={{ flex: 1 }}
                    type={cameraType}
                    captureAudio={false}
                />
                <View style={styles.cameraButtonsContainer}>

                {isRecording ? (
                    <TouchableOpacity style={[styles.cameraButton, { backgroundColor: COLORS.red }]} onPress={stopRecording}>
                        <Text style={{ color: 'white' }}>Stop Recording</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.cameraButton} onPress={startRecording}>
                        <Text style={{ color: 'white', fontSize: 18 }}>Start Recording</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                    <Text style={styles.buttonText}>R</Text>
                </TouchableOpacity>
                </View>

            </View>
        </View>
    );
};

export default CameraScreen;
const styles = StyleSheet.create({
    cameraButtonsContainer:{
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center',
        gap:20,
        position:'absolute',
        bottom: 20,
        alignSelf: 'center'

    },
    cameraButton: {
        backgroundColor: 'green',
        height: 40,
        width: 200,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
      //  position: 'absolute',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    button: {
        backgroundColor: COLORS.primary,
        height:40,
        width:40,
        borderRadius: 50,
        justifyContent:'center',
        alignItems:'center'
    },
})
