import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../../consts/colors';

const GofitRB = ({ options, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleSelect = (option) => {
        setSelectedOption(option);
        onSelect(option);
    };

    return (
        <View style={styles.wrapper}>
            {options.map((option) => (
                <TouchableOpacity
                    key={option.value}
                    onPress={() => handleSelect(option)}
                    style={styles.radioButton}
                >
                    <LinearGradient
                        colors={option.value === selectedOption.value ? COLORS.gradientPrimary: COLORS.gradientSecondary}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[
                            styles.radioButtonGradient,
                            option === selectedOption && styles.radioButtonGradientChecked,
                        ]}
                    >
                        <View>
                            <Icon
                                name={option.value==="male"?"male":"female"}
                                size={70}
                                color="#FFF"
                                style={styles.radioButtonIcon}
                            />
                            <Text style={styles.radioButtonLabel}>
                                {option.label}
                            </Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        height: 500,
        alignItems: 'center',
        justifyContent: "space-around",
    },
    radioButton: {
        flexDirection: 'row',
    },
    radioButtonGradient: {
        width: 20,
        height: 20,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        height: 180,
        width: 180,

    },
    radioButtonGradientChecked: {
        borderWidth: 2,
        borderColor: '#FFF',

    },
    radioButtonIcon: {
        alignSelf: 'center',
    },
    radioButtonLabel: {
        marginTop: 8,
        fontSize: 22,
        color: COLORS.white,
        fontWeight: 700,
        textAlign:"center",

    },
});

export default GofitRB;
