import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Divider} from 'react-native-paper';
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';
import GofitIcons from '../../consts/ICONS';
const ExerciseDetail = ({route}) => {
  const navigation = useNavigation();
  const userId = route.params.uid;
  const exercise = route.params.exercise;
  const steps = exercise.instruction.split('#');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backWard}>
          <Icon
            style={styles.backArrow}
            name="keyboard-backspace"
            size={35}
            color={COLORS.white}
          />
          <Text style={styles.headerText}>Exercise Detail</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.gifContainer}>
        <Image
                    style={{ height: 165, width: 330 }}
                    source={exercise.gif}
                    resizeMode={'contain'}
                />
        {/* <AnimatedLottieView autoPlay source={GofitIcons.pushUpsAnimation} style={{ height: 165, width: 330 }} /> */}
      </View>
      <Divider style={{height: 2}} />

      <View style={styles.exerciseInfo}>
        <Text style={styles.exerciseName}>Exercise Name: {exercise.name} </Text>
        <View style={styles.muscleNameWrapper}>
          <Text>Primary muscles: </Text>
          <Text style={styles.muscleName}>{exercise.primaryMuscles}</Text>
        </View>
        <View style={styles.muscleNameWrapper}>
          <Text>Secondary muscles: </Text>
          <Text style={styles.muscleName}>{exercise.secondaryMuscles}</Text>
        </View>
      </View>
      <Text style={styles.intrucText}>Instructions</Text>
      <Text style={styles.stepsText}>Steps:</Text>
      <View style={styles.stepsWrapper}>
        <View style={{height: 200}}>
          <FlatList
            persistentScrollbar
            data={steps}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <Text style={styles.exerciseSteps} key={index}>{`${
                index + 1
              }.) ${item} `}</Text>
            )}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.AiButton}
          onPress={() =>
            navigation.navigate('CameraScreen', {exercise_name: exercise.key,uid:userId})
          }>
          <Image
            style={styles.AiArm}
            source={require('../../assets/AiArmLeft.png')}
            resizeMode={'center'}
          />
          <Text style={styles.AiText}>AI-Instructor</Text>
          <Image
            style={styles.AiArm}
            source={require('../../assets/AiArmRight.png')}
            resizeMode={'center'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExerciseDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
  },
  header: {
    flex: 0.4,
    width: 360,
    right: 10,
    backgroundColor: COLORS.primary,
  },
  backWard: {
    flexDirection: 'row',
  },
  headerText: {
    left: 90,
    top: 2,
    fontSize: 16,
    color: COLORS.white,
  },
  backArrow: {
    bottom: 7,
    left: 10,
    position: 'relative',
  },
  gifContainer: {
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseInfo: {
    flex: 2,
    gap: 10,
    justifyContent: 'center',
  },
  exerciseName: {
    fontSize: 20,
    color: COLORS.dark,
    fontFamily: 'BAHNSCHRIFT-SemiCondensed',
  },
  muscleNameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  muscleName: {
    fontWeight: '600',
    color: COLORS.dark,
    fontSize: 16,
  },

  intrucText: {
    flex: 0.5,
    fontSize: 20,
    color: COLORS.dark,
    fontFamily: 'BAHNSCHRIFT-SemiCondensed',
    backgroundColor: COLORS.light,
    textAlignVertical: 'center',
    paddingLeft: 10,
  },
  stepsText: {
    flex: 0.7,
    fontSize: 17,
    color: COLORS.dark,
    textAlignVertical: 'center',
  },
  stepsWrapper: {
    flex: 4,
    paddingLeft: 10,
  },
  exerciseSteps: {
    color: '#454545',
    marginVertical: 10,
  },
  AiButton: {
    height: 50,
    width: 200,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#131630',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  AiArm: {
    height: 42,
    width: 42,
    opacity: 0.8,
  },

  AiText: {
    color: COLORS.white,
    // marginLeft: 10,
    fontSize: 20,
  },
});
