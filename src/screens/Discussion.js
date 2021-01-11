import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import firebase, { firestore } from "./../database/firebase";
import * as ImagePicker from "expo-image-picker";
import Icon from "@expo/vector-icons/AntDesign";

import {
  GiftedChat,
  Send,
  Bubble,
  InputToolbar,
  Time
} from "react-native-gifted-chat";
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Ionicons,
  Feather,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons
} from "@expo/vector-icons";

function Discussion({ route, navigation }) {
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [username, setUsername] = useState(
    firebase.auth().currentUser.displayName
  );
  const [userid, setUserid] = useState(firebase.auth().currentUser.uid);
  const [messages, setMessages] = useState([]);
  const [userEmail, setUserEmail] = useState(firebase.auth().currentUser.email);
  const { item, itemPic } = route.params;

  console.log("current user ", userid, userEmail);

  useEffect(() => {
    getUserJoinedAlreadyOrNot();
  }, []);

  useEffect(() => {
    getUserJoinedAlreadyOrNot();
    const unsubscribeListener = firestore
      .collection("message")
      .doc(item.groupID)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          let firebaseData = doc.data();
          console.log("userid is", userid);
          console.log("mainid is", firebaseData["user"]["_id"]);
          firebaseData["user"]["_id"] =
            firebaseData["user"]["_id"] == userid ? 1 : 2;
          console.log("message is ", firebaseData["user"]["_id"]);
          const data = {
            _id: doc.id,
            text: "",
            createdAt: new Date().toUTCString(),
            ...firebaseData
          };

          return data;
        });
        setMessages(messages);
      });
    return () => unsubscribeListener();
  }, []);

  function getUserJoinedAlreadyOrNot() {
    firestore
      .collection("members")
      .doc(item.groupID)
      .collection("member")
      .where("userID", "==", userid)
      .get()
      .then(function(querySnapshot) {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach(function(doc) {
            if (doc.data() != null) {
              setIsJoined(true);
            } else {
              setIsJoined(false);
              showAlertToJoinGroup();
            }
          });
        } else {
          showAlertToJoinGroup();
        }
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  }

  function showAlertToJoinGroup() {
    Alert.alert(
      Strings.JoinChat,
      Strings.JoinChatConfirmMessage,
      [
        {
          text: "Yes",
          onPress: () => {
            joinGroup();
          }
        },
        {
          text: "No",
          onPress: () => {}
        }
      ],
      { cancelable: false }
    );
  }

  function joinGroup() {
    const groupMemberRef = firestore
      .collection("members")
      .doc(item.groupID)
      .collection("member")
      .doc();
    groupMemberRef
      .set({
        userID: userID
      })
      .then(function(docRef) {
        setIsJoined(true);
        Alert.alert(Strings.joinMessage);
        setMessage("");
      })
      .catch(function(error) {
        setIsJoined(false);
        Alert.alert(Strings.JoinGroupError);
      });
  }

  onPressCashtag = cashtag => {
    let symbol = cashtag.replace("$", "");
    navigation.navigate("StockDetails", {
      symbol: symbol,
      screen: "StockDetails"
    });
  };

  // function onLongPress() {
  //   if (this.props.onLongPress) {
  //     this.props.onLongPress(this.context, this.props.currentMessage);
  //   } else {
  //     if (this.props.currentMessage.text) {
  //       const options = ["Copy Text", "Cancel"];
  //       const cancelButtonIndex = options.length - 1;
  //       this.context.actionSheet().showActionSheetWithOptions(
  //         {
  //           options,
  //           cancelButtonIndex
  //         },
  //         buttonIndex => {
  //           switch (buttonIndex) {
  //             case 0:
  //               Clipboard.setString(this.props.currentMessage.text);
  //               break;
  //           }
  //         }
  //       );
  //     }
  //   }
  // }

  const lastMessage = async message => {
    await firestore
      .collection("publicgroups")
      .doc(item.groupID)
      .update({
        lastmessage: message
      });
    // inc
    //   .update({
    //     lastmessage: message,
    //   })
    //   .then(() => {})
    //   .catch(() => {});
  };

  function sendMessagesToChat() {
    const messageRef = firestore
      .collection("message")
      .doc(item.groupID)
      .collection("messages")
      .doc();

    messageRef
      .set({
        _id: newMessage[i]._id,
        messageID: messageRef.id,
        createdAt: newMessage[i].createdAt.toUTCString(),
        senderEmail: userEmail,
        text: newMessage[i].text,
        user: {
          _id: userId,
          name: username
        }
      })
      .then(function(docRef) {
        if (message.includes("$") && isNaN(message.slice(1))) {
          let s = message.slice(1);
          navigation.push("StockDetails", { symbol: s.trim().toUpperCase() });
        }
        setMessage("");
      })
      .catch(function(error) {
        Alert.alert(error.message);
        console.log("Error:", error);
      });
  }

  function onSend(newMessage = []) {
    console.log("message is ", newMessage);

    const messageRef = firestore
      .collection("message")
      .doc(item.groupID)
      .collection("messages")
      .doc();
    for (let i = 0; i < newMessage.length; i++) {
      messageRef
        .set({
          _id: newMessage[i]._id,
          messageID: messageRef.id,
          createdAt: newMessage[i].createdAt.toUTCString(),
          senderEmail: userEmail,
          text: newMessage[i].text,
          user: {
            _id: userid,
            name: username
          }
        })
        .then(function(docRef) {
          setMessages(GiftedChat.append(messages, newMessage));
          let message = newMessage[i].text;
          lastMessage(message);
          if (message.includes("$") && isNaN(message.slice(1))) {
            let s = message.slice(1);
            navigation.push("StockDetails", { symbol: s.trim().toUpperCase() });
          }
        })
        .catch(function(error) {
          Alert.alert(error.message);
          console.log("Error:", error);
        });
    }
    setMessages(GiftedChat.append(messages, newMessage));
  }

  const _navigateToStockDetails = item => {
    console.log(item);
    let message = item.message;
    message = message.split(" ");
    for (let i = 0; i < message.length; ++i) {
      if (message[i].includes("$") && isNaN(message[i].slice(1))) {
        let s = message[i].slice(1);
        navigation.push("StockDetails", { symbol: s.trim().toUpperCase() });
      }
    }
  };

  renderBubble = props => {
    return (
      <View>
        <Text style={styles.username}>{props.currentMessage.user.name}</Text>
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: "#147efb"
            },
            left: {
              backgroundColor: "#7c818c"
            }
          }}
          textStyle={{
            left: {
              color: "white"
            }
          }}
        />
      </View>
    );
  };

  renderSend = props => {
    return (
      <Send {...props} containerStyle={styles.sendContainer}>
        <View
          //source={SendIcon}
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: "#147efb",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center"
            //marginRight: 15
          }}
        >
          {/* <Feather name="arrow-up" color="#383c4a" size={28} fontWeight={900} /> */}
          <FontAwesome5
            name="arrow-up"
            color="#383c4a"
            size={20}
            fontWeight={900}
          />
        </View>
      </Send>
    );
  };

  const customtInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "#383c4a",
          borderTopColor: "#E8E8E8",
          borderTopWidth: 1

          //padding: 8
        }}
      />
    );
  };

  /** render the time labels in the bubble */
  const renderTime = () => {
    return (
      <Time
        textStyle={{
          right: {
            //color: Colors.snow,
            fontFamily: "Montserrat-Light",
            fontSize: 14
          },
          left: {
            ///color: Colors.snow,
            fontFamily: "Montserrat-Light",
            fontSize: 14
          }
        }}
      />
    );
  };

  const CustomView = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center"
        }}
      >
        <TouchableOpacity>
          <Feather name="dollar-sign" size={22} color="#3e7af0" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="at-sign" size={22} color="#3e7af0" />
        </TouchableOpacity>
        <TouchableOpacity
        // onPress={() => pickImage()}
        >
          <Ionicons name="md-images" size={26} color="#3e7af0" />
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <EvilIcons name="location" size={29} color="#3e7af0" />
        </TouchableOpacity> */}
        {/* <TouchableOpacity>
          <FontAwesome name="microphone" size={24} color="#3e7af0" />
        </TouchableOpacity> */}

        <TouchableOpacity>
          <MaterialCommunityIcons name="gif" size={35} color="#3e7af0" />
        </TouchableOpacity>
      </View>
    );
  };
  console.log("item is ", item);
  return (
    <View style={styles.main}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="left" color="#FFF" size={24} />
        </TouchableOpacity>
        <Text style={styles.header}> {item.groupName}</Text>
        {/* <Image source={{ uri: itemPic }} style={styles.avatar} /> */}
        <TouchableOpacity
        // onPress={() =>
        //   navigation.push("StockDetails", {
        //     symbol: "SQ"
        //   })
        // }
        //onPress={() => navigation.navigate("StockProfile")}
        >
          <Image
            source={require("../../assets/icon.png")}
            // source={{ uri: itemPic }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      <GiftedChat
        isAnimated={true}
        renderAccessory={CustomView}
        //onPressActionButton={() => _navigateToStockDetails}
        //showUserAvatar={true}
        //showAvatarForEveryMessage={true}
        inverted={true}
        timeTextStyle={{ left: { color: "white" } }}
        //renderTime={renderTime}
        //renderAvatar={true}
        messages={messages}
        renderSend={renderSend}
        renderBubble={renderBubble}
        textInputStyle={styles.textInput}
        isTyping={true}
        //renderUsernameOnMessage={true}
        renderInputToolbar={props => customtInputToolbar(props)}
        multiline
        placeholder={"Enter a message..."}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: 1,
          name: username
        }}
        parsePatterns={linkStyle => [
          {
            type: "phone",
            style: linkStyle
            // onPress: this.onPressPhoneNumber
          },
          {
            pattern: /#(\w+)/,
            style: {
              ...linkStyle,
              color: "white",
              fontWeight: "bold",
              textDecorationLine: "underline"
            }
            // onPress: this.onPressHashtag
          },
          {
            pattern: /\$(\w+)/,

            style: {
              ...linkStyle,
              color: "#33CC00",
              fontWeight: "bold",
              textDecorationLine: "underline"
            },
            onPress: onPressCashtag
          },
          {
            pattern: /\@(\w+)/,
            style: {
              ...linkStyle,
              color: "#33CC00",
              fontWeight: "bold",
              textDecorationLine: "underline"
            }
            // onPress: this.onPressHashtag
          }
        ]}
      />
    </View>
  );
}
export default Discussion;

const styles = StyleSheet.create({
  input: {
    width: 80,
    height: 100
  },
  ImageStyle: {
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center"
  },
  flatList: {
    //position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "80%"
  },
  sendContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginRight: 15,
    color: "white"
  },

  main: {
    backgroundColor: "#383c4a",
    height: "100%",
    //paddingHorizontal: 20,
    // borderBottomLeftRadius: 35,
    // borderBottomRightRadius: 35,
    paddingTop: 40
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20
  },
  username: {
    color: "#147efb",
    fontFamily: "Montserrat_700Bold",
    fontSize: 14,
    flex: 1,
    paddingVertical: 5
    //textAlign: "center"
  },

  textInput: {
    backgroundColor: "#4b5162",
    borderRadius: 30,
    marginRight: 20,
    marginLeft: 20,

    fontSize: 20,
    color: "#FFF",
    paddingLeft: 20,
    paddingVertical: 50,
    marginVertical: 50
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%"
  },
  header: {
    color: "#FFF",
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
    flex: 1,
    textAlign: "center"
  }
});
