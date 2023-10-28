import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";
import baseStyles from "../../styles/baseStyles.js";

const LoginScreen = () => {
    return (
        <View style={baseStyles.container}>
            <StatusBar style="auto" />
        </View>
    );
};

export default LoginScreen;
