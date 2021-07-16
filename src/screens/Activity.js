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
  ImageBackground,
} from "react-native";
import { Icon, Header, Left, Right, Body, Button } from "native-base";
import { Feather } from "@expo/vector-icons";

import { AntDesign } from "@expo/vector-icons";
import ToggleSwitch from "../components/ToggleSwitch";

import ActivityTabs from "../components/Tabs/ActivityTabs";

class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "Stock Alerts",
    };
    props.navigation.setOptions({
      gesturesEnabled: false,
    });
  }
  static navigationOptions = {
    gesturesEnabled: false,
    swipeEnabled: false,
  };

  render(props) {
    console.log("--", props);
    return (
      <View style={styles.container}>
        <Header
          style={{
            backgroundColor: "#FFF",
            borderBottomWidth: 0.1,
            borderBottomColor: "#FFF",
          }}
        >
          <Left>
            <TouchableOpacity
              // style={{
              //   position: "absolute",
              //   //top: 50,
              //   left: 20,
              //   borderWidth: 1,
              //   justifyContent: "center",
              //   alignItems: "center",
              //   borderColor: "#000",
              //   borderRadius: 25,
              //   height: 50,
              //   width: 50,
              // }}
              onPress={() => this.props.navigation.goBack()}
            >
              <Text style={styles.heading}>la.chat 🌴</Text>
            </TouchableOpacity>
          </Left>
          <Right>
            <TouchableOpacity
              style={{
                height: 50,
                width: 50,
                borderRadius: 40,
                backgroundColor: "#B295EF",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 2,
                borderBottomWidth: 5,
              }}
            >
              <Feather style={styles.icon} name="lock" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 50,
                width: 50,
                borderRadius: 40,
                backgroundColor: "#B295EF",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 20,

                borderWidth: 2,
                borderBottomWidth: 5,
              }}
            >
              <Feather style={styles.icon} name="plus" />
            </TouchableOpacity>
          </Right>
        </Header>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 10, height: "100%" }}
        >
          <View style={styles.alertcard}>
            <ToggleSwitch
            // onPress={this.enableNotification}
            // isActive={this.state.user.notifications_enable}
            />
            {/* <Text style={styles.eventsubheading}>Turn on notifications</Text> */}
            <Text style={styles.alertheading}>Notify Me For Events</Text>
          </View>

          {/* <TouchableOpacity>
            <ImageBackground
              style={styles.eventcard}
              source={require("../../assets/hollywoodhills.jpg")}
              borderRadius={30}

              //style={{ width: 250, height: 250, borderRadius: 150 }}
            >
              <View>
                <Text style={styles.eventsubheading}>Details coming soon</Text>
                <Text style={styles.eventheading}>LA KICKBACK</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.eventcard}>
            <Text style={styles.eventsubheading}>Details coming soon</Text>
            <Text style={styles.eventheading}>LA KICKBACK</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.eventcard}>
            <Text style={styles.eventsubheading}>Details coming soon</Text>
            <Text style={styles.eventheading}>LA KICKBACK</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.invitecard}>
            <Text style={styles.inviteheading}>INVITE FRIENDS</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
export default Activity;

const styles = StyleSheet.create({
  list: {
    marginTop: 300,
  },
  card: {
    marginLeft: 400,
    width: 400,
    flexDirection: "row",
  },
  seperator: {
    borderColor: "#303135",
    borderWidth: 0.5,
    marginLeft: 30,
    marginVertical: 10,
    width: "100%",
  },
  gradient: {
    height: "100%",
    //position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    //paddingHorizontal: 20,
    paddingTop: 30,
  },
  btn: {
    borderRadius: 16,
    //borderTopRightRadius: 0,
    backgroundColor: "#147efb",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 20,
  },
  container: {
    //height: "100%",
    backgroundColor: "#FFF",

    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    //paddingTop: 30,
    //paddingHorizontal: 20,
  },
  heading: {
    //marginTop: 50,
    color: "#000",
    fontSize: 30,
    //width: Dimensions.get("screen").width,
    fontWeight: "800",
    textAlign: "left",
    fontFamily: "Montserrat_700Bold",
  },
  eventheading: {
    //marginTop: 50,
    color: "#FFF",
    fontSize: 20,
    //width: Dimensions.get("screen").width,
    fontWeight: "800",
    textAlign: "left",
    fontFamily: "Montserrat_700Bold",
  },
  inviteheading: {
    //marginTop: 50,
    color: "#000",
    fontSize: 20,
    //width: Dimensions.get("screen").width,
    fontWeight: "800",
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
  },

  eventcard: {
    height: 200,
    width: "100%",
    backgroundColor: "grey",
    borderRadius: 30,
    justifyContent: "flex-end",
    paddingBottom: 30,
    marginTop: 20,
    //alignItems: "left",
    paddingLeft: 50,
    borderWidth: 2,
    borderBottomWidth: 5,
  },

  // invitecard: {
  //   height: 200,
  //   width: "100%",
  //   backgroundColor: "grey",
  //   borderRadius: 30,
  //   justifyContent: "flex-end",
  //   paddingBottom: 30,
  //   marginTop: 20,
  //   //alignItems: "left",
  //   paddingLeft: 50,
  // },

  invitecard: {
    //height: 100,
    width: "100%",
    backgroundColor: "#B295EF",
    borderRadius: 20,
    justifyContent: "center",
    paddingVertical: 20,
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    //paddingLeft: 20,
    paddingHorizontal: 50,
    borderBottomWidth: 5,

    borderWidth: 2,
  },

  alertcard: {
    height: 100,
    width: "100%",
    backgroundColor: "orange",
    borderRadius: 30,
    justifyContent: "center",
    paddingBottom: 30,
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    justifyContent: "space-between",
    paddingHorizontal: 50,
    paddingTop: 30,
    borderWidth: 2,
    borderBottomWidth: 5,
  },
  alertheading: {
    paddingLeft: 20,
    color: "#FFF",
    fontSize: 20,
    //width: Dimensions.get("screen").width,
    fontWeight: "800",
    textAlign: "left",
    fontFamily: "Montserrat_700Bold",
  },

  icon: {
    fontSize: 30,
    color: "#000",
  },

  eventsubheading: {
    //marginTop: 50,
    color: "#FFF",
    fontSize: 16,
    //width: Dimensions.get("screen").width,
    fontWeight: "800",
    textAlign: "left",
    fontFamily: "Montserrat_700Bold",
  },
  text: {
    //fontFamily: "Montserrat_400Regular",
    color: "#FFF",
    textAlign: "center",
    fontSize: 20,
    paddingVertical: 30,
  },
  header2: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
    flex: 1,
    fontSize: 24,
    paddingBottom: 10,
  },
  feed: {
    flex: 1,
  },
  proContainer: {
    marginRight: -20,
    alignSelf: "center",
  },
  ops: {
    // borderTopLeftRadius: 40,
    // borderTopRightRadius: 40,
    //height: "75%",
    // backgroundColor: "#000",
    // marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  col: {
    flexDirection: "row",
    //marginTop: 25,
    marginHorizontal: 20,
    alignItems: "center",
  },
  stockchats: {
    //flexDirection: "row"
    marginVertical: 10,
    marginHorizontal: 20,
    //alignItems: "center"
  },
  day: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
    flex: 1,
    fontSize: 20,
  },
  Button: {
    backgroundColor: "#147efb",
    padding: 15,
    borderRadius: 20,
    borderWidth: 2,
    width: "100%",
    top: 150,
  },
});
