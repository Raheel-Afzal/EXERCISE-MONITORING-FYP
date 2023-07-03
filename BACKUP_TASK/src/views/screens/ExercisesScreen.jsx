import React from 'react'
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import COLORS from '../../consts/colors';
import exercises from '../../consts/exercises';
import { GofitExerciseBtn } from '../components/Button';

const ExercisesScreen = ({ navigation }) => {
    return (
        <>
            <StatusBar barStyle={'light-content'} backgroundColor={COLORS.primary}></StatusBar>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Let's WorkOut</Text>
                </View>
                <View style={styles.ExercisesContainer}>
                    {
                        exercises.map((exercise) => (
                            <GofitExerciseBtn
                                key={exercise.id}
                                title={exercise.name}
                                Icon={exercise.icon}
                                onPress={() => navigation.navigate("ExerciseDetail", { exercise })}
                            />
                        ))
                    }
                </View>
            </View>
        </>
    )
}

export default ExercisesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    header: {
        flex: 1,
        backgroundColor: COLORS.primary,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        justifyContent: "center",
        alignItems: "center"
    },
    headerText: {
        fontSize: 30,
        color: COLORS.white,
        fontWeight: "600"
    },
    ExercisesContainer: {
        flex: 5,
        justifyContent: "center",
        alignItems: "center",
        gap: 25

    },


})