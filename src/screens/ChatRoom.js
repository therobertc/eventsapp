import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import {
  Ionicons,
  Entypo,
  EvilIcons,
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { GiftedChat } from "react-native-gifted-chat";
import fire, { firestore } from "../database/firebase";
import * as ImagePicker from "expo-image-picker";
const screen = Dimensions.get("window");
var itm = [];

export default function ChatRoom({ route, navigation }) {
  console.log(
    "We Are In Private Chat \n<------------------------------------------------------------------------------------------------>\n"
  );
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState(fire.auth().currentUser.displayName);
  const [userId, setUserId] = useState(fire.auth().currentUser.uid);
  const { name, uid } = route.params;

  useEffect(() => {
    const unsubscribeListener = firestore
      .collection("users")
      .doc(userId)
      .collection("ChatHeads")
      .doc(uid)
      .collection("ChatMsgs")
      .orderBy("createdAt", "desc")
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          let firebaseData = doc.data();
          firebaseData.createdAt = firebaseData.createdAt
            .toDate()
            .toUTCString();
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      uploadImage(result.uri);
    }
  };

  const uploadImage = async uri => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = fire
      .storage()
      .ref("images")
      .child(new Date().toDateString());
    ref.put(blob).then(result => {
      result.ref.getDownloadURL().then(url => {
        const message = [
          {
            _id: new Date().toUTCString(),
            image: url,
            createdAt: new Date(),
            user: {
              _id: 1,
              name: username,
              avatar: "https://placeimg.com/140/140/any"
            }
          }
        ];
        var ref = firestore.collection("users").doc();
        var newPostKey = ref.id;
        for (var i = 0; i < message.length; i++) {
          if (message[i].image) {
            firestore
              .collection("users")
              .doc(userId)
              .collection("ChatHeads")
              .doc(uid)
              .set({
                name: name,
                uid: uid
              });

            firestore
              .collection("users")
              .doc(uid)
              .collection("ChatHeads")
              .doc(userId)
              .set({
                name: username,
                uid: userId
              });

            firestore
              .collection("users")
              .doc(UserId)
              .collection("ChatHeads")
              .doc(uid)
              .collection("ChatMsgs")
              .doc(newPostKey)
              .set({
                _id: message[i]._id,
                createdAt: message[i].createdAt.toUTCString(),
                image: message[i].image,
                user: {
                  _id: 1,
                  name: username
                }
              });

            firestore
              .collection("users")
              .doc(uid)
              .collection("ChatHeads")
              .doc(UserId)
              .collection("ChatMsgs")
              .doc(newPostKey)
              .set({
                _id: message[i]._id,
                createdAt: message[i].createdAt.toUTCString(),
                image: message[i].image,
                user: {
                  _id: 2,
                  name: username
                }
              });
          } else {
            console.log("false");
          }
        }

        setMessages(GiftedChat.append(messages, message));
      });
    });
  };

  function onSend(newMessage = []) {
    var UserId = fire.auth().currentUser.uid;
    firestore
      .collection("users")
      .doc(UserId)
      .collection("ChatHeads")
      .doc(uid)
      .set({
        name: name,
        uid: uid
      });

    firestore
      .collection("users")
      .doc(uid)
      .collection("ChatHeads")
      .doc(UserId)
      .set({
        name: fire.auth().currentUser.displayName,
        uid: UserId
      });

    var ref = firestore.collection("users").doc();
    var newPostKey = ref.id;
    for (var i = 0; i < newMessage.length; i++) {
      firestore
        .collection("users")
        .doc(UserId)
        .collection("ChatHeads")
        .doc(uid)
        .collection("ChatMsgs")
        .doc(newPostKey)
        .set({
          _id: newMessage[i]._id,
          createdAt: newMessage[i].createdAt,
          text: newMessage[i].text,
          user: {
            _id: 1,
            name: name
          }
        });

      firestore
        .collection("users")
        .doc(uid)
        .collection("ChatHeads")
        .doc(UserId)
        .collection("ChatMsgs")
        .doc(newPostKey)
        .set({
          _id: newMessage[i]._id,
          createdAt: newMessage[i].createdAt,
          text: newMessage[i].text,
          user: {
            _id: 2,
            name: username
          }
        });
    }
    setMessages(GiftedChat.append(messages, newMessage));
  }

  function CustomView() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center"
        }}
      >
        <TouchableOpacity>
          <Ionicons name="ios-camera" size={30} color="#3e7af0" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickImage()}>
          <Ionicons name="md-images" size={29} color="#3e7af0" />
        </TouchableOpacity>
        <TouchableOpacity>
          <EvilIcons name="location" size={29} color="#3e7af0" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="microphone" size={24} color="#3e7af0" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="emoji-happy" size={22} color="#3e7af0" />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="like1" size={26} color="#3e7af0" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          height: 80,
          width: "100%",
          backgroundColor: "#35383F",
          alignItems: "center"
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <AntDesign
            name="left"
            size={30}
            color="#FFF"
            style={{ marginTop: 20, marginLeft: 20 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 20,
            fontSize: 20,
            marginTop: 20,
            fontWeight: "bold"
          }}
        >
          {name}
        </Text>
      </View>
      <KeyboardAvoidingView style={styles.container}>
        <GiftedChat
          isAnimated={true}
          renderAccessory={CustomView}
          messages={messages}
          onSend={newMessages => onSend(newMessages)}
          user={{
            _id: 1,
            name: username
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    width: 80
  },
  ImageStyle: {
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center"
  }
});
