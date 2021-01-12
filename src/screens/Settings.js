import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";
import StockGroupCard from "../components/StockGroupCard";
import firebase, { firestore } from "../database/firebase";
import ToggleSwitch from "../components/ToggleSwitch";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const Settings = props => {
  return (
    <View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.col}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Feather name="chevron-left" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.header}>Settings</Text>
        </View>

        <View style={{ paddingVertical: 20, marginHorizontal: 10 }}>
          <View>
            <View
              style={{
                backgroundColor: "#383c4a",

                flexDirection: "column",
                width: "100%",

                paddingHorizontal: 10
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: 20,
                  paddingHorizontal: 20
                }}
              >
                <Text style={styles.switch}>Portfolio</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 20,
                  paddingHorizontal: 20
                }}
              >
                <Text style={styles.switchtitle}>Private</Text>
                <ToggleSwitch></ToggleSwitch>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: 20,
                  paddingHorizontal: 20
                }}
              >
                <Text style={styles.switch}>Notifications</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 20,
                  paddingHorizontal: 20
                }}
              >
                <Text style={styles.switchtitle}>Mentions</Text>
                <ToggleSwitch></ToggleSwitch>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 20,
                  paddingHorizontal: 20
                }}
              >
                <Text style={styles.switchtitle}>New Messages</Text>
                <ToggleSwitch></ToggleSwitch>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: 20,
                  paddingHorizontal: 20
                }}
              >
                <Text style={styles.switch}>Stock Alerts</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 20,
                  paddingHorizontal: 20
                }}
              >
                <Text style={styles.switchtitle}>Price Movements</Text>
                <ToggleSwitch></ToggleSwitch>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 20,
                  paddingHorizontal: 20
                }}
              >
                <Text style={styles.switchtitle}>Trending Stocks</Text>
                <ToggleSwitch></ToggleSwitch>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          firebase
            .auth()
            .signOut()
            .then(function() {
              props.navigation.navigate("GetStarted");
            });
        }}
      >
        <Text style={{ color: "#FFF", fontSize: 19, fontWeight: "bold" }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default Settings;

const styles = StyleSheet.create({
  list: {
    marginTop: 300
  },
  card: {
    marginLeft: 400,
    width: 400,
    flexDirection: "row"
  },
  seperator: {
    borderColor: "lightgrey",
    borderWidth: 0.5,
    marginLeft: 30,
    marginVertical: 10,
    width: "100%"
  },
  gradient: {
    height: "100%",
    //position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    //paddingHorizontal: 20,
    paddingTop: 30
  },
  container: {
    height: "100%",
    backgroundColor: "#383c4a",
    // left: 0,
    // right: 0,
    // top: 0,
    //paddingHorizontal: 20,
    paddingTop: 60
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 30
    //paddingHorizontal: 20
  },
  header: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
    flex: 1,
    fontSize: 24,
    textAlign: "center"
  },
  header2: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#000",
    flex: 1,
    fontSize: 24,
    paddingBottom: 10
  },
  proContainer: {
    marginRight: -20,
    alignSelf: "center"
  },
  ops: {
    // borderTopLeftRadius: 40,
    // borderTopRightRadius: 40,
    //height: "75%",
    // backgroundColor: "#383c4a",
    // marginHorizontal: -20,
    paddingHorizontal: 20
  },
  col: {
    flexDirection: "row",
    //marginTop: 25,
    marginHorizontal: 20,
    alignItems: "center"
  },
  stockchats: {
    //flexDirection: "row"
    marginVertical: 10,
    marginHorizontal: 20
    //alignItems: "center"
  },
  day: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
    flex: 1,
    fontSize: 20
  },
  Stockchat: {
    marginTop: 50,
    color: "white",
    fontSize: 18,
    //width: Dimensions.get("screen").width,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Montserrat_700Bold"
  },
  switch: {
    //marginTop: 5,
    color: "white",
    fontSize: 18,
    //width: Dimensions.get("screen").width,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Montserrat_700Bold"
  },

  switchtitle: {
    //marginTop: 5,
    color: "white",
    fontSize: 18,
    //width: Dimensions.get("screen").width,
    fontWeight: "500",
    textAlign: "center"
    //fontFamily: "Montserrat_700Bold"
  },
  btn: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    position: "absolute",
    bottom: 100,

    right: 110,
    height: 50,
    backgroundColor: "#147efb",
    borderRadius: 100,
    flexDirection: "row"
  }
});
