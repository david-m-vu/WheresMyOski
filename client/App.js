import { StatusBar } from "expo-status-bar";
import { Text, View, Image, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./screens/Home/HomePage.js";
import ProfileScreen from "./screens/Profile/ProfileScreen.js";
import {Dimensions} from 'react-native';

import { Ionicons } from "@expo/vector-icons";
import SettingsScreen from "./screens/Profile/SettingsScreen.js";

const Stack = createStackNavigator();
const windowHeight = Dimensions.get('window').height;

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
            >
                <Stack.Screen
                    name="Home"
                    options={({ navigation, route }) => ({
                        title: "Home",
                        headerStyle: {
                            backgroundColor: "#74c9f7",
                            height: windowHeight * 0.13,
                        },
                        headerTintColor: "#000",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Profile");
                                }}
                                style={{ marginRight: "5%" }}
                            >
                                <Ionicons
                                    name="person"
                                    size={40}
                                    color="black"
                                />
                            </TouchableOpacity>
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
                          <Ionicons style={{marginLeft: "5%",}} name="arrow-back" size={40} color="black"/>
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
                              <Ionicons
                                  name="cog"
                                  size={40}
                                  color="black"
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
                            height: windowHeight * 0.15,
                        },
                        headerTintColor: "#000",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    })}
                    component={SettingsScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
