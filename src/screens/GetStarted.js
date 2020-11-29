import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Button } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
export default function App({ ...props }) {
  return (
    <View style={styles.getStarted}>
      <View>
      <View style={{ display: "flex", alignSelf: "center", marginTop:50 }}>
        <Image source={require('../../assets/logo.png')} style={{width:80, height:80}} />
      </View>

        <View>
          <Text style={styles.Stockchat}> stockchat</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.getstartedButton}
          onPress={() => props.navigation.push("ChoosingUsername")}
        >
          <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
            Get Started
          </Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.HaveAccount}>
            Already have an account? Sign In
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getstartedButton: {
    backgroundColor: "#0957BD",
    padding: 15,
    borderRadius: 5,
    width: 220,
  },
  getStarted: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#1E2429",
    width: Dimensions.get("screen").width,
  },

  HaveAccount: {
    color: "white",
    textAlign: "center",
    top: 35,
    fontSize: 15,
  },
  Stockchat: {
    color: "white",
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
  },
});
