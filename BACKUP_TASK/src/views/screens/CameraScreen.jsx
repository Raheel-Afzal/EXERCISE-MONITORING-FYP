import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import IP from '../../consts/IP';
import VideoPicker from '../components/VideoPicker';
import VideoPlayer from '../components/VideoPlayer';
import AnimatedLottieView from 'lottie-react-native';
import GofitIcons from '../../consts/ICONS';

const CameraScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const routes = useRoute();

  const exercise_name = routes.params.exercise_name;

  const [cameraVideo, setCameraVideo] = useState({});
  const [loading, setLoading] = useState(false);

  const sendVideoToServer = async () => {
    setLoading(true);
    try {
      const videoData = new FormData();
      videoData.append('exercise_name', exercise_name);
      videoData.append('video', cameraVideo);

      const response = await fetch(`http://${IP}:8000/upload`, {
        method: 'POST',
        body: videoData,
      });
      if (response.ok) {
        navigation.navigate('AI_SCREEN');
      } else {
        console.log('Error uploading video:', response.status);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert('Error uploading video:', error);
    }
  };
  useEffect(() => {
    setCameraVideo({});
  }, [isFocused]);
  return (
    <View style={[styles.container,{    backgroundColor: loading?'#fff':'#1e1e1e',}]}>
      {loading ? (
        <>
          <AnimatedLottieView
            autoPlay
            source={GofitIcons.pleaseWaitLoader}
          />
          <Text
            style={
              styles.pleaseWait
            }>{`Please Wait! \n While we process your video`}</Text>
        </>
      ) : cameraVideo.uri ? (
        <VideoPlayer
          sourceUri={cameraVideo.uri}
          setSourceUri={setCameraVideo}
          handleSendBtn={sendVideoToServer}
        />
      ) : (
        <VideoPicker setCameraVideo={setCameraVideo} />
      )}
    </View>
  );
};

export default CameraScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#1e1e1e',
  },
  pleaseWait: {
    textAlign: 'center',
    color: '#1f1f1f',
    marginHorizontal: 10,
    fontSize: 25,
    marginTop: 250,
  },
});
