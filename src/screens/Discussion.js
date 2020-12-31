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
import { GiftedChat, Send } from "react-native-gifted-chat";
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

  const { item } = route.params;
  console.log("curremt user ", userid, userEmail);

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
            createdAt: new Date().getTime(),
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

  function getMessages() {
    const db = firestore;
    var messages = [];

    db.collection("message")
      .doc(item.groupID)
      .collection("messages")
      .orderBy("date_time")
      .onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
            // console.log("New Message: ", change.doc.data());
            messages.unshift(change.doc.data());
          }
          if (change.type === "modified") {
            console.log("Modified Message", change.doc.data());
          }
          if (change.type === "removed") {
            console.log("Removed Message:", change.doc.data());
          }
          console.log("hello");
          setMessageList(messages);
        });
      });
  }

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

    const userEmail = firebase.auth().currentUser.email;

    messageRef
      .set({
        messageID: messageRef.id,
        message: message,
        senderId: userID,
        senderEmail: userEmail,
        username: username,
        date_time: new Date()

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
          {/* <Feather name="arrow-up" color="white" size={28} fontWeight={900} /> */}
          <FontAwesome5
            name="arrow-up"
            color="white"
            size={20}
            fontWeight={900}
          />
        </View>
      </Send>
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
        <TouchableOpacity onPress={() => pickImage()}>
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
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          height: 80,
          width: "100%",
          backgroundColor: "white",
          alignItems: "center"
        }}
      >
        <TouchableOpacity
          // style={{ position: "absolute", top: 50, left: 20 }}
          onPress={() => navigation.navigate("Chat")}
        >
          <AntDesign
            name="left"
            size={30}
            color="black"
            style={{ marginTop: 20, marginLeft: 20 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 20,
            fontSize: 20,
            marginTop: 20,
            fontWeight: "bold",
            textAlign: "center"
          }}
        >
          {item.groupName}
        </Text>
      </View>
      <KeyboardAvoidingView style={styles.container}>
        <GiftedChat
          isAnimated={true}
          renderAccessory={CustomView}
          onPressActionButton={() => _navigateToStockDetails}
          messages={messages}
          renderSend={renderSend}
          onSend={newMessages => onSend(newMessages)}
          user={{
            _id: 1,
            name: username
          }}
          parsePatterns={linkStyle => [
            {
              pattern: /#(\w+)/,
              style: { ...linkStyle, color: "lightgreen" },
              onPress: props => {
                alert(`press on ${props}`);
              }
            }
          ]}
        />
      </KeyboardAvoidingView>
    </View>
  }

  const _navigateToStockDetails = item => {
    let message = item.message;
    if (message.includes("$") && isNaN(message.slice(1))) {
      let s = message.slice(1);
      navigation.push("StockDetails", { symbol: s.trim().toUpperCase() });
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" enabled>
      <View style={styles.main}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="left" color="#000119" size={24} />
          </TouchableOpacity>
          <Text style={styles.username}>{item.groupName}</Text>
        </View>

        <FlatList
          inverted
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
          data={messageList}
          keyExtractor={(item, index) => "key" + index}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => _navigateToStockDetails(item)}>
                <MessageItem item={item} />
              </TouchableOpacity>
            );
          }}
        />

        <Input
          term={message}
          onTermChange={message => setMessage(message)}
          onSendPress={sendMessagesToChat}
        />

        {/* </TouchableWithoutFeedback> */}
      </View>
    </KeyboardAvoidingView>

    // </LinearGradient>
  );
}
export default Discussion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  input: {
    width: 80
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
    marginRight: 15
  },
  main: {
    backgroundColor: "#FFF",
    height: "100%",
    paddingHorizontal: 20,
    // borderBottomLeftRadius: 35,
    // borderBottomRightRadius: 35,
    paddingTop: 40
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  username: {
    color: "#000119",
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
    flex: 1,
    textAlign: "center"
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  }
});