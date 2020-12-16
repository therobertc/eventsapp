import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Alert, Keyboard, Linking,
} from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { Input } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import {firestore} from "../../database/firebase";

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {" "}
      {children}
    </TouchableWithoutFeedback>
);

export default function App({ ...props }) {

  const _notificationSetup = async() =>{
    try {
      const { existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
            Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Alert.alert(
            "Enable Notifications",
            "Open your notification settings and turn on notifications for ChartBot",
            [
              { text: "cancel", onPress: () => console.log("cancel") },
              { text: "Allow", onPress: () => Linking.openURL("app-settings:") }
            ],
            { cancelable: false }
        );
      }
      await Notifications.getExpoPushTokenAsync().then((token)=>{
        firestore.collection('profile').doc(props.route.params.username).set({"token":token},{ merge: true });
        props.navigation.push("Chat");
      }).catch(error=> props.navigation.push("Chat"));
    } catch (e) {
      alert(e.message);
      console.log(e);
    }
  }
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
              style={{ width: 150, height: 150 }}
          />
        </View>

        <View>
          <Text style={styles.Stockchat}> TURN ON NOTIFICATIONS</Text>
        </View>
        <View>
          <Text style={styles.username}>
            You'll be notified when you get new messages. You can update your
            notification settings inside the app.
          </Text>
        </View>

        <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
          <View
              style={{
                paddingHorizontal: 10,
                top: 60,
                justifyContent: "center",
                alignItems: "center"
              }}
          >
            <TouchableOpacity
                style={styles.Button}
                onPress={() => _notificationSetup ()}
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
                <Text style={styles.username}>I'll do this later</Text>
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