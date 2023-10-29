import { StyleSheet, Button, Pressable, View, Image } from "react-native";

const Clothingbox = (props) => {
    return (
        <View style={{marginHorizontal: 10, marginVertical: 10}}>
            <View style={styles.selectionClothingBoxOuterSelected}>
                <View style={styles.selectionClothingBoxInner}>
                    <Image
                        style={styles.buttonImage}
                        source={props.img}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    selectionClothingBoxOuterSelected: {
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        height: 100,
        width: 100,
        borderRadius: 20,
        borderWidth: 2,
    },
    selectionClothingBoxInner: {
        backgroundColor: "white",
        width: "90%",
        borderWidth: 5,
        borderColor: "black",
        borderRadius: 20,
        height: "90%",
        alignItems: "center",
        justifyContent: "center",
    },
    selectionClothingBoxInnerLocked: {
        backgroundColor: "#3b3b3b",
        width: "90%",
        borderWidth: 5,
        borderColor: "black",
        borderRadius: 20,
        height: "90%",
        alignItems: "center",
        justifyContent: "center",
    },
    selectionClothingBoxOuterLocked: {
        backgroundColor: "#3b3b3b",
        alignItems: "center",
        justifyContent: "center",
        height: 100,
        width: 100,
        borderRadius: 20,
        borderWidth: 2,
    },
    selectionClothingBoxOuterUnselected: {
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
        height: 100,
        width: 100,
        borderRadius: 20,
        borderWidth: 2,
    },
    buttonImage: {
        zIndex: 3,
        height: 50,
        width: 50,
    },
});

export default Clothingbox;
