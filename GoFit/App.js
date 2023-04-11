import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import COLORS from './src/consts/colors';
import OnBoardScreen from './src/views/screens/OnBoardScreen';
import Login from './src/views/screens/Login';
import SignUp from './src/views/screens/SignUp';
import BottomCartCard from './src/views/components/BottomCartCard';
import BottomNavigator from './src/views/navigation/BottomNavigator';
import ExercisesScreen from './src/views/screens/ExercisesScreen';
import Profile from './src/views/screens/Profile';
import GenderSelection from './src/views/screens/GenderSelection';
import AgeSelection from './src/views/screens/AgeSelection';
import ExerciseDetail from './src/views/screens/ExerciseDetail';
import SplashScreen from './src/views/screens/SplashScreen';
import EditProfile from './src/views/screens/EditProfile';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="BoardScreen" component={OnBoardScreen} />
        <Stack.Screen name="LoginScreen" component={Login} />
        <Stack.Screen name="SignUpScreen" component={SignUp} />
        <Stack.Screen name="Home" component={BottomNavigator} />
        <Stack.Screen name="ProfileScreen" component={Profile} />
        <Stack.Screen name="EditProfileScreen" component={EditProfile} />
        <Stack.Screen name="GenderSelection" component={GenderSelection} />
        <Stack.Screen name="AgeSelection" component={AgeSelection} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
