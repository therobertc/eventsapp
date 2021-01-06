import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Discussion from "../screens/Discussion";
import StockChat from "../screens/StockChat";
import StockProfile from "../screens/StockProfile";

import Profile from "../screens/Profile";
import Settings from "../screens/Settings";

import Chat from "../screens/Chat";
import Icon from "@expo/vector-icons/Ionicons";
import Icon2 from "@expo/vector-icons/Entypo";
import AddGroup from "../screens/Sub/AddGroup";
import AddGroupMember from "../screens/Sub/AddGroup_Members";
import AddMoreGroupMember from "../screens/Sub/AddMore_GroupMembers";
import GroupChat from "../screens/Sub/GroupChat";
import GroupInfo from "../screens/Sub/GroupInfo";

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
import CreateMsg from "../screens/CreateMsg";
import ChatRoom from "../screens/ChatRoom";
import fire, { firestore } from "../database/firebase";
import { useLinkProps } from "@react-navigation/native";
import Email from "../screens/OnBoarding/Email";
import Password from "../screens/OnBoarding/Password";
import StockDetails from "../components/StockDetails";
import TrendingStocks from "../components/TrendingStocks";
import Wallet from "../screens/Wallet";
import GroupProfile from "../screens/Sub/GroupProfile";

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#147efb",
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
            <Icon name="ios-trending-up" color={color} size={30} />
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
// const screenOptionStyle = {
//   headerShown: false
// };

const ChatStackNavigator = () => {
  const [isUser, SetUser] = useState(false);

  React.useEffect(() =>
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        SetUser(true);
        console.log("IF ===> ", isUser);
      } else {
        SetUser(false);
        console.log("ELSE ===>", isUser);
      }
    })
  );
  return (
    <Stack.Navigator>
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
        name="Email"
        component={Email}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Password"
        component={Password}
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
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateChat"
        component={CreateMsg}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddMember"
        component={AddGroupMember}
        //options={{ title: "Add Receipents" }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddMoreMember"
        component={AddMoreGroupMember}
        //options={{ title: "Add Receipents" }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Discussion"
        component={Discussion}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddGroup"
        component={AddGroup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GroupChat"
        component={GroupChat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GroupInfo"
        component={GroupInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StockChat"
        component={StockChat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StockProfile"
        component={StockProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StockDetails"
        component={StockDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TrendingStocks"
        component={TrendingStocks}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Wallet"
        component={Wallet}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GroupProfile"
        component={GroupProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ChatStackNavigator;
