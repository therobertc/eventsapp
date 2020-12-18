import React, { useState, useEffect, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
  Share,
  Image,
  AsyncStorage
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "@expo/vector-icons/Entypo";
import Profiles from "../components/Profiles";
import Messages from "../components/Messages";
import TrendingStocks from "../components/TrendingStocks";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import AddGroup from "./Sub/AddGroup";
import fire, { firestore } from "../database/firebase";

import StockGroupCard from "../components/StockGroupCard";

const Chat = props => {
  const isVisible = useIsFocused();
  const [groups, setGroups] = useState([]);
  const [publicgroups, setpublicgroups] = useState([]);

  const [Chatheads, setChatheads] = useState([]);

  useEffect(() => {
    if (isVisible) {
      getChats();
    }
  }, [isVisible]);

  function getChats() {
    const db = firestore;
    var groupArray = [];
    var pubgroupArray = [];

    var ChatHeadsArr = [];
    var UserId = fire.auth().currentUser.uid;

    db.collection("publicgroups").onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
        if (change.type == "added") {
          console.log("New Group: ", change.doc.data());
          pubgroupArray.push(change.doc.data());
        }
        if (change.type === "modified") {
          console.log("Modified Group: ", change.doc.data());
        }
        if (change.type === "removed") {
          console.log("Removed Group", change.doc.data());
        }

        setpublicgroups(pubgroupArray);
      });
    });

    db.collection("users")
      .doc(UserId)
      .collection("Groups")
      .onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
          console.log("New Group: ", change.doc.data());
          // for (var i = 0; i < change.doc.data.length; i++) {
          //   groupArray.push({
          //     GroupName: change.doc.data().GroupName[i]
          //   })
          // }

          groupArray.push(change.doc.data());

          setGroups(groupArray);
        });
      });

    db.collection("users")
      .doc(UserId)
      .collection("ChatHeads")
      .onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(anotherSnapshot) {
          console.log("anotherSnapshot.doc.data()", anotherSnapshot.doc.data());

          // ChatHeadsArr.push(anotherSnapshot.doc.data())
          for (var i = 0; i < anotherSnapshot.doc.data.length; i++) {
            ChatHeadsArr.push({
              name: anotherSnapshot.doc.data().name,
              uid: anotherSnapshot.doc.data().uid
            });
          }

          setChatheads(ChatHeadsArr);
        });
      });
    // var DBref = db.collection("users").doc(UserId);
    // DBref.collection("ChatHeads").get().then(function (snapshot) {

    //   snapshot.forEach((anotherSnapshot) => {
    //     console.log("SNAPSHOT OF USER Chata ==>", anotherSnapshot.data())
    //     // ChatHeadsArr.push(anotherSnapshot.data())
    // for (var i = 0; i < snapshot.data.length; i++) {
    //   ChatHeadsArr.push({
    //     name: anotherSnapshot.data().name,
    //     uid: anotherSnapshot.data().uid,
    //   })
    // }
    //     setChatheads(ChatHeadsArr)
    //   })

    // })
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Join Stock Chat with my link and you'll get access to my trading groups https://stockchatapp.com"
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
  return (
    // <LinearGradient colors={["#AAB8C2", "#FFF"]} style={styles.gradient}>
    <View style={styles.container}>
      <ScrollView style={styles.col2}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Trending Stocks</Text>
          <View>
            <TouchableOpacity
              style={styles.invite}
              onPress={onShare}
              title="Share"
              //onPress={() => props.navigation.navigate("InviteFriends")}
            >
              <Feather name="user-plus" size={20} color="white" />
              <Text style={{ color: "white" }}> Invite </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TrendingStocks></TrendingStocks>

        <View style={styles.col}>
          <Text style={styles.header}>Stock Chats</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("AddGroup")}
          >
            <AntDesign name="pluscircleo" size={24} color="black" />
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
            msg="This stock is trending"
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
            msg="This stock is trending"
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
            msg="This stock is trending"
          ></StockGroupCard>
        </View>
        <View style={styles.col}>
          <Text style={styles.header2}>Public Groups</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("AddGroup")}
          >
            <AntDesign name="pluscircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ paddingVertical: 20, marginHorizontal: 10 }}>
          <FlatList
            data={publicgroups}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item }) => {
              const name = item.groupName;

              return (
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("Discussion", {
                      item
                    });
                  }}
                >
                  <Messages item={name}></Messages>
                </TouchableOpacity>
              );
            }}
          ></FlatList>
        </View>

        <View style={styles.col}>
          <Text style={styles.header}>Direct Messages</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("CreateChat")}
          >
            <AntDesign name="pluscircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ paddingVertical: 20, marginHorizontal: 10 }}>
          <FlatList
            data={Chatheads}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item }) => {
              console.log("FLAAAAAAAAAATIST ==>", item);
              const name = item.name;
              return (
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("ChatRoom", {
                      name: item.name,
                      uid: item.uid,
                      title: item.name
                    });
                  }}
                >
                  <Messages item={name}></Messages>
                </TouchableOpacity>
              );
            }}
          ></FlatList>
        </View>

        <View style={styles.col}>
          <Text style={styles.header2}>Private Groups</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("AddGroup")}
          >
            <AntDesign name="pluscircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ paddingVertical: 20, marginHorizontal: 10 }}>
          <FlatList
            data={groups}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item }) => {
              console.log("FLAAAAAAAAAATIST ==>", item);
              const name = item.GroupName;
              return (
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("GroupChat", {
                      groupName: name
                    });
                  }}
                >
                  <Messages item={name}></Messages>
                </TouchableOpacity>
              );
            }}
          ></FlatList>
        </View>
      </ScrollView>
    </View>
    // </View>
    // </LinearGradient>
  );
};
export default Chat;

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
    paddingTop: 30
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
    fontSize: 20
    //paddingVertical: 10
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
  invite: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#147efb",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 5
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
