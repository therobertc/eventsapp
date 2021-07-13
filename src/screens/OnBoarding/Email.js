import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { Input } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import validate from "react-native-web/dist/exports/StyleSheet/validate";
import { Icon, Header, Left, Right, Body, Button } from "native-base";
import { Feather } from "@expo/vector-icons";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {" "}
    {children}
  </TouchableWithoutFeedback>
);

function ValidateEmail(email) {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );
}

export default function App({ ...props }) {
  const [email, setEmail] = useState("");

  const submitEmail = () => {
    if (email === undefined || email == null || email.trim() === "") {
      alert("Email can,t be blank !!");
      return false;
    }
    if (!ValidateEmail(email)) {
      alert("Invalid Email !!");
      return false;
    }
    props.navigation.push("PhoneNumber", {
      username: props.route.params.username,
      email: email,
    });
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

              justifyContent: "center",
              alignItems: "center",
              borderColor: "#000",
              borderRadius: 25,
              height: 50,
              width: 50,
              borderWidth: 2,
              borderBottomWidth: 5,
            }}
            onPress={() => props.navigation.goBack()}
          >
            <AntDesign style={styles.back} name="left" size={30} color="#000" />
          </TouchableOpacity>
        </Left>
      </Header>

      <View>
        <Text style={styles.heading}>Welcome, JMJ.</Text>
      </View>

      {/* <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}> */}
      <View
        style={{
          paddingTop: 100,
          //width: "100%",
          //paddingHorizontal: 10,
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <View>
          <Input
            inputContainerStyle={{ borderBottomWidth: 0, width: 60 }}
            style={styles.Input}
            placeholder="__"
            placeholderTextColor="lightgrey"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View>
          <Input
            inputContainerStyle={{ borderBottomWidth: 0, width: 60 }}
            style={styles.Input}
            placeholder="__"
            placeholderTextColor="lightgrey"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View>
          <Input
            inputContainerStyle={{ borderBottomWidth: 0, width: 60 }}
            style={styles.Input}
            placeholder="__"
            placeholderTextColor="lightgrey"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View>
          <Input
            inputContainerStyle={{ borderBottomWidth: 0, width: 60 }}
            style={styles.Input}
            placeholder="__"
            placeholderTextColor="lightgrey"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
      </View>

      <View
        style={{
          paddingTop: 50,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text style={styles.subheading}>Didn't get a text?</Text>
        <Text style={styles.sendAgain}>Send Again</Text>
      </View>

      <View
        style={{
          paddingHorizontal: 10,
          top: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <TouchableOpacity
              onPress={performCreateGroup}
              isLoading={isLoading}
            >
              <View style={styles.btn}>
                <Text
                  style={{ color: "#F5F8FA", fontSize: 19, fontWeight: "bold" }}
                >
                  Create Group
                </Text>
              </View>
            </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.Button}
          onPress={() => props.navigation.push("Activity")}

          // onPress={() => submitEmail()}
        >
          <Text
            style={{
              fontSize: 25,
              textAlign: "center",
              color: "#000",
              fontWeight: "600",
            }}
          >
            Verify
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
            onPress={() => props.navigation.goBack("Password")}
          >
            <Text style={styles.username}>I'll do this later</Text>
          </TouchableOpacity> */}
      </View>
      {/* </KeyboardAvoidingView> */}
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
  Button: {
    backgroundColor: "#B295EF",
    paddingVertical: 20,
    paddingHorizontal: 80,
    borderRadius: 20,
    borderWidth: 2,
    borderBottomWidth: 5,
    width: "100%",
    top: 110,
  },
  HaveAccount: {
    color: "#F5F8FA",
    textAlign: "center",
    fontSize: 15,
  },
  heading: {
    marginTop: 100,
    color: "#000",
    fontSize: 30,
    //width: Dimensions.get("screen").width,
    fontWeight: "800",
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
  },
  username: {
    marginTop: 10,
    color: "#FFF",
    textAlign: "center",
    fontSize: 15,
    padding: 18,
  },
  Input: {
    borderWidth: 2,
    backgroundColor: "#FFF",
    //borderBottomColor: "#FFF",
    //borderColor: "#3C4956",
    borderColor: "#000",
    //width: 20,
    top: 50,
    padding: 15,
    //paddingLeft: 30,
    color: "#000",
    //height: 50,
    fontSize: 21,
    borderRadius: 20,
    borderWidth: 2,
    borderBottomWidth: 5,
  },
  subheading: {
    marginTop: 10,
    color: "grey",
    fontSize: 20,
    //width: Dimensions.get("screen").width,
    fontWeight: "800",
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
  },
  sendAgain: {
    marginTop: 10,
    color: "orange",
    fontSize: 20,
    paddingLeft: 10,
    //width: Dimensions.get("screen").width,
    fontWeight: "800",
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
  },
});
