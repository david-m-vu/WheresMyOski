import React from "react";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image, ScrollView } from "react-native";
import { StyleSheet } from "react-native";

import Post from "../../components/Post.js";

const vincentProfileImage = "https://cdn.discordapp.com/attachments/1116575123475005491/1167848986774880366/crown_png.png?ex=654f9f20&is=653d2a20&hm=c33b25dc3eb61478f7418fdb767664293546166236189d56adc61f8d5f342b01&";
const vincentPostImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Sather_Gate_at_University_of_California%2C_Berkeley%2C_California_LCCN2013633500_%28edited%29.jpg/1200px-Sather_Gate_at_University_of_California%2C_Berkeley%2C_California_LCCN2013633500_%28edited%29.jpg";

const earnestProfileImage = "https://cdn.discordapp.com/attachments/1116575123475005491/1167848986221215945/bowtie_png.png?ex=654f9f1f&is=653d2a1f&hm=09be90246d44eb03b611cbd1ccb893b8685b6ff2589081fe431199287287bac8&";
const earnestPostImage = "https://cdn.vox-cdn.com/thumbor/4rJ7OdYmzECdCYZCms00CyNZyyg=/0x0:5568x3712/1200x0/filters:focal(0x0:5568x3712):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/11816637/usa_today_10376139.jpg";

const williamProfileImage = "https://cdn.discordapp.com/attachments/1116575123475005491/1167848985780830228/sunny_png.png?ex=654f9f1f&is=653d2a1f&hm=db160f065c08eef6d485892d3025e9f8a67b2d152256e18bb9d8188643020b26&";
const willaimPostImage = "https://cdn.vox-cdn.com/thumbor/GEIqlRDAgBZjLE_xCm-1JziMuiQ=/0x67:2292x1595/1400x1400/filters:focal(0x67:2292x1595):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/46878282/GettyImages-465939066.0.jpg";

const testPosts = [
    {
        id: 1,
        userName: "Vincent",
        profileImageURI: vincentProfileImage,
        location: "Sather Gate",
        time: "3:30 PM",
        date: "Aug 30",
        imageURI: vincentPostImage,
        upVotes: 2,
        downVotes: 3,
    },
    {
        id: 2,
        userName: "Earnest",
        profileImageURI: earnestProfileImage,
        location: "Cal Memorial Stadium",
        time: "12:30 PM",
        date: "Aug 30",
        imageURI: earnestPostImage,
        upVotes: 20,
        downVotes: 3,
    },
    {
        id: 3,
        userName: "William",
        profileImageURI: williamProfileImage,
        location: "Sather Gate",
        time: "9:30 AM",
        date: "Aug 29",
        imageURI: willaimPostImage,
        upVotes: 10,
        downVotes: 3,
    },
];

const HomePage = ({ navigation }) => {
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        setPostData(testPosts);
    });

    return (
        <View style={styles.HomePageContent}>
            <StatusBar style="auto" />
            <ScrollView style={styles.posts} contentContainerStyle={styles.postsContainer}>
                {postData.map((post) => {
                    return (
                        <Post
                            key={post.id}
                            userName={post.userName}
                            profileImageURI={post.profileImageURI}
                            location={post.location}
                            time={post.time}
                            date={post.date}
                            imageURI={post.imageURI}
                            upVotes={post.upVotes}
                            downVotes={post.downVotes}
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    HomePage: {},
    HomePageContent: {
        display: "flex",
        alignItems: "center",
        width: "100%",
    },
    posts: {
        width: "100%"
    },
    postsContainer: {
        gap: 20,
        alignItems: "center",
    }
});

export default HomePage;
