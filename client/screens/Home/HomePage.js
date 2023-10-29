import React from "react";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image, ScrollView } from "react-native";
import { StyleSheet } from "react-native";

import MapScreen from "./MapScreen.js";
import CameraScreen from "./CameraScreen.js";
import FeedScreen from "./FeedScreen.js";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const homeUnselectedIcon = require("../../assets/homeunselected.png");
const cameraIcon = require("../../assets/camera.png");
const mapUnselectedIcon = require("../../assets/mapunselected.png");

const Tab = createBottomTabNavigator();

const HomePage = ({ navigation }) => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Feed"
                component={FeedScreen}
                options={({ navigation, route }) => ({
                    tabBarShowLabel: false,
                    title: "",
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: "#74c9f7",
                    },
                    tabBarIcon: ({ color, size }) => (
                        <Image source={homeUnselectedIcon} style={styles.homeUnselectedIcon}/>
                    ),
                })}
            />
            <Tab.Screen
                name="Camera"
                component={CameraScreen}
                options={({ navigation, route }) => ({
                    tabBarShowLabel: false,
                    title: "",
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: "#74c9f7",
                    },
                    tabBarIcon: ({ color, size }) => (
                        <Image source={cameraIcon} style={styles.homeUnselectedIcon}/>
                      ),
                })}
            />
            <Tab.Screen
                name="Map"
                component={MapScreen}
                options={({ navigation, route }) => ({
                    tabBarShowLabel: false,
                    title: "",
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: "#74c9f7",
                    },
                    tabBarIcon: ({ color, size }) => (
                        <Image source={mapUnselectedIcon} style={styles.homeUnselectedIcon}/>
                      ),
                })}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    homeUnselectedIcon: {
        width: 30,
        height: 30
    }
})

export default HomePage;
