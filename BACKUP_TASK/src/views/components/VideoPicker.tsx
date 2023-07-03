import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {Button, Text} from 'react-native-paper';

import {
  CameraOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import COLORS from '../../consts/colors';

interface CameraVideoState {
  uri: string | undefined;
  name: string | undefined;
  type: string | undefined;
}

interface CameraVideoProp {
  setCameraVideo: React.Dispatch<React.SetStateAction<CameraVideoState>>;
}

const VideoPicker = ({setCameraVideo}: CameraVideoProp) => {
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
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
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err: any) {
        Alert.alert('Write permission err', err);
      }
      return false;
    } else {
      return true;
    }
  };

  const captureImage = async () => {
    let options: CameraOptions = {
      mediaType: 'video',
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
          Alert.alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          Alert.alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          Alert.alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          if (response.errorMessage) {
            Alert.alert(response.errorMessage);
          }
          return;
        }
        console.log('response', response);
        if (response.assets) {
          setCameraVideo({
            uri: response.assets[0].uri,
            name: response.assets[0].fileName,
            type: response.assets[0].type,
          });
        }
      });
    }
  };

  const chooseFile = () => {
    let options: CameraOptions = {
      mediaType: 'video',
    };
    launchImageLibrary(options, response => {
      if (response) {
        if (response.didCancel) {
          Alert.alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          Alert.alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          Alert.alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          if (response.errorMessage) {
            Alert.alert(response.errorMessage);
          }
          return;
        }
        if (response.assets) {
          setCameraVideo({
            uri: response.assets[0].uri,
            name: response.assets[0].fileName,
            type: response.assets[0].type,
          });
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => chooseFile()}>
          Upload Video
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => captureImage()}>
          Capture Video
        </Button>
      </View>
    </View>
  );
};

export default VideoPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
    alignSelf: 'center',
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
    borderRadius: 100,
  },
});
