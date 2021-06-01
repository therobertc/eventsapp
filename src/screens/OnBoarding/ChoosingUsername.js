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
      <TouchableOpacity
        style={{ position: "absolute", top: 50, left: 20 }}
        onPress={() => props.navigation.goBack()}
      >
        <AntDesign style={styles.back} name="left" size={30} color="#FFF" />
      </TouchableOpacity>
      <View style={{ display: "flex", alignSelf: "center", marginTop: 100 }}>
        <Image
          source={require("../../../assets/logo-outline.png")}
          style={{ width: 150, height: 150 }}
        />
      </View>

      <View>
        <Text style={styles.Stockchat}>CREATE YOUR USERNAME</Text>
      </View>
      <View>
        <Text style={styles.username}>
          Usernames will be tagged in messages and shown inside your groups.
        </Text>
      </View>

      <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
        <View style={{ paddingTop: 50, paddingHorizontal: 10 }}>
          <Input
            //einputContainerStyle={{ borderBottomWidth: 0 }}
            style={styles.Input}
            placeholder="Username"
            placeholderTextColor="lightgrey"
            onChangeText={(username) => setUsername(username)}
          />
          {/* <TextInput
              style={styles.inputStyle}
              placeholder="Enter Group Name"
              value={groupName}
              // onValidateTextField = {validateField}
              onChangeText={val => setGroupName(val)}
            /> */}
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
            onPress={() => createUserInFirestore()}
          >
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                color: "#FFF",
                fontWeight: "600",
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
    width: Dimensions.get("screen").width,
  },
  Button: {
    backgroundColor: "#147efb",
    padding: 15,
    borderRadius: 30,
    width: "100%",
  },
  HaveAccount: {
    color: "#F5F8FA",
    textAlign: "center",
    fontSize: 15,
  },
  Stockchat: {
    marginTop: 50,
    color: "#FFF",
    fontSize: 18,
    //width: Dimensions.get("screen").width,
    fontWeight: "bold",
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
    borderRadius: 30,
  },
});
