import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  Linking,
} from "react-native";
import { Button } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
import firebase, { firestore } from "../../database/firebase";

export default function App({ ...props }) {
  const [isUser, SetUser] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        props.navigation.navigate("Chat");
      }
    });
  }, []);

  return (
    <View style={styles.getStarted}>
      <View>
        <View
          style={{
            backgroundColor: "yellow",
            height: 300,
            width: 300,
            borderRadius: 150,
            borderWidth: 2,
            borderBottomWidth: 5,
          }}
        ></View>
        <View
          style={{
            display: "flex",
            alignSelf: "center",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          {/* <Image
            source={require("../../../assets/icon.png")}
            style={{ width: 200, height: 200, borderRadius: "150" }}
          /> */}
          {/* <Image
            source={require("../../../assets/palmicon.png")}
            style={{
              width: 200,
              height: 200,
              borderRadius: "150",
              alignSelf: "center",
            }}
          /> */}

          <Text style={styles.heading}>la.chat 🌴</Text>
        </View>

        <View style={{ flexDirection: "column" }}></View>

        <Text
          style={{
            fontSize: 25,
            textAlign: "center",
            color: "#FFF",
            fontWeight: "600",
            paddingTop: 30,
            fontWeight: "700",
          }}
        >
          Get access to the best LA {"\n"} tech events ✨
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.getstartedButton}
          onPress={() => props.navigation.push("PhoneNumber")}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              color: "#000",
              fontWeight: "800",
            }}
          >
            Get Me On The List
          </Text>
        </TouchableOpacity>

        <View style={{ marginTop: 20 }}>
          {/* <Image
            source={require("../../../assets/icon.png")}
            style={{
              width: 100,
              height: 100,
              borderRadius: "150",
              //justifyContent: "flex-end",
              alignSelf: "flex-end",
              //marginLeft: 30,
            }}
          /> */}
          {/* <Text
            style={styles.subtext2}
            onPress={() => props.navigation.push("Login")}
          >
            Already have an account? Sign In
          </Text> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getstartedButton: {
    backgroundColor: "#B295EF",
    paddingVertical: 20,
    paddingHorizontal: 80,
    borderRadius: 20,
    borderWidth: 2,
    borderBottomWidth: 5,
    width: "100%",
    top: 50,
  },
  getStarted: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    alignSelf: "center",
    //backgroundColor: "#1E2429",
    backgroundColor: "#FF914D",

    width: Dimensions.get("screen").width,
  },

  HaveAccount: {
    color: "#FFF",
    textAlign: "center",
    top: 35,
    fontSize: 15,
  },

  emoji: {
    fontSize: 80,
  },
  stockchat: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 50,
    fontWeight: "500",
    fontFamily: "Avenir",
  },
  subtext: {
    color: "#000",
    textAlign: "center",
    top: 15,
    fontSize: 35,
    marginHorizontal: 20,
    //fontFamily: "Menlo-Regular",
    fontWeight: "900",
  },
  subtext2: {
    color: "#000",
    textAlign: "center",

    fontSize: 15,
  },
  loginText: {
    fontSize: 18,
  },
  heading: {
    marginTop: 50,
    color: "#FFF",
    fontSize: 30,
    //width: Dimensions.get("screen").width,
    fontWeight: "800",
    textAlign: "left",
    fontFamily: "Montserrat_700Bold",
  },
});
