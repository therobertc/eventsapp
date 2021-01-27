import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
  Image,
  Share
} from "react-native";
import ChartComp from "../components/ChartComp";

import StockGroupCard from "../components/StockGroupCard";
import firebase, { firestore } from "../database/firebase";
import {
  Icon,
  Header,
  Left,
  Right,
  Body,
  Button,
  Footer,
  FooterTab
} from "native-base";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const onShare = async () => {
  try {
    const result = await Share.share({
      message:
        "Hey - I have an invite to StockChat and want you to join. Here is the link! https://stockchatapp.com"
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

const Bank = props => {
  return (
    <View style={styles.container}>
      <Header
        style={{
          backgroundColor: "#35383F",
          borderBottomWidth: 0,
          flexDirection: "row",
          //marginTop: 25,
          marginHorizontal: 10,
          alignItems: "center",
          justifyContent: "center"
          //flex: 1
        }}
      >
        <Left>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Feather name="user" size={30} color="#FFF" />
          </TouchableOpacity>
        </Left>
        <Body>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Text style={styles.header}>$2,137.47</Text>
          </TouchableOpacity>
        </Body>
        <Right>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Activity")}
          >
            <AntDesign
              style={{ paddingRight: 10 }}
              name="qrcode"
              size={30}
              color="#FFF"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Activity")}
          >
            <Feather name="clock" size={30} color="#FFF" />
          </TouchableOpacity>
        </Right>
      </Header>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.col}>
          <Text style={styles.header}> Bitcoin </Text>

          <Text style={styles.header2}> ≈ </Text>

          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Text style={styles.header}> $32,651.74</Text>
            {/* <Text style={styles.header}> +20.13% </Text> */}
          </TouchableOpacity>
        </View>

        <ChartComp symbol="SQ" />

        <View style={styles.col2}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Text style={styles.header}> BTC WALLET </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Text style={styles.header}>$2,137.47</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View
        style={{
          paddingBottom: 100,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20
        }}
      >
        <Button
          style={{ width: 150, alignItems: "center", justifyContent: "center" }}
          onPress={() => props.navigation.navigate("BuyOrder")}
          //   onPress={() => setModal(true)}
        >
          <Text
            style={{
              color: "#FFF",
              fontSize: 19,
              fontWeight: "bold"
            }}
          >
            Buy
          </Text>
          {/* <Image
          source={require("../../assets/robinhoodlogo.png")}
          // source={{ uri: itemPic }}
          style={styles.avatar}
        /> */}
        </Button>
        <Button
          style={{ width: 150, alignItems: "center", justifyContent: "center" }}
          onPress={() => props.navigation.navigate("LinkPortfolio")}
        >
          <Text style={{ color: "#FFF", fontSize: 19, fontWeight: "bold" }}>
            Sell
          </Text>
          {/* <Image
          source={require("../../assets/robinhoodlogo.png")}
          // source={{ uri: itemPic }}
          style={styles.avatar}
        /> */}
        </Button>
      </View>
    </View>
  );
};
export default Bank;

const styles = StyleSheet.create({
  list: {
    marginTop: 300
  },
  btn: {
    padding: 50
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
    //height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 50,
    paddingVertical: 10
  },
  container: {
    height: "100%",
    backgroundColor: "#35383F",
    // left: 0,
    // right: 0,
    // top: 0,
    //paddingHorizontal: 20,
    paddingTop: 30
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
    //flex: 1,
    fontSize: 20
    //paddingLeft: 10
    //textAlign: "center"
  },
  header2: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
    //flex: 1,
    fontSize: 30
    //paddingLeft: 10
    //textAlign: "center"
  },
  coins: {
    fontFamily: "Montserrat_700Bold",
    color: "#FFF",
    flex: 1,
    fontSize: 25,
    paddingLeft: 10
  },
  buycoins: {
    //fontFamily: "Montserrat_500Bold",
    color: "#FFF",
    flex: 1,
    fontSize: 20,
    paddingLeft: 10
  },
  coinrow: {
    paddingVertical: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  proContainer: {
    //marginRight: -20,
    alignSelf: "center"
  },
  ops: {
    // borderTopLeftRadius: 40,
    // borderTopRightRadius: 40,
    //height: "75%",
    // backgroundColor: "#35383F",
    // marginHorizontal: -20,
    //paddingHorizontal: 20
  },
  col: {
    flexDirection: "row",
    //marginTop: 25,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between"
  },
  col2: {
    flexDirection: "row",
    marginTop: 25,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: "#7c818c",
    paddingVertical: 20
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
  invite: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#147efb",
    borderRadius: 5,
    //paddingHorizontal: 20,
    paddingVertical: 10,
    width: 100
  },
  earncoins: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#35383F",
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: -10,
    paddingVertical: 5,
    width: 120,
    borderWidth: 1,
    borderColor: "lightgrey"
  },
  earnbox: {
    backgroundColor: "orange",
    //padding: 50,
    margin: 20,
    borderRadius: 20,
    justifyContent: "flex-start",
    height: 200
  }
});
