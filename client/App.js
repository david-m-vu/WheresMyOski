import { StatusBar } from "expo-status-bar";
import { Text, View, Image, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./screens/Home/HomePage.js";
import ProfileScreen from "./screens/Profile/ProfileScreen.js";
import LeaderboardScreen from "./screens/Leaderboard/LeaderboardScreen.js"
import { Dimensions } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import baseStyles from "./styles/baseStyles.js";

const Stack = createStackNavigator();
const windowHeight = Dimensions.get("window").height;

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    options={({ navigation, route }) => ({
                        title: "",
                        headerStyle: {
                            backgroundColor: "#21b0ff",
                            height: windowHeight * 0.15,
                        },
                        headerTintColor: "#000",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        headerRight: () => {
                            return (
                                <View style={{ flexDirection: "row" }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate("Leaderboard");
                                        }}
                                        style={{ marginRight: 10 }}
                                    >
                                        <FontAwesome5
                                            name="trophy"
                                            size={24}
                                            color="black"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate("Profile");
                                        }}
                                        style={{ marginRight: 10 }}
                                    >
                                        <Ionicons
                                            name="person"
                                            size={24}
                                            color="black"
                                        />
                                    </TouchableOpacity>
                                </View>
                            );
                        },
                        headerLeft: () => (
                            <TouchableOpacity style={{ marginLeft: 10 }}>
                                <Text style={baseStyles.headerText}>
                                    Where's My Oski?
                                </Text>
                            </TouchableOpacity>
                        ),
                    })}
                    component={HomePage}
                />
                <Stack.Screen
                    name="Profile"
                    options={({ navigation, route }) => ({
                        title: "Profile",
                        headerStyle: {
                            backgroundColor: "#AEE2FF",
                            height: windowHeight * 0.15,
                        },
                        headerTintColor: "#000",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    })}
                    component={ProfileScreen}
                />
                <Stack.Screen
                    name="Leaderboard"
                    options={({ navigation, route }) => ({
                        title: "Leaderboard",
                        headerStyle: {
                            backgroundColor: "#AEE2FF",
                            height: windowHeight * 0.15,
                        },
                        headerTintColor: "#000",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    })}
                    component={LeaderboardScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
