import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import COLORS from '../../consts/colors';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const LogsScreen = ({navigation}) => {
  const isFocused = useIsFocused();

  const routes = useRoute();
  const userId = routes.params.userId;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const fetchUserLogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://192.168.43.251/EM_API/api/Exercises/getExrLogs?uid=${userId}`,
      );
      const data = await response.json();
      setData(data);

      setLoading(false);
    } catch (error) {
      ToastAndroid.showWithGravity(
        error,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserLogs();
  }, [isFocused]);
  console.log('data', data);
  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={COLORS.primary}></StatusBar>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Your Exercise Logs</Text>
        </View>
        <View style={styles.ExercisesContainer}>
          {loading ? (
            <ActivityIndicator size={'small'} />
          ) : (
            <FlatList
              data={data}
              renderItem={({item}) => (
                <TouchableOpacity activeOpacity={0.7} onPress={()=>navigation.navigate('LogDetailScreen',{userId:userId})} style={{marginVertical:10}}>
                  <LinearGradient
                    colors={['#4d63ff', '#17a4ff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.btnGradient}>
                    <View style={styles.btnWraper}>
                      <View style={{flex:0.6,alignItems:'flex-end'}}>
                        <Text style={{color: 'white'}}>Exercise Name</Text>
                        <Text style={{color: 'white'}}> Reps</Text>
                        <Text style={{color: 'white'}}>Date</Text>
                        <Text style={{color: 'white'}}>Time</Text>
                      </View>
                      <View style={{flex:1,alignItems:'flex-start'}}>
                        <Text style={{color: 'white'}}>
                          {' '}
                          {item.exerciseName}
                        </Text>
                        <Text style={{color: 'white'}}> {item.reps}</Text>
                        <Text style={{color: 'white'}}>{new Date(item.time).toDateString()}</Text>
                        <Text style={{color: 'white'}}>{new Date(item.time).toLocaleTimeString()}</Text>
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </View>
    </>
  );
};

export default LogsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  headerText: {
    fontSize: 30,
    color: COLORS.white,
    fontWeight: '600',
  },
  ExercisesContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
  },
  title: {color: COLORS.white, fontWeight: 'bold', fontSize: 18},
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
    borderRadius: 20,
    height: 130,
    width: 320,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 6,
  },
  btnWraper: {
    gap:35,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  exerciseText: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: '600',
    fontFamily: 'Facon',
  },
});
