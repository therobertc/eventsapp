import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  View,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import fire, { firestore } from "../database/firebase";
import { useIsFocused } from "@react-navigation/native";

export default function Login({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPass] = useState();
  const [isLoading, setLoading] = useState(false);
  const isVisible = useIsFocused();

  useEffect(() => {
    if (isVisible) {
      AuthUser();
    }
  }, [isVisible]);

  function AuthUser() {
    fire.auth().onAuthStateChanged(function(user) {
      if (user) {
        navigation.navigate("Chat");
      } else {
      }
    });
  }

  const userLogin = () => {
    setLoading(true);
    if (
      email !== undefined &&
      email !== "" &&
      password !== undefined &&
      password !== ""
    ) {
      fire
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          setEmail("");
          setPass("");
          setLoading(false);
          navigation.navigate("Chat");
        })
        .catch(error => {
          setLoading(false);
          Alert.alert(error.message);
        });
    } else {
      setLoading(false);
      Alert.alert("Enter details to signin!");
    }
  };
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          height: "100%",
          backgroundColor: "#282c34"
        }}
      >
        <ActivityIndicator color="#FFF" size="large" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.tcontainer}>
          <Image
            style={{ height: 150, width: 150 }}
            source={require("../../assets/logo-outline.png")}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.Stockchat}> stockchat</Text>
          </View>
          <Text style={styles.tHeading}>Welcome Back</Text>

          <View
            style={{
              padding: 15,
              width: "100%",
              alignItems: "center",
              marginTop: 15,
              paddingHorizontal: 40
            }}
          >
            <TextInput
              style={styles.inputStyle}
              placeholder="Email"
              value={email}
              onChangeText={val => setEmail(val)}
              placeholderTextColor="#FFF"
            />
            <TextInput
              style={styles.inputStyle}
              placeholder="Password"
              value={password}
              onChangeText={val => setPass(val)}
              maxLength={15}
              secureTextEntry={true}
              placeholderTextColor="#FFF"
            />
            <TouchableOpacity onPress={() => userLogin()}>
              <View style={styles.btn}>
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: "center",
                    color: "#FFF",
                    fontWeight: "600"
                  }}
                >
                  Sign In
                </Text>
              </View>
            </TouchableOpacity>

            <Text
              style={styles.loginText}
              onPress={() => navigation.navigate("ChoosingUsername")}
            >
              Don't have an account? Sign Up
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    //justifyContent: "center",
    backgroundColor: "#282c34"
  },
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
    margin: 20,
    fontSize: 20,
    color: "#FFF"
  },
  loginText: {
    color: "#FFF",
    marginTop: 40,
    textAlign: "center"
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#282c34"
  },
  tcontainer: {
    //backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 100,
    //justifyContent: "center"
    alignItems: "center"
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30
  },
  bcontainer: {
    flex: 1.5,
    borderTopLeftRadius: 90,
    width: "100%",
    padding: 30
  },

  tHeading: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 25,
    paddingTop: 20
  },

  topbcontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  bottombcontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  menuContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
    padding: 30,
    width: "100%",
    backgroundColor: "#282c34",
    borderRadius: 26
  },
  activemenu: {
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
    width: "45%",
    backgroundColor: "#17C37B",
    borderRadius: 10
  },
  activemenuText: {
    fontSize: 20,
    color: "#FFF000",
    marginTop: 5
  },
  aText: {
    color: "#F5F8FA",
    fontSize: 20,
    marginTop: 5
  },

  inputs: {
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
    width: "90%",
    height: "10%",
    borderWidth: 1,
    borderColor: "grey"
  },
  header: { alignItems: "center", padding: 30 },
  btn: {
    backgroundColor: "#147efb",
    padding: 15,
    borderRadius: 30,
    width: 300,
    marginTop: 30
  },
  Stockchat: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold"
    //fontFamily: "Montserrat_700Bold"
  }
});
