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
        <Text style={styles.Stockchat}> VERIFY YOUR PHONE NUMBER</Text>
      </View>
      <View>
        <Text style={styles.phonenumber}>
          We'll send youna code to verify your phone number
        </Text>
      </View>
      <View style={{ padding: 20 }}>
        <Input
          inputContainerStyle={{ borderBottomWidth: 0 }}
          style={styles.Input}
          placeholder="Phone Number"
          placeholderTextColor="white"
        />
      </View>
      <View style={{ padding: 30, top: 35 }}>
        <TouchableOpacity
          style={styles.SelectPetButton}
          onPress={() => props.navigation.push("VerifyPhoneNumber")}
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
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  phonenumber: {
    marginTop: -20,
    color: "white",
    textAlign: "center",
    fontSize: 15,
    padding: 55,
  },
  Input: {
    borderBottomWidth: 0,
    backgroundColor: "#3C4956",
    // backgroundColor:"red",
    // borderBottomColor: "#3C4956",
    borderColor: "#3C4956",
    padding: 12,
    paddingLeft: 10,
    color: "white",
    height: 50,
    fontSize: 21,
  },
});
