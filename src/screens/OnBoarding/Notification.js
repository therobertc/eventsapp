import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from "react-native";
import { Input } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {" "}
    {children}
  </TouchableWithoutFeedback>
);

export default function App({ ...props }) {
  return (
    <View style={styles.getStarted}>
      <TouchableOpacity
        style={{ position: "absolute", top: 50, left: 20 }}
        onPress={() => props.navigation.goBack()}
      >
        <AntDesign style={styles.back} name="left" size={30} color="black" />
      </TouchableOpacity>
      <View style={{ display: "flex", alignSelf: "center", marginTop: 100 }}>
        <Image
          source={require("../../../assets/logo-outline.png")}
          style={{ width: 80, height: 80 }}
        />
      </View>

      <View>
        <Text style={styles.Stockchat}> TURN ON NOTIFICATIONS</Text>
      </View>
      <View>
        <Text style={styles.username}>
          You'll get notified when your friends mention you in the chat and when
          your stocks are moving.
        </Text>
      </View>

      <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
        <View
          style={{
            paddingHorizontal: 10,
            top: 100,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            style={styles.Button}
            onPress={() => props.navigation.push("Success")}
          >
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                color: "white",
                fontWeight: "600"
              }}
            >
              Turn on Notifications
            </Text>
          </TouchableOpacity>

          <View>
            <TouchableOpacity onPress={() => props.navigation.push("Success")}>
              <Text style={styles.username}>Skip</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: "white",
    width: Dimensions.get("screen").width
  },
  Button: {
    backgroundColor: "#147efb",
    padding: 15,
    borderRadius: 30,
    width: "100%"
  },
  HaveAccount: {
    color: "white",
    textAlign: "center",
    fontSize: 15
  },
  Stockchat: {
    marginTop: 50,
    color: "black",
    fontSize: 18,
    //width: Dimensions.get("screen").width,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Montserrat_700Bold"
  },
  username: {
    marginTop: 10,
    color: "black",
    textAlign: "center",
    fontSize: 15,
    padding: 18
  },
  Input: {
    borderBottomWidth: 0,
    backgroundColor: "white",
    //backgroundColor: "red",
    //borderBottomColor: "black",
    //borderColor: "#3C4956",
    borderColor: "black",
    padding: 12,
    paddingLeft: 30,
    color: "black",
    height: 50,
    fontSize: 21,
    borderRadius: 30
  }
});
