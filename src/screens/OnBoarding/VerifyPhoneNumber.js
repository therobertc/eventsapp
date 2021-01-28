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

export default function App({ route, navigation }) {
  const { username, phoneNo } = route.params;
  return (
    <View style={styles.getStarted}>
      <TouchableOpacity
        style={{ position: "absolute", top: 50, left: 20 }}
        onPress={() => navigation.goBack()}
      >
        <AntDesign style={styles.back} name="left" size={30} color="#FFF" />
      </TouchableOpacity>
      <View style={{ display: "flex", alignSelf: "center", marginTop: 100 }}>
        <Image
          source={require("../../../assets/logo-outline.png")}
          style={{ width: 80, height: 80 }}
        />
      </View>

      <View>
        <Text style={styles.Stockchat}> VERIFY PHONE NUMBER</Text>
      </View>
      <View>
        <Text style={styles.username}>
          Enter the code we sent you to verify your phone number.
        </Text>
      </View>

      <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
        <View style={{ paddingTop: 50, paddingHorizontal: 10 }}>
          <Input
            //einputContainerStyle={{ borderBottomWidth: 0 }}
            style={styles.Input}
            placeholder="Enter Code"
            placeholderTextColor="lightgrey"
          />
        </View>

        <View
          style={{
            paddingHorizontal: 10,
            top: 50,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            style={styles.Button}
            onPress={() =>
              navigation.navigate("SignUp", {
                username: username,
                phoneNo: phoneNo
              })
            }
          >
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                color: "#FFF",
                fontWeight: "600"
              }}
            >
              Continue
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
    backgroundColor: "#282c34",
    width: Dimensions.get("screen").width
  },
  Button: {
    backgroundColor: "#147efb",
    padding: 15,
    borderRadius: 30,
    width: "100%"
  },
  HaveAccount: {
    color: "#F5F8FA",
    textAlign: "center",
    fontSize: 15
  },
  Stockchat: {
    marginTop: 50,
    color: "#FFF",
    fontSize: 18,
    //width: Dimensions.get("screen").width,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Montserrat_700Bold"
  },
  username: {
    marginTop: 10,
    color: "#FFF",
    textAlign: "center",
    fontSize: 15,
    padding: 18
  },
  Input: {
    borderBottomWidth: 0,
    backgroundColor: "#282c34",
    //backgroundColor: "red",
    //borderBottomColor: "#FFF",
    //borderColor: "#3C4956",
    borderColor: "#FFF",
    padding: 12,
    paddingLeft: 30,
    color: "#FFF",
    height: 50,
    fontSize: 21,
    borderRadius: 30
  }
});
