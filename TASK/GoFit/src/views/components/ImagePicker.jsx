import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {Button, Text} from 'react-native-paper';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import COLORS from '../../consts/colors';

const ImagePicker = ({imageData, setImageData}) => {
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else {
      return true;
    }
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 800,
      maxHeight: 500,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      // console.log('Capture Image if block');
      launchCamera(options, response => {
        // console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        setImageData({
          uri: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: response.assets[0].type,
        });
      });
    }
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }

      setImageData({
        uri: response.assets[0].uri,
        name: response.assets[0].fileName,
        type: response.assets[0].type,
      });
    });
  };

  return (
    <View style={styles.container}>
      
      <Image
          style={styles.profileImg}
          source={ imageData.uri? {uri: imageData.uri}: require('../../assets/user.png')}
          resizeMode={'center'}
        />
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => chooseFile('photo')}>
          Choose Image
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => captureImage('photo')}>
          Capture Image
        </Button>
      </View>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  button: {
    marginHorizontal: 10,

      backgroundColor: COLORS.primary,
      height: 45,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center'
    
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
    borderWidth: 2,
    borderColor: 'black',
  },
  profileImg: {
    alignSelf: 'center',
    height: 150,
    width: 150,
    marginBottom: 15,
    borderRadius:100,
  },

});
