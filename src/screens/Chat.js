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
} from "react-native";
import { Icon, Header, Left, Right, Body, Button } from "native-base";
import Messages from "../components/Messages";
import TrendingStocks from "../components/TrendingStocks";
import { Feather } from "@expo/vector-icons";
import AddGroup from "./Sub/AddGroup";
import fire, { firestore } from "../database/firebase";

const Chat = props => {
  const isVisible = useIsFocused();
  const [groups, setGroups] = useState([]);
  const [publicgroups, setpublicgroups] = useState([]);
  const [Chatheads, setChatheads] = useState([]);

  this.state = {
    country: "#STOCKCHAT"
  };

  useEffect(() => {
    // firestore
    //   .collection("profile")
    //   .where("email", "==", fire.auth().currentUser.email)
    //   .get()
    //   .then(snapshot => {
    //     snapshot.forEach(function(change) {
    //     });
    //   })
    //   .catch(error => {
    //     console.log("erros is ", error);
    //   });
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
          groupArray.push(change.doc.data());
          setGroups(groupArray);
        });
      });

    db.collection("users")
      .doc(UserId)
      .collection("ChatHeads")
      .onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(anotherSnapshot) {
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
  }
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

  return (
    <View style={styles.container}>
      <View>
        <Header
          style={{
            backgroundColor: "#35383F",
            borderBottomWidth: 0.2,
            borderBottomColor: "#35383F"
          }}
        >
          <Left>
            {/* <Feather
            style={{
              color: "#FFF",
              paddingHorizontal: Platform.OS === "ios" ? 20 : 15,
              fontSize: 30,
              fontWeight: "bold"
            }}
            name="search"
            onPress={() => props.navigation.navigate("Profile")}
          /> */}

            {/* <View style={{ zIndex: 999 }}>
              <DropDownPicker
                items={[
                  {
                    label: "#STOCKCHAT",
                    value: "#STOCKCHAT"
                    // icon: () => <Icon name="flag" size={18} color="#900" />
                  },
                  {
                    label: "+ ADD GROUP",
                    value: "+ ADD GROUP"
                    // icon: () => <Icon name="flag" size={18} color="#900" />
                  }
                ]}
                defaultValue={this.state.country}
                containerStyle={{
                  height: 40,
                  width: 250,
                  borderWidth: 0
                }}
                arrowColor="#FFF"
                arrowSize={20}
                style={{ backgroundColor: "transparent", borderWidth: 0 }}
                itemStyle={{
                  justifyContent: "flex-start",
                  color: "#FFF"
                }}
                labelStyle={{
                  fontFamily: "Montserrat_700Bold",
                  color: "#FFF",
                  flex: 1,
                  fontSize: 20
                }}
                dropDownStyle={{ backgroundColor: "#35383F", borderWidth: 0 }}
                // onChangeItem={item =>
                //   this.setState({
                //     country: item.value
                //   })
                // }
              />

              {/* <Text style={styles.logotext}>#STOCKCHAT</Text> */}
            {/* </View>  */}

            <Text style={styles.logotext}>#STOCKCHAT</Text>
          </Left>

          {/* <Body> */}
          {/* <Image
            style={{
              flex: 1,
              aspectRatio: Platform.OS === "ios" ? 3.0 : 4.0,
              resizeMode: "contain"
            }}
            source={require("../../assets/stockchattext.png")}
          /> */}
          {/* <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.header2}>#stockchat</Text>
          </View> */}
          {/* </Body> */}

          <Right>
            <Feather
              style={{
                color: "#FFF",
                fontWeight: "bold",
                paddingHorizontal: Platform.OS === "ios" ? 10 : 10,
                fontSize: 30
              }}
              name="user-plus"
              onPress={onShare}
            />

            {/* <Feather
            style={{
              color: "#FFF",
              fontWeight: "bold",
              paddingHorizontal: Platform.OS === "ios" ? 10 : 10,
              fontSize: 30
            }}
            name="send"
            onPress={() => props.navigation.navigate("DirectMessages")}
          /> */}
            {/* <TouchableOpacity
            onPress={() => props.navigation.navigate("Profile")}
          >
            <Image
              source={require("../../assets/icon.png")}
              // source={{ uri: itemPic }}
              style={styles.avatar}
            />
          </TouchableOpacity> */}
          </Right>
        </Header>
      </View>

      <ScrollView style={styles.col2}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Trending Stocks</Text>
          {/* <View>
            <TouchableOpacity
              style={styles.invite}
              onPress={onShare}
              title="Share"
              //onPress={() => props.navigation.navigate("InviteFriends")}
            >
              <Feather name="user-plus" size={20} color="#F5F8FA" />
              <Text style={{ color: "#F5F8FA", fontWeight: "500" }}>
                {" "}
                Invite{" "}
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>

        <TrendingStocks {...props} />

        {/* <TextInput
          style={styles.inputStyle}
          placeholder="Search for groups or messages"
          // value={email}
          // onChangeText={val => setEmail(val)}
        /> */}

        {/* <View style={styles.col}>
          <Text style={styles.header}>Stock Chats</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("AddGroup")}
          >
            <AntDesign name="pluscircleo" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
        <View style={{ paddingVertical: 20, marginHorizontal: 10 }}>
          {/* <TouchableOpacity
            style={styles.btn}
            // onPress={() => {
            //   firebase
            //     .auth()
            //     .signOut()
            //     .then(function() {
            //       props.navigation.navigate("GetStarted");
            //     });
            // }}
          >
            <Text
              style={{
                color: "#F5F8FA",
                fontSize: 19,
                fontFamily: "Montserrat_700Bold"
              }}
            >
              Connect Portfolio
            </Text>
          </TouchableOpacity> */}
        {/* <StockGroupCard
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
          /> */}
        {/* <StockGroupCard
            ticker="$SQ"
            pctchange="+4.55%"
            onPress={() => {
              props.navigation.navigate("GroupProfile");

              // onPress={() => {
              //   props.navigation.navigate("StockChat", {
              //     // itemId: item.id,
              //     // itemName: item.login,
              //     itemPic: "https://i.stack.imgur.com/l60Hf.png",
              //     itemName: "$SQ"
            }}
            msg="This stock is trending"
          /> */}
        {/* <StockGroupCard
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
          /> */}
        {/* </View>  */}
        <View style={styles.col}>
          <Text style={styles.logotext}>Groups</Text>
          {/* <TouchableOpacity
            onPress={() => props.navigation.navigate("AddGroup")}
          >
            <AntDesign name="pluscircleo" size={24} color="#FFF" />
          </TouchableOpacity> */}
        </View>
        <View style={{ paddingVertical: 10, marginHorizontal: 10 }}>
          <FlatList
            data={publicgroups}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item }) => {
              const name = item.groupName;
              const totalmembers =
                item && item.totalmembers ? item.totalmembers : 0;
              const lastmessage =
                item && item.lastmessage ? item.lastmessage : "";
              return (
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("Discussion", {
                      item,
                      itemPic: "https://i.stack.imgur.com/l60Hf.png"
                    });
                  }}
                >
                  <Messages
                    item={name}
                    totalmembers={totalmembers}
                    lastmessage={lastmessage}
                  ></Messages>
                </TouchableOpacity>
              );
            }}
          />

          <FlatList
            data={groups}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item }) => {
              // console.log("FLAAAAAAAAAATIST ==>", item);
              const name = item.GroupName;
              return (
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("GroupChat", {
                      groupName: name,
                      itemPic: "https://i.stack.imgur.com/l60Hf.png"
                    });
                  }}
                >
                  <Messages item={name}></Messages>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => props.navigation.navigate("AddGroup")}
        style={{
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.2)",
          alignItems: "center",
          justifyContent: "center",
          width: 200,
          position: "absolute",
          bottom: 10,
          right: 110,
          height: 50,
          backgroundColor: "#147efb",
          borderRadius: 100,
          flexDirection: "row"
        }}
      >
        <Feather
          style={{
            color: "#FFF",
            fontWeight: "bold",
            //paddingHorizontal: Platform.OS === "ios" ? 10 : 10,
            fontSize: 20
          }}
          name="plus"
        />
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "600",
            color: "#FFF",
            paddingLeft: 10
          }}
        >
          Start Group
        </Text>
      </TouchableOpacity>
    </View>
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
  btn: {
    borderRadius: 16,
    //borderTopRightRadius: 0,
    backgroundColor: "#FFF",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    //marginTop: 20,
    marginHorizontal: 10
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
    backgroundColor: "#35383F"
    // left: 0,
    // right: 0,
    // top: 0,
    //paddingBottom: 30
    //paddingHorizontal: 20,
    //paddingTop: 10
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginHorizontal: 10
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    //paddingTop: 0,
    paddingHorizontal: 20
  },
  header: {
    fontFamily: "Montserrat_700Bold",
    color: "#FFF",
    flex: 1,
    fontSize: 20
  },
  logotext: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
    fontSize: 22,
    paddingLeft: 10,
    width: 300
  },
  header2: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
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
    // backgroundColor: "#35383F",
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
    marginHorizontal: 10,
    alignItems: "center"
  },
  stockchats: {
    //flexDirection: "row"
    marginVertical: 10,
    marginHorizontal: 20
    //alignItems: "center"
  },
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    //paddingBottom: 15,
    paddingVertical: 10,
    paddingLeft: 15,
    alignSelf: "center",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: 20,
    paddingRight: 20,
    fontSize: 20,
    backgroundColor: "#35383F",
    flex: 1
  },
  day: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
    flex: 1,
    fontSize: 20
  }
});
