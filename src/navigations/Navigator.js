import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Discussion from "../screens/Discussion";
import StockChat from "../screens/StockChat";
import StockProfile from "../screens/StockProfile";

import Profile from "../screens/Profile";
import Chat from "../screens/Chat";
import Icon from "@expo/vector-icons/Ionicons";
import Icon2 from "@expo/vector-icons/Entypo";
import AddGroup from "../screens/Sub/AddGroup";

import GetStarted from "../screens/OnBoarding/GetStarted";
import ChoosingUsername from "../screens/OnBoarding/ChoosingUsername";
import VerifyPhoneNumber from "../screens/OnBoarding/VerifyPhoneNumber";
import PhoneNumber from "../screens/OnBoarding/PhoneNumber";
import LinkPortfolio from "../screens/OnBoarding/LinkPortfolio";
import InviteFriends from "../screens/OnBoarding/InviteFriends";
import Notification from "../screens/OnBoarding/Notification";
import Success from "../screens/OnBoarding/Success";
import Login from "../screens/login";
import SignUp from "../screens/signup";
import Editprofile from "../screens/Editprofile";

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#1DA1F2",
        inactiveTintColor: "#AAB8C2",
        style: {
          height: "10%",
          //justifyContent: "center",
          //alignItems: "center",
          paddingTop: 15,
          backgroundColor: "#FFF",
          //elevation: 2
          alignContent: "center"
        }
      }}
    >
      {/* <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Icon name="ios-compass" color={color} size={30} />
          )
        }}
      /> */}
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Icon2 name="chat" color={color} size={30} />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Icon name="ios-person" color={color} size={30} />
          )
        }}
      />
    </Tab.Navigator>
  );
};
const Stack = createStackNavigator();
const screenOptionStyle = {
  headerShown: false
};

const ChatStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChoosingUsername"
        component={ChoosingUsername}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VerifyPhoneNumber"
        component={VerifyPhoneNumber}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PhoneNumber"
        component={PhoneNumber}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LinkPortfolio"
        component={LinkPortfolio}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InviteFriends"
        component={InviteFriends}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Success"
        component={Success}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Chat" component={BottomTabNavigator} />
      <Stack.Screen name="Discussion" component={Discussion} />
      <Stack.Screen name="AddGroup" component={AddGroup} />
      <Stack.Screen name="StockChat" component={StockChat} />
      <Stack.Screen name="StockProfile" component={StockProfile} />
      <Stack.Screen name="Editprofile" component={Editprofile} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default ChatStackNavigator;
