import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
export default function App({ ...props }) {
  return (
    <View style={styles.getStarted}>
      <TouchableOpacity style={{ position: "absolute", top: 50, left: 20 }} onPress={()=>props.navigation.goBack()}>
        <AntDesign style={styles.back} name="left" size={30} color="white" />
      </TouchableOpacity>
      <View style={{ display: "flex", alignSelf: "center", marginTop: 50 }}>
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: 80, height: 80 }}
        />
      </View>

      <View>
        <Text style={styles.Stockchat}> SUCCESS</Text>
      </View>
      <View>
        <Text style={styles.aboutportfolio1}>
          You're ready to join Stock Chat. The community is excited to have you.
        </Text>
      </View>

      <View style={{ padding: 30, marginTop: 70 }}>
        <TouchableOpacity
          style={styles.SelectPetButton}
          onPress={() => props.navigation.navigate("Chat")}
        >
          <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
            Join Stock Chat
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getStarted: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1E2429",
    width: Dimensions.get("screen").width,
  },
  SelectPetButton: {
    backgroundColor: "#0957BD",
    padding: 15,
    borderRadius: 5,
    // width: 220,
  },
  HaveAccount: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
  },
  Stockchat: {
    marginTop: 10,
    color: "white",
    textAlign: "center",
    fontSize: 20,
    // fontWeight: "bold",
  },
  aboutportfolio1: {
    // marginTop: -20,
    color: "white",
    textAlign: "center",
    fontSize: 15,
    padding: 30,
  },

  aboutportfolio2: {
    bottom: 30,
    color: "white",
    textAlign: "center",
    fontSize: 15,
    padding: 30,
  },
});
