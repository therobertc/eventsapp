import React, { Component } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import WSBTrends from "../WSBTrends";
import InsiderTrades from "../InsiderTrades";
import Notifications from "../Notifications";
import OptionsAlerts from "../OptionsAlerts";
import PublicGroups from "../PublicGroups";
import PrivateGroups from "../PrivateGroups";

const Tab = createMaterialTopTabNavigator();

function ChatTabs() {
  return (
    <Tab.Navigator
      lazy={true}
      tabBarOptions={{
        scrollEnabled: true,
        activeTintColor: "#FFF",
        inactiveTintColor: "#657786",
        indicatorStyle: { backgroundColor: "#FFF", borderWidth: 0 },

        tabStyle: {
          width: "auto",
        },
        style: { backgroundColor: "#000" },
        labelStyle: {
          fontWeight: "700",
        },
      }}
    >
      <Tab.Screen name="Public Groups" component={PublicGroups} />
      {/* <Tab.Screen name="Options Alerts" component={OptionsAlerts} /> */}
      <Tab.Screen name="Private Groups" component={PrivateGroups} />
      <Tab.Screen name="DMs" component={PublicGroups} />
    </Tab.Navigator>
  );
}

export default ChatTabs;
