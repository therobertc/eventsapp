import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  Platform,
  StyleSheet,
  TextInput,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TextInputComponent,
  Alert
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import fire, { firestore } from "../../database/firebase";
import { Input } from "react-native-elements";

import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import CustomTextField from "../../components/CustomTextField";

export default function AddGroup(props) {
  const [groupName, setGroupName] = useState();
  const [errorState, setErrorState] = useState("");
  const [isLoading, setisLoading] = useState(false);

  function createGroupToFirebaseGroup() {
    setisLoading(true);
    const groupRef = firestore.collection("publicgroups").doc();
    const userID = fire.auth().currentUser.uid;

    groupRef
      .set({
        groupID: groupRef.id,
        groupName: groupName,
        userID: userID
      })
      .then(function(docRef) {
        setisLoading(false);
        console.log("Document Written with ID", groupRef.id);
        addMemberOfChatInFirebase(groupRef.id, userID);
      })
      .catch(function(error) {
        Alert.alert(error.message);
        setisLoading(false);
        console.log("error adding Doc", error);
      });
  }
  function addMemberOfChatInFirebase(groupID, userID) {
    const memberRefs = firestore
      .collection("members")
      .doc(groupID)
      .collection("member")
      .doc();
    memberRefs
      .set({
        userID: userID
      })
      .then(function(docRef) {
        props.navigation.goBack();
      })
      .catch(function(error) {
        setisLoading(false);
        console.error("Error adding Document", error);
      });
  }

  function createPublicGroup() {
    createGroupToFirebaseGroup();
  }

  function createPrivateGroup() {
    if (groupName !== undefined && groupName !== "") {
      var UserId = fire.auth().currentUser.uid;
      firestore
        .collection("users")
        .doc(UserId)
        .collection("Groups")
        .doc(groupName)
        .get()
        .then(function(snapshot) {
          if (snapshot.exists) {
            Alert.alert("Group already exists with same name..");
          } else {
            props.navigation.push("AddMember", { groupName: groupName });
          }
        });
    } else {
      Alert.alert("Enter a group name");
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
        <Text style={styles.Stockchat}> CREATE A GROUP</Text>
      </View>

      <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
        <View style={{ paddingTop: 50, paddingHorizontal: 10 }}>
          <Input
            style={styles.Input}
            placeholderTextColor="lightgrey"
            placeholder="Enter Group Name"
            value={groupName}
            onChangeText={val => setGroupName(val)}
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
            onPress={() => createPublicGroup()}
            isLoading={isLoading}
          >
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                color: "white",
                fontWeight: "600"
              }}
            >
              Public Group
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.lockedButton}
            // onPress={() => createPrivateGroup()}
            isLoading={isLoading}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Feather name="lock" size={20} color="lightgrey" />
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "center",
                  color: "lightgrey",
                  fontWeight: "600",
                  paddingLeft: 20
                }}
              >
                Private Group
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  getStarted: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "white",
    width: Dimensions.get("screen").width
  },
  Button: {
    backgroundColor: "#147efb",
    paddingVertical: 15,
    borderRadius: 30,
    width: "100%",
    marginVertical: 20
  },
  lockedButton: {
    backgroundColor: "grey",
    paddingVertical: 15,
    borderRadius: 30,
    width: "100%",
    marginVertical: 20
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
    //paddingLeft: 30,
    color: "black",
    height: 50,
    fontSize: 21,
    borderRadius: 30,
    textAlign: "center"
  },
  tcontainer: {
    //backgroundColor: "#000",
    //flex: 1,
    flexDirection: "row",
    padding: 50
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30
  },
  bcontainer: {
    flex: 1,
    borderTopLeftRadius: 90,
    width: "100%",
    justifyContent: "center",
    flexDirection: "column"
  },
  tHeading: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: "30%"
  },

  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
    margin: 20
  },
  toptcontainer: {
    backgroundColor: "#3498db"
  },

  topbcontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  bottombcontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  menuContainer: {
    //justifyContent: "space-around",
    alignItems: "center",
    //height: "100%",
    padding: 50,
    width: "100%",
    backgroundColor: "#fff",
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
    fontSize: 30,
    color: "#000000",
    marginTop: 50,
    marginBottom: 50
  },
  aText: {
    color: "#FFFFFF",
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
  btn: {
    width: 300,
    borderRadius: 16,
    //borderTopRightRadius: 0,
    backgroundColor: "#147efb",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  }
});
