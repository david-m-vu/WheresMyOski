import React from "react";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";
import { StyleSheet } from "react-native";

import baseStyles from "../../styles/baseStyles.js";

import MapView, { AnimatedRegion, Animated } from "react-native-maps";

const regionData = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

const MapScreen = () => {
    return (
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        />
    );
};

const styles = StyleSheet.create({
    map: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export default MapScreen;
