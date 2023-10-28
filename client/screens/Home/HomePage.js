import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";
import baseStyles from "../../styles/baseStyles.js";

const oskiImage = require("../../assets/oski_sus.jpeg")

const FeedScreen = ({navigation}) => {
    return (
        <View style={baseStyles.container}>
            <StatusBar style="auto" />
            <Text style={baseStyles.text}>William Sucks Ballssssss</Text>
            <Image source={oskiImage} />
        </View>
    );
};

export default FeedScreen;
