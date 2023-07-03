import React, { useState } from 'react';
import { StyleSheet, View, Image, Text,TouchableOpacity } from 'react-native';
import {GoFitInput} from '../components/GoFitInput';
import { GofitBtnMain } from '../components/Button'
import COLORS from '../../consts/colors';
import Sperator from '../components/Sperator';
import ImagePicker from '../components/ImagePicker';
const SignUp = ({ navigation }) => {
  const [name,setName] = useState('');
  const [email, setEmail] = useState('');
  const [password,setPassword]= useState('');
  const [imageData,setImageData]= useState({});
  return (
    <>
      <View style={styles.AppContainer}>

        <Text style={styles.header}>
          Fill Your Profile
        </Text>
        <Text style={styles.headerText}>
          Don't worry. you can always change it later
        </Text>

       <ImagePicker imageData={imageData} setImageData={setImageData} />

        <GoFitInput
          value={name}
          onChangeText={text => setName(text)}
          icon={require('../../assets/icons/avatar.png')}
          placeholder={"Full Name"}
        />
        <GoFitInput
          value={email}
          onChangeText={text => setEmail(text)}
          icon={require('../../assets/icons/email.png')}
          placeholder={"Email"}
        />
        <GoFitInput
          value={password}
          onChangeText={text => setPassword(text)}
          icon={require('../../assets/icons/lock.png')}
          placeholder={"Password"}
        />
        <View style={styles.buttonContainer}>
          <GofitBtnMain
            title='Sign Up'          
            onPress={() => navigation.navigate('GenderSelection',{userData:{name,email,password,imageData}})}
          />
        </View>

        {/* <Sperator text={'or continue with'} />

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
        </View> */}


        <View style={styles.signInWraper}>
          <Text >
            Already have an Account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.btnSignINText}>Sign in</Text>
          </TouchableOpacity>
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
  header: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '500',
    color: "#1f1f1f"

  },
  headerText: {
    textAlign: "center",
    color: "#1f1f1f",
    marginTop: 10,
    marginBottom: 30
  },

  buttonContainer: {
    alignItems: 'center',
    marginTop: 20
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

  }
});
