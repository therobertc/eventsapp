import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import Input from "../components/Input";
import firebase, { firestore } from "./../database/firebase";
import MessageItem from "../components/MessageItem";

function Discussion({ route, navigation }) {
    const [messageList, setMessageList] = useState([]);
    const [message, setMessage] = useState("");
    const [isJoined, setIsJoined] = useState(false);
    const [username, setUsername] = useState(firebase.auth().currentUser.displayName);
    const { item } = route.params;
    const userID = firebase.auth().currentUser.uid;

    useEffect(() => {
        console.log(item);
        getUserJoinedAlreadyOrNot();
        getMessages();
    }, []);

    function getUserJoinedAlreadyOrNot() {
        firestore
            .collection("members")
            .doc(item.groupID)
            .collection("member")
            .where("userID", "==", userID)
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
            .orderBy('date_time')
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
        const userEmail = firebase.auth().currentUser.email;

        messageRef
            .set({
                messageID: messageRef.id,
                message: message,
                senderId: userID,
                senderEmail: userEmail,
                username: username,
                date_time: new Date(),
            })
            .then(function(docRef) {
                setMessage("");
            })
            .catch(function(error) {
                Alert.alert(error.message);
                console.log("Error:", error);
            });
    }



    return (
        <KeyboardAvoidingView behavior="padding" enabled>
            <View style={styles.main}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="left" color="#000119" size={24} />
                    </TouchableOpacity>
                    <Text style={styles.username}>{item.groupName}</Text>
                    {/* <Image source={{ uri: itemPic }} style={styles.avatar} /> */}
                </View>

                <FlatList
                    inverted
                    showsVerticalScrollIndicator={false}
                    style={styles.flatList}
                    data={messageList}
                    keyExtractor={(item, index) => "key" + index}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => {}}>
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
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: "80%"
    },
    flatList: {
        //position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: "80%"
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
