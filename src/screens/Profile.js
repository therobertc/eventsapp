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

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const Profile = props => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.col}>
        <Text style={styles.header}>Portfolio</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate("Settings")}>
          <Feather name="settings" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ paddingVertical: 20, marginHorizontal: 10 }}>
        <StockGroupCard
          ticker="$TSLA"
          pctchange="+1.02%"
          onPress={() => {
            props.navigation.navigate("StockChat", {
              //itemId: "TSLA",
              itemName: "$TSLA",
              itemPic: "https://i.stack.imgur.com/l60Hf.png"
            });
          }}
        />
        <StockGroupCard
          ticker="$SQ"
          pctchange="+4.55%"
          onPress={() => {
            props.navigation.navigate("StockChat", {
              // itemId: item.id,
              // itemName: item.login,
              itemPic: "https://i.stack.imgur.com/l60Hf.png",
              itemName: "$SQ"
            });
          }}
        />
        <StockGroupCard
          ticker="$NET"
          pctchange="+3.521%"
          onPress={() => {
            props.navigation.navigate("StockChat", {
              itemName: "$NET",
              // itemId: item.id,
              // itemName: item.login,
              itemPic: "https://i.stack.imgur.com/l60Hf.png"
            });
          }}
        />
      </View>
      <View style={styles.col}>
        <Text style={styles.header}>Trade History</Text>
        {/* <TouchableOpacity onPress={() => props.navigation.navigate("Settings")}>
          <Feather name="settings" size={30} color="black" />
        </TouchableOpacity> */}
      </View>
      <View style={{ paddingVertical: 20, marginHorizontal: 10 }}>
        <StockGroupCard
          ticker="$NET"
          pctchange="BOUGHT"
          onPress={() => {
            props.navigation.navigate("StockChat", {
              itemName: "$NET",
              // itemId: item.id,
              // itemName: item.login,
              itemPic: "https://i.stack.imgur.com/l60Hf.png"
            });
          }}
        />
      </View>
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
        <Text style={{ color: "white", fontSize: 19, fontWeight: "bold" }}>
          Logout
        </Text>
      </TouchableOpacity>
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
    backgroundColor: "white",
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
    color: "#000",
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
  ops: {
    // borderTopLeftRadius: 40,
    // borderTopRightRadius: 40,
    //height: "75%",
    // backgroundColor: "#FFF",
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
    color: "#000119",
    flex: 1,
    fontSize: 20
  }
});
