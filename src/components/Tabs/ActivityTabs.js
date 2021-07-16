import React, { Component } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

function ActivityTabs() {
  return (
    <Tab.Navigator
      lazy={true}
      tabBarOptions={{
        scrollEnabled: true,
        activeTintColor: "#FFF",
        inactiveTintColor: "#FFF",
        indicatorStyle: { backgroundColor: "#FFF" },

        tabStyle: {
          width: "auto",
        },
        style: { backgroundColor: "#000" },
        labelStyle: {
          fontWeight: "600",
        },
      }}
    >
      {/* <Tab.Screen name="Stock Alerts" component={Notifications} />
      <Tab.Screen name="Options Alerts" component={OptionsAlerts} />
      <Tab.Screen name="WSB Trends" component={WSBTrends} />
      <Tab.Screen name="Insider Trades" component={InsiderTrades} /> */}
    </Tab.Navigator>
  );
}

export default ActivityTabs;
