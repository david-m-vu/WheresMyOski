import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";
import { StyleSheet, Button, Pressable } from "react-native";
import { useState } from "react";
import Clothingbox from "../../components/ClothingBox.js"

const CustomizeScreen = () => {
    const beartest = require("../../assets/beartest.png")
    const spotlight = require("../../assets/spotlight_png.png")
    const unselectedHat = require("../../assets/hat_png.png")
    const selectedHat = require("../../assets/hatselect_png.png")
    const unselectedShirt = require("../../assets/shirt_png.png")
    const selectedShirt = require("../../assets/shirtselect_png.png")

    const oskiHead = require("../../assets/oski_head.png")
    const oskiBody = require("../../assets/oski_body.png")
    const sunOskiHead = require("../../assets/sun_oski_head.png")
    const bowOskiHead = require("../../assets/bowtie_oski_head.png")
    const crownOskiHead = require("../../assets/crown_oski_head.png")
    const capOskiHead = require("../../assets/cap_oski_head.png")
    const hoodieOskiBody = require("../../assets/hoodie_oski_body.png")
    const skirtOskiBody = require("../../assets/skirt_oski_body.png")
    const fannyOskiBody = require("../../assets/fanny_oski_body.png")
    const calOskiBody = require("../../assets/cal_oski_body.png")

    const headArray = [oskiHead, sunOskiHead, bowOskiHead, capOskiHead, crownOskiHead]
    const bodyArray = [oskiBody, hoodieOskiBody, skirtOskiBody, fannyOskiBody, calOskiBody]

    const [ wardrobe, setWardrobe ] = useState("hat")

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.result}>
                <View style={styles.titleDiv}>
                    <Text style={styles.titleText}></Text>
                </View>
                <View style={styles.oskiDiv}>
                    <Image
                        style={styles.avatarImage}
                        source={beartest}
                    />
                    <Image
                        style={styles.spotlightImage}
                        source={spotlight}
                    />
                </View>
            </View>
            <View style={styles.selection}>
                <View style={styles.innerSelection}>
                    <View style={styles.selectionButtonDiv}>
                        <View style={styles.selectionIcon}>
                            <Pressable style={
                                    styles.customizeButton} 
                                    onPress={() => {
                                        setWardrobe("hat")
                                    }
                                }>
                                { wardrobe === "hat" ?
                                    (
                                    <Image
                                        style={styles.buttonImage}
                                        source={selectedHat}
                                    />
                                    )
                                    : (
                                    <Image
                                        style={styles.buttonImage}
                                        source={unselectedHat}
                                    />
                                    )
                                }
                            </Pressable>
                        </View>
                        <View style={styles.selectionIcon}>
                            <Pressable style={
                                    styles.customizeButton} 
                                    onPress={() => {
                                        setWardrobe("shirt")
                                    }
                                }>
                                { wardrobe === "shirt" ?
                                    (
                                    <Image
                                        style={styles.buttonImage}
                                        source={selectedShirt}
                                    />
                                    )
                                    : (
                                    <Image
                                        style={styles.buttonImage}
                                        source={unselectedShirt}
                                    />
                                    )
                                }
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.selectionClothingDiv}>
                            {wardrobe === "hat" ? headArray.map((head) => {
                                return (
                                    <Clothingbox img={head}></Clothingbox>
                                )
                            }): bodyArray.map((body) => {
                                return (
                                    <Clothingbox img={body}></Clothingbox>
                                )
                            })}
                    </View>
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
        backgroundColor: "#363533",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    result: {
        flex: 4,
        width: "100%",
        alignItems: "center",
    },
    avatarImage: {
        position: "absolute",
        top: '16.5%',
        right: '-11.5%',
        zIndex: 3,
        height: 250,
        width: 250,
    },
    buttonImage: {
        zIndex: 3,
        height: 50,
        width: 50,
    },
    spotlightImage: {
        zIndex: 2,
        height: 265,
        width: 174,
    },
    selection: {
        flex: 6,
        backgroundColor: "#363533",
        width: "100%",
        alignItems: "center",
    },
    innerSelection: {
        flex: 95,
        backgroundColor: "#aba396",
        width: "85%",
        borderRadius: 20,
    },
    bottomSpace: {
        flex: 5,
        backgroundColor: "#363533",
        width: "85%",
        borderRadius: 20,
    },
    titleDiv: {
        flex: 1,
        alignItems: "center",
        // borderWidth: 2,
        // borderRadius: 20,
        // backgroundColor: "#74c9f7",
        marginTop: 10,
        justfiyContent: "center",
    },
    oskiDiv: {
        flex: 18,
    },
    titleText: {
        color: "black",
        fontSize: 30,
        fontWeight: "600",
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 7,
        paddingRight: 7,
        fontFamily: "Fuzzy Bubbles Bold",
    },
    selectionButtonDiv: {
        flex: 2,
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
    },
    selectionIcon: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    selectionClothingDiv: {
        flex: 12,
        alignItems: "space-evenly",
        justifyContent: "center",
        flexDirection: "row-reverse",
        flexWrap: "wrap",
        width: "100%",
        height: "100%",
    },
})

