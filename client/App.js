import { StatusBar } from "expo-status-bar";
import { Text, View, Image, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./screens/Home/HomePage.js";
import ProfileScreen from "./screens/Profile/ProfileScreen.js";
import LeaderboardScreen from "./screens/Leaderboard/LeaderboardScreen.js"
import CustomizeScreen from "./screens/Profile/CustomizeScreen.js"
import { Dimensions } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import SettingsScreen from "./screens/Profile/SettingsScreen.js";
import baseStyles from "./styles/baseStyles.js";
import { FontAwesome5 } from '@expo/vector-icons';
const Stack = createStackNavigator();
const windowHeight = Dimensions.get("window").height;
const titleImage = require("./assets/titlelogo_png.png");
const backIcon = require("./assets/backarrow.png");
const profileIcon = require("./assets/profile.png");
const trophyIcon = require("./assets/trophy.png");
const settingsIcon = require("./assets/settings.png");
const logoIcon = require("./assets/logo_png.png");




const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    options={({ navigation, route }) => ({
                        title: "",
                        headerStyle: {
                            backgroundColor: "#74c9f7",
                            height: windowHeight * 0.13,
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
                                        style={{ marginRight: "5%" }}
                                    >
                                      <Image
                                          style={
                                            {
                                              height: 35,
                                              width: 35,
                                              zIndex: 4,
                                            }
                                          }
                                          source={trophyIcon}
                                      />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate("Profile");
                                        }}
                                        style={{ marginRight: "5%" }}
                                    >
                                      <Image
                                        style={
                                          {
                                            height: 35,
                                            width: 35,
                                            zIndex: 4,
                                          }
                                        }
                                        source={profileIcon}
                                      />
                                    </TouchableOpacity>
                                </View>
                            );
                        },
                        headerLeft: () => (
                            <View style={{flexDirection: "row"}}>
                              <Image
                                style={
                                  {
                                    marginLeft: 10,
                                    height: 40,
                                    width: 40,
                                    zIndex: 4,
                                  }
                                }
                                source={logoIcon}
                              />
                              <Image
                                style={
                                  {
                                    marginLeft: 6,
                                    height: 35,
                                    width: 160,
                                    zIndex: 4,
                                  }
                                }
                                source={titleImage}
                              />
                            </View>
                        ),
                    })}
                    component={HomePage}
                />
                <Stack.Screen
                    name="Profile"
                    options={({ navigation, route }) => ({
                        title: "",
                        headerStyle: {
                            backgroundColor: "#74c9f7",
                            height: windowHeight * 0.13,
                        },
                        headerTintColor: "#000",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        headerShadowVisible: false,
                        headerBackImage: () => (
                          <Image
                              style={
                                {
                                  height: 40,
                                  width: 40,
                                  zIndex: 4,
                                  marginLeft: 10,
                                }
                              }
                              source={backIcon}
                          />
                        ),
                        headerBackTitle: () => (
                          <Text>" "</Text>
                        ),
                        headerRight: () => (
                          <TouchableOpacity
                              onPress={() => {
                                  navigation.navigate("Settings");
                              }}
                              style={{ marginRight: "5%" }}
                          >
                            <Image
                              style={
                                {
                                  height: 40,
                                  width: 40,
                                  zIndex: 4,
                                }
                              }
                              source={settingsIcon}
                            />
                          </TouchableOpacity>
                      ),
                    })}
                    component={ProfileScreen}
                />
                <Stack.Screen
                    name="Settings"
                    options={({ navigation, route }) => ({
                        title: "Settings",
                        headerStyle: {
                            backgroundColor: "#74c9f7",
                            height: windowHeight * 0.13,
                        },
                        headerTintColor: "#000",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    })}
                    component={SettingsScreen}
                />
                <Stack.Screen
                    name="Leaderboard"
                    options={({ navigation, route }) => ({
                        title: "Leaderboard",
                        headerStyle: {
                            backgroundColor: "#74c9f7",
                            height: windowHeight * 0.13,
                        },
                        headerTintColor: "#000",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    })}
                    component={LeaderboardScreen}
                />
                <Stack.Screen
                    name="Customize"
                    options={({ navigation, route }) => ({
                        title: "",
                        headerStyle: {
                            backgroundColor: "#74c9f7",
                            height: windowHeight * 0.13,
                        },
                        headerTintColor: "#000",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        headerShadowVisible: false,
                        headerBackImage: () => (
                          <Image
                            style={
                              {
                                height: 40,
                                width: 40,
                                zIndex: 4,
                                marginLeft: 10,
                              }
                            }
                            source={backIcon}
                          />
                        ),
                        headerBackTitle: () => (
                          <Text>" "</Text>
                        ),
                    })}
                    component={CustomizeScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
