import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";
import baseStyles from "../../styles/baseStyles.js";
import { StyleSheet, Button, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCallback } from 'react';
import { useFonts } from 'expo-font';



const ProfileScreen = () => {
    const beartest = require("../../assets/beartest.png")

    const [fontsLoaded, fontError] = useFonts({
        'Indie Flower': require('../../assets/fonts/IndieFlower-Regular.ttf'),
        'Fuzzy Bubbles Bold': require('../../assets/fonts/FuzzyBubbles-Bold.ttf'),
        'Fuzzy Bubbles Regular': require('../../assets/fonts/FuzzyBubbles-Regular.ttf')
    });

    if (!fontsLoaded && !fontError) {
    return null;
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Image
                style={styles.avatar}
                source={beartest}
            />
            <View style={styles.circle} />
            <View style={styles.circleSmall} />
            <View style={styles.pfpBackground}>
            </View>
            <View style={styles.mainContentBuffer}>
            </View>
            <View style={styles.mainContent}>
                <View style={styles.profileTextDiv}>
                    <Text style={styles.profileText}>Vincent Myint</Text>
                </View>
                <View style={styles.rankEncountersDiv}>
                    <View style={styles.rankEncounterSubDiv}>
                        <Text style={styles.rankEncountersText}>#1</Text>
                        <Text style={styles.rankEncountersText}>rank</Text>
                    </View>
                    <View style={styles.rankEncounterSubDiv}>
                        <Text style={styles.rankEncountersText}>30</Text>
                        <Text style={styles.rankEncountersText}>posts</Text>
                    </View>
                </View>
                <View style={styles.pointsDiv}>
                    <View style={styles.rankEncounterSubDiv}>
                        <Text style={styles.rankEncountersText}>300</Text>
                        <Text style={styles.rankEncountersText}>oski rep</Text>
                    </View>
                </View>
                <View style={styles.customizeButtonDiv}>
                <Pressable style={styles.customizeButton}>
                    <Text style={styles.buttonText}>edit my oski</Text>
                </Pressable>
                </View>
            </View>

        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E4DCCF",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    avatar: {
        position: "absolute",
        top: '-2%',
        left: '22%',
        zIndex: 3,
        height: 250,
        width: 250,
    },
    pfpBackground: {
        flex: 20,
        backgroundColor: "#74c9f7",
        width: "100%",
    },
    mainContentBuffer: {
        flex: 8,
        backgroundColor: "#E4DCCF",
        width: "100%",
    },
    mainContent: {
        flex: 75,
        backgroundColor: "#E4DCCF",
        width: "100%",
        alignItems: "center",
    },
    profileTextDiv: {
        flex: 15
    },
    profileText: {
        color: "black",
        fontSize: 45,
        fontWeight: "200",
        fontFamily: "Fuzzy Bubbles Bold",
    },
    rankEncountersText: {
        color: "black",
        fontSize: 40,
        fontWeight: "600",
        fontFamily: "Fuzzy Bubbles Bold",
    },
    rankEncountersDiv: {
        flex: 20,
        flexDirection: 'row',
        borderTopWidth: 2,
        paddingTop: 30,
        borderRadius: 60,
    },
    rankEncounterSubDiv: {
        flex: 50,
        alignItems: "center",
    },
    pointsDiv: {
        paddingTop: 30,
        flex: 30,
    },
    customizeButtonDiv: {
        flex: 25,
        paddingTop: 60,
        borderTopWidth: 2,
        borderRadius: 25,
    },
    customizeButton: {
        backgroundColor: "#74c9f7",
        borderRadius: 20,
    },
    buttonText: {
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        color: "black",
        fontSize: 30,
        fontFamily: "Fuzzy Bubbles Regular",
    },
    circle: {
        width: 170,  // Adjust the width and height to change the circle size
        height: 170, // These values can be the same to make a perfect circle
        borderRadius: 85, // Half of the width/height to make a circle
        backgroundColor: '#fcd67c',
        position: "absolute",
        top: '-0.05%',
        left: '30%',
        zIndex: 2,
        borderColor: 'black',
        borderWidth: 3,
    },
    circleSmall: {
        width: 135,  // Adjust the width and height to change the circle size
        height: 145, // These values can be the same to make a perfect circle
        borderRadius: 67.5, // Half of the width/height to make a circle
        backgroundColor: '#ffcd59',
        position: "absolute",
        top: '3%',
        left: '34.5%',
        zIndex: 2,
    },
});