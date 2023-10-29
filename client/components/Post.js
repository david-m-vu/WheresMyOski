import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";
import { StyleSheet } from "react-native";
import { useFonts } from 'expo-font';
import { AntDesign } from "@expo/vector-icons";

const Post = (props) => {
    const [fontsLoaded, fontError] = useFonts({
        'Indie Flower': require('../assets/fonts/IndieFlower-Regular.ttf'),
        'Fuzzy Bubbles Bold': require('../assets/fonts/FuzzyBubbles-Bold.ttf'),
        'Fuzzy Bubbles Regular': require('../assets/fonts/FuzzyBubbles-Regular.ttf')
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    const calculateVotePercentage = () => {
        return (props.upVotes / (props.downVotes + props.upVotes)) * 100;
    };

    const determineVoteColor = () => {
        if (calculateVotePercentage() > 50) {
            return styles.votePercentageGreen;
        } else {
            return styles.votePercentageRed;
        }
    };

    return (
        <View style={styles.Post}>
            <View style={styles.postInfo}>
                <View style={styles.identification}>
                    <View style={styles.userInfo}>
                        <Image
                            source={{ uri: props.profileImageURI }}
                            style={styles.profileImage}
                        />
                        <Text style={styles.userName}>{props.userName}</Text>
                    </View>
                    <Text style={styles.subText}>{props.location}</Text>
                </View>
                <View style={styles.dateTime}>
                    <Text style={styles.timeText}>{props.time}</Text>
                    <Text style={styles.subText}>{props.date}</Text>
                </View>
            </View>
            <Image style={styles.postImage} source={{ uri: props.imageURI }} />
            <View style={styles.userInteractables}>
                <Text style={styles.questionText}>Is this Oski?</Text>
                <View style={styles.voteButtons}>
                    <Text
                        style={determineVoteColor()}
                    >{`${calculateVotePercentage().toFixed(2)}%`}</Text>
                    <AntDesign name="arrowdown" size={24} color="black" />
                    <AntDesign name="arrowup" size={24} color="black" />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Post: {
        width: "100%",
        padding: 10,
        gap: 10,
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: "10%",
        paddingRight: "10%",
        borderWidth: 1,
        borderColor: "#b8b8b8",
        backgroundColor: "#fffbe8",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
    },
    userInfo: {
        flexDirection: "row",
    },
    profileImage: {
        position: "absolute",
        top: "-50%",
        left: -15,
        zIndex: 5,
        height: 50,
        width: 50,
    },
    postInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    postImage: {
        width: "100%",
        height: 200,
        borderRadius: 10,
    },
    identification: {
        gap: 1,
    },
    userInfo: {},
    dateTime: {
        alignItems: "flex-end",
        gap: 1,
    },
    userInteractables: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    voteButtons: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
    },
    votePercentageGreen: {
        fontFamily: "Fuzzy Bubbles Bold",
        fontSize: 24,
        color: "#3ede41",
    },
    votePercentageRed: {
        fontFamily: "Fuzzy Bubbles Bold",
        fontSize: 24,
        color: "#eb3443",
    },
    userName: {
        marginLeft: 20,
        fontSize: 24,
        fontWeight: 500,
        fontFamily: "Fuzzy Bubbles Bold",
    },
    timeText: {
        fontSize: 24,
        fontFamily: "Fuzzy Bubbles Bold",
    },
    questionText: {
        fontSize: 24,
    },
    subText: {
        fontFamily: "Fuzzy Bubbles Bold",
        fontSize: 20,
        color: "#4d4d4d",
    },
});

export default Post;
