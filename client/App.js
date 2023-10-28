import { StatusBar } from "expo-status-bar";
import { Text, View, Image, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./screens/Home/HomePage.js";
import ProfileScreen from "./screens/Profile/ProfileScreen.js";

import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    options={({ navigation, route }) => ({
                        title: "Home",
                        headerStyle: {
                            backgroundColor: "#f4511e",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Profile")
                                }}
                                style={{ marginRight: 10 }}
                            >
                                <Ionicons
                                    name="person"
                                    size={24}
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
                        title: "Profile",
                        headerStyle: {
                            backgroundColor: "#f4511e",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    })}
                    component={ProfileScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
