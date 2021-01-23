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
import { Icon, Header, Left, Right, Body, Button } from "native-base";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import InsiderTrades from "../components/InsiderTrades";

const Activity = props => {
  return (
    <View style={styles.container}>
      <Header
        style={{
          backgroundColor: "#35383F",
          borderBottomWidth: 0.2,
          borderBottomColor: "#35383F"
        }}
      >
        <Left>
          {/* <Feather
            style={{
              color: "#FFF",
              paddingHorizontal: Platform.OS === "ios" ? 20 : 15,
              fontSize: 30,
              fontWeight: "bold"
            }}
            name="chevron-left"
            onPress={() => props.navigation.goBack()}
          /> */}
          {/* <Text style={styles.header}>Activity</Text> */}
        </Left>

        <Body style={{ width: "100%" }}>
          <Text style={styles.header}>Activity</Text>
        </Body>

        <Right>
          <Feather
            style={{
              color: "#FFF",
              fontWeight: "bold",
              paddingHorizontal: Platform.OS === "ios" ? 10 : 10,
              fontSize: 30
            }}
            name="settings"
            onPress={() => props.navigation.navigate("Settings")}
          />
        </Right>
      </Header>

      <View style={styles.feed}>
        {/* <Text style={styles.text}>No new notifications</Text> */}
        <InsiderTrades {...props} />
      </View>
    </View>
  );
};
export default Activity;

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
    borderRadius: 16,
    //borderTopRightRadius: 0,
    backgroundColor: "#147efb",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 20
  },
  container: {
    height: "100%",
    backgroundColor: "#35383F"
    // left: 0,
    // right: 0,
    // top: 0,
    //paddingHorizontal: 20,
    //paddingTop: 60
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    //paddingTop: 30,
    paddingHorizontal: 20
  },
  header: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
    //width: "105%",
    //flex: 1,
    fontSize: 20,
    marginLeft: 10
  },
  text: {
    //fontFamily: "Montserrat_400Regular",
    color: "#FFF",
    textAlign: "center",
    fontSize: 20,
    paddingVertical: 30
  },
  header2: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
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
    // backgroundColor: "#35383F",
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
  }
});
