import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import COLORS from '../../consts/colors';

interface props {
    options:Array<string>,
    selectedUnit: string,
    onUnitPress:(unit: string) => void
}
const UnitPicker = ({options, selectedUnit, onUnitPress}:props) => {
  return (
    <View style={styles.unitPicker}>
      {options.map((unit, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          onPress={() => onUnitPress(unit)}>
          <Text
            style={[
              styles.selectedUnit,
              selectedUnit == unit ? null : styles.unSelectedUnit,
            ]}>
            {unit}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  unitPicker: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  selectedUnit: {
    backgroundColor: '#3a9eff',
    color: COLORS.white,
    height: 24,
    width: 55,
    fontSize: 13,
    borderRadius: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  unSelectedUnit: {
    backgroundColor: '#aae3f9',
    color: COLORS.dark,
  },
});

export default UnitPicker;
