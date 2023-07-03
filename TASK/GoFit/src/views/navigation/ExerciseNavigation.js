import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExercisesScreen from '../screens/ExercisesScreen';
import ExerciseDetail from '../screens/ExerciseDetail';
import COLORS from '../../consts/colors';
import AI_SCREEN from '../screens/AI_SCREEN';
import CameraScreen from '../screens/CameraScreen';

const Stack = createNativeStackNavigator();

const ExerciseNavigation = () => {
  return (
    <NavigationContainer independent={true}>


      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ExercisesScreen" component={ExercisesScreen} />
        <Stack.Screen name="ExerciseDetail" component={ExerciseDetail} />
        <Stack.Screen name="AI_SCREEN" component={AI_SCREEN}/>
        <Stack.Screen name="CameraScreen" component={CameraScreen}/>


        

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ExerciseNavigation;
