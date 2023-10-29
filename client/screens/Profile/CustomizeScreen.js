import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";
import baseStyles from "../../styles/baseStyles.js";
import { StyleSheet, Button, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCallback } from 'react';
import { useFonts } from 'expo-font';

const CustomizeScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.result}>
                <View style={styles.titleDiv}>
                    <Text style={styles.titleText}>Customize Oski</Text>
                </View>
                <View style={styles.oskiDiv}>
                </View>
            </View>
            <View style={styles.selection}>
                <View style={styles.innerSelection}>
                </View>
                <View style={styles.bottomSpace}>
                </View>
            </View>
        </View>
    );
};

export default CustomizeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#a19b92",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    result: {
        flex: 4,
        width: "100%",
        alignItems: "center",
    },
    selection: {
        flex: 6,
        backgroundColor: "#aba396",
        width: "100%",
        alignItems: "center",
    },
    innerSelection: {
        flex: 95,
        backgroundColor: "#363533",
        width: "90%",
        borderRadius: 20,
    },
    bottomSpace: {
        flex: 5,
        backgroundColor: "#aba396",
        width: "90%",
        borderRadius: 20,
    },
    titleDiv: {
        flex: 1,
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 20,
        backgroundColor: "#74c9f7",
        marginTop: 20,
        justfiyContent: "center",
    },
    oskiDiv: {
        flex: 3,
    },
    titleText: {
        color: "black",
        fontSize: 30,
        fontWeight: "600",
        fontFamily: "Fuzzy Bubbles Bold",
    },
})

