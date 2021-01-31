import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Button } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
import firebase, { firestore } from "../../database/firebase";

export default function App({ ...props }) {
  const [isUser, SetUser] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
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
            display: "flex",
            alignSelf: "center",
            marginTop: 10,
            marginBottom: 10
          }}
        >
          <Image
            source={require("../../../assets/logo-outline.png")}
            style={{ width: 150, height: 150 }}
          />
        </View>

        <View>
          <Text style={styles.Stockchat}> stockchat</Text>
        </View>

        <View>
          <Text style={styles.subtext}>Connect with investors</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.getstartedButton}
          onPress={() => props.navigation.push("ChoosingUsername")}
        >
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              color: "#FFF",
              fontWeight: "600"
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>

        <View style={{ marginTop: 20 }}>
          <Text
            style={styles.subtext2}
            onPress={() => props.navigation.push("Login")}
          >
            Already have an account? Sign In
          </Text>
        </View>
        {/* <View>
          <TouchableOpacity onPress={() => props.navigation.push("Login")}>
            <Text style={styles.HaveAccount}>
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getstartedButton: {
    backgroundColor: "#147efb",
    padding: 15,
    borderRadius: 30
  },
  getStarted: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    alignSelf: "center",
    //backgroundColor: "#1E2429",
    backgroundColor: "#282c34",

    width: Dimensions.get("screen").width
  },

  HaveAccount: {
    color: "#FFF",
    textAlign: "center",
    top: 35,
    fontSize: 15
  },
  Stockchat: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 50,
    fontWeight: "800"
    //fontFamily: "Montserrat_700Bold"
  },
  subtext: {
    color: "#FFF",
    textAlign: "center",
    top: 35,
    fontSize: 20,
    marginHorizontal: 40
  },
  subtext2: {
    color: "#FFF",
    textAlign: "center",

    fontSize: 18
  },
  loginText: {
    fontSize: 18
  }
});
