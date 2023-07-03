import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import UnitPicker from './UnitPicker';
import COLORS from '../../consts/colors';



const UnitDisplay = ({ icon, value, options, selectedUnit, onUnitPress }) => {
  return (
    <View style={styles.unitWrapper}>
      <View style={styles.unitsIcon}>
        <Image style={{ height: 30, width: 30 }} source={icon} resizeMode="center" />
      </View>
      <Text style={styles.unitNumber}>{value}</Text>
      <UnitPicker options={options} selectedUnit={selectedUnit} onUnitPress={onUnitPress} />
    </View>
  );
};

export default UnitDisplay

const styles = StyleSheet.create({
  unitWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
},
unitsIcon: {
    flex: 1.5,
},

unitNumber: {
    fontSize: 15,
    textAlign: "center",
    borderBottomWidth: 1.3,
    borderBottomColor: COLORS.grey
},
})