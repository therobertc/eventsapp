import React, { Component } from "react";
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  Linking,
  KeyboardAvoidingView,
  FlatList
} from "react-native";

import { Header, Left, Right, Body, Icon, Button } from "native-base";
import { Feather } from "@expo/vector-icons";
import StockGroupCard from "../components/StockGroupCard";
import ToggleSwitch from "../components/ToggleSwitch";

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      hide: true,
      query: "",
      name: "",
      searchResults: [],
      results: false,
      isLoading: true,
      stockSelected: false,
      stock: null
    };
    this.arrayholder = [];
  }

  ShowHideComponent = () => {
    if (this.state.show == true) {
      this.setState({ show: false });
      this.setState({ hide: true });
    } else {
      this.setState({ show: true });
      this.setState({ hide: false });
    }
  };

  render() {
    const { searchResults, query } = this.state;
    const { navigation: navigate } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.col}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Feather name="chevron-left" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.header}>Settings</Text>
        </View>

        <View>
          <View
            style={{
              backgroundColor: "white",

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

        {/* {this.state.hide ? (
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
            ></StockGroupCard>
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
            ></StockGroupCard>
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
            ></StockGroupCard>
          </View>
        ) : null} */}
      </View>
    );
  }
}

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
    paddingTop: 30
    //paddingHorizontal: 20
  },
  header: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#000",
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
  switch: {
    //marginTop: 5,
    color: "black",
    fontSize: 18,
    //width: Dimensions.get("screen").width,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Montserrat_700Bold"
  },

  switchtitle: {
    //marginTop: 5,
    color: "black",
    fontSize: 18,
    //width: Dimensions.get("screen").width,
    fontWeight: "500",
    textAlign: "center"
    //fontFamily: "Montserrat_700Bold"
  }
});
