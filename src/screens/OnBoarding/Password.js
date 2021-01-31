import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";
import { Input } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import firebase, { firestore } from "../../database/firebase";
import URL from "./../../../Constant/Constant"
import axios from 'axios';

export default function App({ ...props }) {
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");

  const send_mail = async (email) => {
      return axios.post(URL.HOST_URL + "api/stockchat/send_welcome_mail/", {email:email});
  }

  const _signUp = () => {
    if (password === undefined || password === null || password.trim() === "") {
      alert("Password can't be blank...");
      return false;
    }
    let email = props.route.params.email.toLowerCase();
    let phone = props.route.params.phone;
    let username = props.route.params.username.toLowerCase();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password.trim())
      .then(user => {
        user.user.updateProfile({
          displayName: username
        });
        setUserId(user.user.uid);
        var user_id = user.user.uid;
        firestore
          .collection("profile")
          .doc(username)
          .set({
            email: email,
            phone: phone,
            username: username,
            password: password,
            user_id: user_id
          })
          .then(res => {
            firestore
              .collection("users")
              .doc(user_id)
              .set({
                id: user_id,
                Name: username,
                email: email,
                phoneNo: phone
              })
              .then(async () => {
                await send_mail(email);
                props.navigation.push("Chat", { username: username });
              })
              .catch(error => alert(error.message));
          })
          .catch(error => alert(error.message));
      })
      .catch(error => alert(error.message));
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
        <Text style={styles.Stockchat}>CREATE A PASSWORD</Text>
      </View>
      <View>
        <Text style={styles.username}>
          Create a password to secure your account.
        </Text>
      </View>

      <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
        <View style={{ paddingTop: 50, paddingHorizontal: 10 }}>
          <Input
            //einputContainerStyle={{ borderBottomWidth: 0 }}
            style={styles.Input}
            placeholder="Password"
            placeholderTextColor="lightgrey"
            onChangeText={password => setPassword(password)}
            secureTextEntry={true}
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
            alignItems: "center"
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
          <TouchableOpacity style={styles.Button} onPress={() => _signUp()}>
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
    backgroundColor: "#35383F",
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
    backgroundColor: "#35383F",
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
