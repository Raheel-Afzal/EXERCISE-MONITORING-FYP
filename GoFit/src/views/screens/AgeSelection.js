import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Picker,  } from '@react-native-picker/picker';

const AgeSelection = () => {
    const [selectedLanguage, setSelectedLanguage] = useState();
    return (
        <View>
            <Text>
                age
            </Text>
            <Picker
                shouldRasterizeIOS
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedLanguage(itemValue)
                }>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
            </Picker>
        </View>
    )
}

export default AgeSelection
