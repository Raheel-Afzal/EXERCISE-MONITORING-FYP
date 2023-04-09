import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-paper';
import COLORS from '../../consts/colors';

const GofitBtnMain = ({ title, onPress, style: customStyle }) => {
  return (
    <Button
      mode="elevated"
      buttonColor={COLORS.primary}
      labelStyle={style.LoginText}
      style={[style.Buttons, customStyle]}
      onPress={onPress}>
      {' '}
      {title}
    </Button>
  );
};
const GofitExerciseBtn = ({ title, onPress, Icon }) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <LinearGradient
        colors={['#4d63ff', '#17a4ff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={style.btnGradient}
      >
        <View style={style.btnWraper}>
          <Image
            style={{ height: 60, width: 60 }}
            source={Icon}
            resizeMode={'center'}
          />
          <Text style={style.exerciseText}>
            {title}
          </Text>
          <Image
            style={{ height: 30, width: 30 }}
            source={require('../../assets/Next.png')}
            resizeMode={'center'}
          />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};
const SecondaryButton = ({ title, onPress = () => { } }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={{ ...style.btnContainer, backgroundColor: COLORS.white }}>
        <Text style={{ ...style.title, color: COLORS.primary }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  title: { color: COLORS.white, fontWeight: 'bold', fontSize: 18 },
  btnContainer: {
    backgroundColor: COLORS.primary,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoginText: {
    color: '#fff',
    fontSize: 20,
  },
  Buttons: {
    borderRadius: 30,
    height: 50,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnGradient: {
    width: 20,
    height: 20,
    borderRadius: 20,
    height: 90,
    width: 320,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3
  },
  btnWraper: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  exerciseText: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: "600",
    fontFamily: "Facon",
  },
});

export { GofitBtnMain, SecondaryButton, GofitExerciseBtn };
