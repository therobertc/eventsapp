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
import StockGroupCard from "../../components/StockGroupCard";
import firebase, { firestore } from "../../database/firebase";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const GroupProfile = props => {
  return (
    <View style={styles.container}>
      <View style={styles.bio}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Feather name="chevron-left" size={30} color="white" />
          </TouchableOpacity>

          <Text style={styles.header}>#STOCKCHAT</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          style={{
            paddingVertical: 20,
            marginHorizontal: 10,
            backgroundColor: "lightgrey",
            height: 100,
            width: 100,
            borderRadius: 50
          }}
          source={{
            uri: "https://i.stack.imgur.com/l60Hf.png"
          }}
        ></Image>

        <View style={{ marginVertical: 20 }}>
          <View style={styles.stats}>
            <Text style={styles.members}>100</Text>
            <Text style={styles.volume}>+56.89%</Text>
          </View>

          <View style={styles.stats}>
            <Text style={styles.title}>Members</Text>
            <Text style={styles.title}>Message Volume</Text>
          </View>
        </View>

        <View style={styles.col}>
          <Text style={styles.title}>Description</Text>
        </View>

        <View style={styles.stats}>
          <Text style={styles.title}>Popular Stocks</Text>
        </View>
      </ScrollView>
      <View
        style={{
          height: 100,
          backgroundColor: "lightgrey",
          flexDirection: "row"
        }}
      >
        <TouchableOpacity
          style={{
            height: 50,
            width: 60,
            marginVertical: 10,
            marginLeft: 20,
            backgroundColor: "#147efb",
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => {
            props.navigation.navigate("StockChat", {
              // itemId: item.id,
              // itemName: item.login,
              itemName: "$SQ",
              itemPic: "https://i.stack.imgur.com/l60Hf.png"
            });
          }}
        >
          <Feather name="send" size={25} color="#383c4a" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 50,
            marginHorizontal: 10,
            width: 300,
            marginVertical: 10,
            backgroundColor: "#147efb",
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => props.navigation.navigate("Wallet")}
        >
          <Feather name="stop-circle" size={25} color="#383c4a" />
          <Text
            style={{
              color: "#383c4a",
              fontWeight: "800",
              paddingRight: 5,
              fontSize: 20,
              paddingLeft: 10
            }}
          >
            25 / Month
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default GroupProfile;

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
    color: "#000",
    flex: 1,
    fontSize: 20,
    paddingLeft: 10
    //textAlign: "center"
  },

  title: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#000",
    flex: 1,
    fontSize: 20

    //textAlign: "center"
  },
  volume: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#000",
    flex: 1,
    fontSize: 30
  },
  members: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#000",
    flex: 1,
    fontSize: 30
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
    marginBottom: 50,
    marginHorizontal: 20,
    alignItems: "center"
  },

  stats: {
    flexDirection: "row",
    marginVertical: 5,
    marginHorizontal: 20,
    alignItems: "center"
  },
  bio: {
    flexDirection: "row",
    marginBottom: 20,
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
