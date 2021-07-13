import React, { useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Input } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { firestore } from "../../database/firebase";
import { Icon, Header, Left, Right, Body, Button } from "native-base";
import { Feather } from "@expo/vector-icons";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {" "}
    {children}
  </TouchableWithoutFeedback>
);

export default function App({ ...props }) {
  const [username, setUsername] = useState("");

  const createUserInFirestore = () => {
    if (username === undefined || username === null || username.trim() === "") {
      alert("Username can't be blank!!");
      return false;
    }

    let user_name = username.trim().toLowerCase();
    firestore
      .collection("profile")
      .doc(user_name)
      .get()
      .then((doc) => {
        if (doc.exists) {
          alert("Username already exists!!");
          return false;
        } else {
          props.navigation.push("Email", { username: user_name });
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.getStarted}>
      <Header
        style={{
          backgroundColor: "#FFF",
          borderBottomWidth: 0.1,
          borderBottomColor: "#FFF",
        }}
      >
        <Left>
          <TouchableOpacity
            style={{
              position: "absolute",
              //top: 50,
              left: 20,
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              borderColor: "#000",
              borderRadius: 25,
              height: 50,
              width: 50,
            }}
            onPress={() => props.navigation.goBack()}
          >
            <AntDesign style={styles.back} name="left" size={30} color="#000" />
          </TouchableOpacity>
        </Left>
      </Header>

      <View style={{ display: "flex", marginTop: 50, paddingLeft: 20 }}>
        {/* <Image
          source={require("../../../assets/icon.png")}
          style={{ width: 250, height: 250, borderRadius: 150 }}
        /> */}
        <Text style={styles.heading}>VERIFY YOUR{"\n"}ADDy</Text>
      </View>

      <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
        <View style={{ paddingTop: 100, paddingHorizontal: 10 }}>
          <Input
            inputContainerStyle={{ borderBottomWidth: 0 }}
            style={styles.Input}
            placeholder="Phone Number"
            placeholderTextColor="grey"
            //onChangeText={(username) => setUsername(username)}
          />
        </View>

        <View
          style={{
            paddingHorizontal: 10,
            top: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={styles.Button}
            // onPress={() => createUserInFirestore()}
            onPress={() => props.navigation.push("Activity")}
          >
            <Text
              style={{
                fontSize: 25,
                textAlign: "center",
                color: "#000",
                fontWeight: "600",
              }}
            >
              Get In
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  getStarted: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    width: Dimensions.get("screen").width,
  },
  HaveAccount: {
    color: "#F5F8FA",
    textAlign: "center",
    fontSize: 15,
  },
  heading: {
    marginTop: 50,
    color: "#000",
    fontSize: 30,
    //width: Dimensions.get("screen").width,
    fontWeight: "800",
    textAlign: "left",
    fontFamily: "Montserrat_700Bold",
  },
  username: {
    marginTop: 10,
    color: "#FFF",
    textAlign: "center",
    fontSize: 15,
    padding: 18,
  },
  Button: {
    backgroundColor: "#147efb",
    padding: 15,
    borderRadius: 20,
    borderWidth: 2,
    width: "100%",
    top: 150,
  },
  Input: {
    borderWidth: 2,
    backgroundColor: "#FFF",
    //borderBottomColor: "#FFF",
    //borderColor: "#3C4956",
    borderColor: "#000",
    top: 50,
    padding: 15,
    paddingLeft: 30,
    color: "#000",
    //height: 50,
    fontSize: 21,
    borderRadius: 20,
  },
});
