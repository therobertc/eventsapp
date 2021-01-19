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

import LinkPortfolioButton from "../components/LinkPortfolioButton";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";

const Profile = props => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.col}>
        <Text style={styles.header}>Profile</Text>
        <TouchableOpacity
          style={{
            paddingHorizontal: 10,
            marginRight: 20,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#4b5162",
            borderRadius: 20,
            paddingVertical: 5,
            borderWidth: 1,
            borderColor: "#7c818c"
          }}
          // onPress={() => props.navigation.navigate("Wallet")}
        >
          <Feather name="stop-circle" size={20} color="#5294e2" />

          <Text
            style={{
              fontWeight: "bold",
              paddingLeft: 5,
              fontSize: 16,
              color: "#7c818c"
            }}
          >
            0
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{ paddingHorizontal: 20 }}
          onPress={() => props.navigation.navigate("Wallet")}
        >
          <Feather name="credit-card" size={30} color="white" />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => props.navigation.navigate("Settings")}>
          <Feather name="settings" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ paddingVertical: 20, marginHorizontal: 20 }}>
        <View>
          <Image
            source={require("../../assets/icon.png")}
            // source={{ uri: itemPic }}
            style={styles.avatar}
          />

          <Text style={styles.biotext}>Rob Calderon</Text>
          <Text style={styles.biotext}>@rob</Text>

          <View style={{ flexDirection: "row" }}>
            <Text style={styles.biotext}>100 followers</Text>
            <Text style={styles.biotext}>10 following</Text>
          </View>

          <Text style={styles.biotext}>Building apps for traders</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.linktext}>link twitter</Text>
            <Text style={styles.linktext}>link instagram</Text>
          </View>
        </View>
        <View style={styles.feed}>
          <Text style={styles.header}>Portfolio</Text>
          <Text style={styles.text}>Your portfolio is not connected.</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => props.navigation.navigate("LinkPortfolio")}
            // onPress={() => setModal(true)}
          >
            <Text style={{ color: "#FFF", fontSize: 19, fontWeight: "bold" }}>
              Connect Portfolio
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <LinkPortfolioButton></LinkPortfolioButton> */}
    </ScrollView>
  );
};
export default Profile;

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
  btn: {
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    //position: "absolute",
    //bottom: 10,
    //right: 110,
    //top: 200,
    height: 50,
    backgroundColor: "#147efb",
    borderRadius: 100,
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 30
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
    paddingTop: 30,
    paddingHorizontal: 20
  },
  header: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
    flex: 1,
    fontSize: 20
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
  text: {
    //fontFamily: "Montserrat_400Regular",
    color: "#FFF",
    textAlign: "center",
    fontSize: 20,
    paddingTop: 20
  },
  biotext: {
    //fontFamily: "Montserrat_400Regular",
    color: "#FFF",
    textAlign: "left",
    fontSize: 20,
    marginVertical: 5,
    paddingRight: 10
  },
  linktext: {
    //fontFamily: "Montserrat_400Regular",
    color: "#147efb",
    textAlign: "left",
    fontSize: 20,
    marginVertical: 5,
    paddingRight: 10
  },

  feed: {
    paddingTop: 20
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
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10
  }
});
