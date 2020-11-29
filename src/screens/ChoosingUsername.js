import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Input } from "react-native-elements";
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
        <Text style={styles.Stockchat}> START BY CHOOSING A USERNAME</Text>
      </View>
      <View>
        <Text style={styles.username}>
          Usernames will be displayed in the chat, so make sure you choose
          something you like.
        </Text>
      </View>
      <View style={{ padding: 20 }}>
        <Input
          inputContainerStyle={{ borderBottomWidth: 0 }}
          style={styles.Input}
          placeholder="Username"
          placeholderTextColor="white"
        />
      </View>
      <View style={{ padding: 30, top: 35 }}>
        <TouchableOpacity
          style={styles.SelectPetButton}
          onPress={() => props.navigation.push("PhoneNumber")}
        >
          <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
            Continue
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
    fontSize: 18,
    width: Dimensions.get("screen").width,
    fontWeight: "bold",
  },
  username: {
    // marginTop: 10,
    color: "white",
    textAlign: "center",
    fontSize: 15,
    padding: 18,
  },
  Input: {
    borderBottomWidth: 0,
    backgroundColor: "#3C4956",
    // backgroundColor:"red",
    // borderBottomColor: "#3C4956",
    borderColor: "#3C4956",
    padding: 12,
    paddingLeft: 30,
    color: "white",
    height: 50,
    fontSize: 21,
  },
});
