import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";
import baseStyles from "../../styles/baseStyles.js";

const CameraScreen = () => {
    return (
        <View style={baseStyles.container}>
            <StatusBar style="auto" />
            <Text>camera</Text>
        </View>
    );
};

export default CameraScreen;
