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
      <TouchableOpacity
        style={{ position: "absolute", top: 50, left: 20 }}
        onPress={() => props.navigation.goBack()}
      >
        <AntDesign style={styles.back} name="left" size={30} color="white" />
      </TouchableOpacity>
      <View style={{ display: "flex", alignSelf: "center", marginTop: 50 }}>
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: 80, height: 80 }}
        />
      </View>

      <View>
        <Text style={styles.Stockchat}>NEXT, LINK YOUR PORTFOLIO</Text>
      </View>
      <View>
        <Text style={styles.aboutportfolio1}>
          Portfolio linking will help you connect with other investions that own
          the some stocks as you.
        </Text>

        <Text style={styles.aboutportfolio2}>
          If you choose to have a public account, then your portfolio will be
          available to others inside the chat. Dollor amounts will always be
          priate. Only percent changes will be public.
        </Text>
      </View>

      <View style={{ padding: 30, bottom: 30 }}>
        <TouchableOpacity
          style={styles.SelectPetButton}
          onPress={() => props.navigation.push("InviteFriends")}
        >
          <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
            Link Brokerage
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={styles.skipdoitlater}
        onPress={() => props.navigation.push("InviteFriends")}
      >
        skip, do it later
      </Text>
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
    fontSize: 18,
    fontWeight: "bold",
  },
  aboutportfolio1: {
    // marginTop: -20,
    color: "white",
    textAlign: "center",
    fontSize: 14,
    padding: 30,
  },

  aboutportfolio2: {
    bottom: 30,
    color: "white",
    textAlign: "center",
    fontSize: 14,
    padding: 30,
  },
  skipdoitlater: {
    bottom: 30,
    color: "white",
    textAlign: "center",
    fontSize: 15,
    // padding: 30,
  },
});
