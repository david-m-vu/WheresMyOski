import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";
import baseStyles from "../../styles/baseStyles.js";

const SettingsScreen = () => {
    return (
        <View style={baseStyles.container}>
            <StatusBar style="auto" />
            <Text style={baseStyles.text}>Profile</Text>
        </View>
    );
};

export default SettingsScreen;