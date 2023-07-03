import React, {useState, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import COLORS from '../../consts/colors';
import {GofitBtnMain} from './Button';

const VideoPlayer = ({sourceUri, setSourceUri, handleSendBtn}) => {
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);

  const onSeek = seek => {
    videoPlayer.current.seek(seek);
  };

  const onPaused = playerState => {
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };

  const onProgress = data => {
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = data => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = data => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const onSeeking = currentTime => setCurrentTime(currentTime);

  return (
    <View style={styles.container}>
      <View style={styles.VideoPlayer}>
        <Video
          onEnd={onEnd}
          onLoad={onLoad}
          onLoadStart={onLoadStart}
          onProgress={onProgress}
          paused={paused}
          ref={videoPlayer}
          resizeMode="cover"
          source={{
            uri: sourceUri,
          }}
          style={styles.mediaPlayer}
          volume={0}
        />
        <MediaControls
          duration={duration}
          isLoading={isLoading}
          mainColor={COLORS.primary}
          onPaused={onPaused}
          onReplay={onReplay}
          onSeek={onSeek}
          onSeeking={onSeeking}
          playerState={playerState}
          progress={currentTime}
        />
      </View>
      <View style={styles.BtnContainer}>
        <GofitBtnMain
          style={{width: 250}}
          title={'Monitor Exercise'}
          onPress={() => handleSendBtn()}
        />
        <GofitBtnMain
          style={{width: 250, backgroundColor: COLORS.red}}
          title={'Delete'}
          onPress={() => setSourceUri({})}
        />
      </View>
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 30,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.grey,
  },
  VideoPlayer: {
    marginTop:150,
    flex: 0.7,
    width: 300,

  },
  BtnContainer: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
    gap: 20,
  },
});
