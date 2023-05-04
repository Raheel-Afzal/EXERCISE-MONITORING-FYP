import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity ,ToastAndroid} from 'react-native';
import { GoFitSecuredInput, GoFitInput, } from '../components/GoFitInput';
import { GofitBtnMain } from '../components/Button'
import COLORS from '../../consts/colors';
import Sperator from '../components/Sperator';
import { Checkbox } from 'react-native-paper';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';

import IP from '../../consts/IP';
const SignUp = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    clearStates();
  }, [isFocused]);
  const clearStates = () => {
    setEmail('');
    setPassword('');
  };

  const loginHandler = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `http://${IP}/EM_API/api/user/getuser?email=${email}&password=${password}`,
      );
      const data = await response.json();
    //   const data = {
    //     "uid": 5,
    //     "name": "raheel afzal",
    //     "email": "raheel@gmail.com",
    //     "password": "2233",
    //     "profilePic": "",
    //     "gender": "male",
    //     "age": "21",
    //     "height": "5-8",
    //     "weight": "71",
    //     "bmi": "25"
    // }
     
      if (data.uid) {
        navigation.navigate('Home', {
          userData: data,
        });
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      ToastAndroid.showWithGravity(
        'Login Failed: Password or Email not matched Or check your network connection ',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      setLoading(false)
    }
  };
  const [checked, setChecked] = useState(true);
  return (
    <>
      <View style={styles.AppContainer}>
        <View style={styles.Container}>

          <Text style={styles.header}>
            Login to your Account
          </Text>

          <GoFitInput
            value={email}
            onChangeText={text => setEmail(text)}
            icon={require('../../assets/icons/email.png')}
            placeholder={"Email"}
          />
          <GoFitSecuredInput
            value={password}
            onChangeText={text => setPassword(text)}
          />

          <View style={styles.rememberMe}>
            <Checkbox
              color={COLORS.primary}
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text style={{ fontSize: 16 }}>
              Remember me
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <GofitBtnMain
              title={loading ? '' : 'Sign in'}
              onPress={loginHandler}
            />
          </View>
          <View>
            {
              loading &&
              <AnimatedLottieView autoPlay source={require('../../assets/CircleWave.json')} style={styles.LottieView} />
            }
          </View>
          <Text style={styles.fp}>Forgot password?</Text>
        </View>


        <Sperator text={'or continue with'} />
        <View style={styles.IconsContaier}>
          <View style={styles.SocialIcons}>
            <Image
              style={{ height: 50, width: 50 }}
              source={require('../../assets/Facebook.png')}
            />
            <Image
              style={{ height: 50, width: 50 }}
              source={require('../../assets/Twitter.png')}
            />
            <Image
              style={{ height: 50, width: 50 }}
              source={require('../../assets/Gmail.png')}
            />
          </View>


          <View style={styles.signInWraper}>
            <Text >
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
              <Text style={styles.btnSignINText}>Sign up</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  AppContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,

  },
  Container: {
    height: 545,
    justifyContent: 'center',
  },

  header: {
    marginBottom: 70,
    fontSize: 40,
    textAlign: 'left',
    fontWeight: '500',
    color: "#1f1f1f"

  },
  headerText: {
    textAlign: "center",
    color: "#1f1f1f",
    marginTop: 10,
    marginBottom: 30
  },
  profileImg: {
    alignSelf: 'center',
    height: 150,
    width: 150,
    marginBottom: 15,
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20
  },
  fp: {
    textAlign: "center",
    marginTop: 20,
    color: "#4d59ff",
    fontSize: 16

  },
  SignUpText: {
    color: '#855ef3',
    fontSize: 18,
  },
  IconsContaier: {
    justifyContent: 'center',
    alignItems: 'center'

  },
  SocialIcons: {
    flexDirection: 'row',
    gap: 30
  },

  signInWraper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    gap: 10,
  },
  btnSignINText: {
    color: COLORS.primary,
    fontSize: 17,
    fontWeight: "500",

  },
  LottieView: {
    position: 'absolute',
    bottom: 0,
    width: '50%',
    alignSelf: "center"
  }
});
