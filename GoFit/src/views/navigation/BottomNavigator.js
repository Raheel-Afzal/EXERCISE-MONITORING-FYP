import 'react-native-gesture-handler';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import COLORS from '../../consts/colors';
import ExercisesScreen from '../screens/ExercisesScreen';
import Profile from '../screens/Profile';
import ExerciseNavigation from './ExerciseNavigation';

const Tab = createBottomTabNavigator();

const BottomNavigator = ({route})  => {
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.primary,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 60,
        },

      }}

    >
      <Tab.Screen
        name="Exercises"
        component={ExerciseNavigation}
        
        options={{
          tabBarLabelStyle: {
            color: COLORS.white,
            fontSize: 15,
            marginBottom: 2,

          },
          tabBarHideOnKeyboard: true,
          tabBarIcon: () => (
            <FaIcon name="dumbbell" color={COLORS.white} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={route.params}
        options={{
          tabBarLabelStyle: {
            color: COLORS.white,
            fontSize: 15,
            marginBottom: 2,
          },
          
          tabBarIcon: () => (
            <FaIcon name="user-alt" color={COLORS.white} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
