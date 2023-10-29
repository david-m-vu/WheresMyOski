import React from "react";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";

const bearTest = require("../../assets/beartest.png")

const testUsers = [
    {
        userName: "Vincent",
        upVotes: 2,
        downVotes: 3,
        profileImageURI:
            "https://cdn.discordapp.com/attachments/1116575123475005491/1167848986774880366/crown_png.png?ex=654f9f20&is=653d2a20&hm=c33b25dc3eb61478f7418fdb767664293546166236189d56adc61f8d5f342b01&",
    },
    {
        userName: "Earnest",
        upVotes: 20,
        downVotes: 3,
        profileImageURI:
            "https://cdn.discordapp.com/attachments/1116575123475005491/1167848986774880366/crown_png.png?ex=654f9f20&is=653d2a20&hm=c33b25dc3eb61478f7418fdb767664293546166236189d56adc61f8d5f342b01&",
    },
    {
        userName: "William",
        upVotes: 10,
        downVotes: 3,
        profileImageURI:
            "https://cdn.discordapp.com/attachments/1116575123475005491/1167848986774880366/crown_png.png?ex=654f9f20&is=653d2a20&hm=c33b25dc3eb61478f7418fdb767664293546166236189d56adc61f8d5f342b01&",
    },
    {
        userName: "David",
        upVotes: 6,
        downVotes: 23,
        profileImageURI:
            "https://cdn.discordapp.com/attachments/1116575123475005491/1167848986774880366/crown_png.png?ex=654f9f20&is=653d2a20&hm=c33b25dc3eb61478f7418fdb767664293546166236189d56adc61f8d5f342b01&",
    },
    {
        userName: "Anikait",
        upVotes: 5,
        downVotes: 2,
        profileImageURI:
            "https://cdn.discordapp.com/attachments/1116575123475005491/1167848986774880366/crown_png.png?ex=654f9f20&is=653d2a20&hm=c33b25dc3eb61478f7418fdb767664293546166236189d56adc61f8d5f342b01&",
    },
    {
        userName: "Chandragupta",
        upVotes: 85,
        downVotes: 13,
        profileImageURI:
            "https://cdn.discordapp.com/attachments/1116575123475005491/1167848986774880366/crown_png.png?ex=654f9f20&is=653d2a20&hm=c33b25dc3eb61478f7418fdb767664293546166236189d56adc61f8d5f342b01&",
    },
    {
        userName: "Rahul",
        upVotes: 9,
        downVotes: 1,
        profileImageURI:
            "https://cdn.discordapp.com/attachments/1116575123475005491/1167848986774880366/crown_png.png?ex=654f9f20&is=653d2a20&hm=c33b25dc3eb61478f7418fdb767664293546166236189d56adc61f8d5f342b01&",
    },
    {
        userName: "John Cena",
        upVotes: 0,
        downVotes: 19,
        profileImageURI:
            "https://cdn.discordapp.com/attachments/1116575123475005491/1167848986774880366/crown_png.png?ex=654f9f20&is=653d2a20&hm=c33b25dc3eb61478f7418fdb767664293546166236189d56adc61f8d5f342b01&",
    },
    {
        userName: "Abdul",
        upVotes: 23,
        downVotes: 4,
        profileImageURI:
            "https://cdn.discordapp.com/attachments/1116575123475005491/1167848986774880366/crown_png.png?ex=654f9f20&is=653d2a20&hm=c33b25dc3eb61478f7418fdb767664293546166236189d56adc61f8d5f342b01&",
    },
    {
        userName: "Deeznuts",
        upVotes: 102,
        downVotes: 2,
        profileImageURI:
            "https://cdn.discordapp.com/attachments/1116575123475005491/1167848986774880366/crown_png.png?ex=654f9f20&is=653d2a20&hm=c33b25dc3eb61478f7418fdb767664293546166236189d56adc61f8d5f342b01&",
    },
];

const sortUsersByRank = (users) => {
    const usersRanked = users.sort((a, b) => {
        if (calculatePoints(a) < calculatePoints(b)) {
            return 1;
        } else if (calculatePoints(a) > calculatePoints(b)) {
            return -1;
        } else {
            return 0;
        }
    });

    return usersRanked;
};

const calculatePoints = (user) => {
    return user.upVotes - user.downVotes;
};

const getLeaderboardEntryStyle = (index) => {
    if (index === 0) {
        return styles.firstRankInfo;
    } else {
        return styles.rankInfo;
    }
}

const LeaderboardScreen = () => {
    const [rankedUsers, setRankedUsers] = useState([]);

    useEffect(() => {
        // get users
        const rankedUsers = sortUsersByRank(testUsers);
        setRankedUsers(rankedUsers);
    }, []);

    const [fontsLoaded, fontError] = useFonts({
        "Indie Flower": require("../../assets/fonts/IndieFlower-Regular.ttf"),
        "Fuzzy Bubbles Bold": require("../../assets/fonts/FuzzyBubbles-Bold.ttf"),
        "Fuzzy Bubbles Regular": require("../../assets/fonts/FuzzyBubbles-Regular.ttf"),
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <View style={styles.Leaderboard}>
            <StatusBar style="auto" />
            <ScrollView
                style={styles.rankingList}
                contentContainerStyle={styles.rankingListContainer}
            >
                {rankedUsers.map((user, index) => {
                    return (
                        <View key={index} style={getLeaderboardEntryStyle(index)}>
                            <View style={styles.left}>
                                <Text style={styles.leftInfo}>{`${index + 1}. ${
                                    user.userName
                                }`}</Text>
                            </View>
                            {index === 0 && (
                                <View style={styles.middle}>
                                    <Image
                                        style={styles.userIcon}
                                        source={bearTest}
                                    />
                                </View>
                            )}
                            <View style={styles.right}>
                                <Text
                                    style={styles.rightInfo}
                                >{`${calculatePoints(user)} pts`}</Text>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    Leaderboard: {
        width: "100%",
    },
    rankingList: {
        width: "100%",
    },
    rankingListContainer: {},
    rankInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 2,
        padding: 10,
    },
    firstRankInfo: {
        borderBottomWidth: 10,
        borderTopWidth: 10,
        padding: 10,
        backgroundColor: "#f5ce42",
        borderColor: "#66561f",
        fontFamily: "Fuzzy Bubbles Bold"
    },
    leftInfo: {
        fontSize: 24,
        fontFamily: "Fuzzy Bubbles Bold",
    },
    rightInfo: {
        fontSize: 24,
        fontFamily: "Fuzzy Bubbles Regular",
    },
    userIcon: {
        zIndex: 2,
        height: 200,
        width: 200,
        left: 10,
    },
    left: {
        alignItems: "flex-start"
    },
    middle: {
        alignItems: "center"
    },
    right: {
        alignItems: "flex-end"
    }
});

export default LeaderboardScreen;
