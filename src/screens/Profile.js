import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as firebase from "firebase";

const { height } = Dimensions.get("screen");
class _Profile extends Component {
  state = {
    images: [],
    userDetails: {},
    userKey: "",
    user: "",
    following: false,
    blockedusers: [],
  };

  componentDidMount() {
    if (this.props.route.params && this.props.route.params.uid) {
      this.setState(
        {
          user: this.props.route.params.uid,
        },
        () => this.fetchUsers()
      );
    } else {
      this.setState(
        {
          user: firebase.default.auth().currentUser.uid,
        },
        () => this.fetchUsers()
      );
    }
  }

  fetchUsers = async () => {
    const db = firebase.default.firestore();
    var users = db.collection("users");
    users
      .where("id", "==", this.state.user)
      .get()
      .then((s) => {
        s.docs.forEach((doc) => {
          this.setState({
            userDetails: doc.data(),
            userKey: doc.id,
            following: doc.data().followers,
            blockedusers: doc.data().blockedusers,
          });
        });
      })
      .catch((e) => {
        console.log("e", e);
      });
  };

  follow = async () => {
    const uid = this.state.user;
    let udetails = this.state.userDetails;
    udetails.followers = [{ id: true }];

    firebase.default
      .firestore()
      .collection("users")
      .doc(this.state.userKey)
      .update({
        followers: firebase.firestore.FieldValue.arrayUnion(uid),
      })

      .then((s) => this.fetchUsers())
      .catch((e) => console.log("e", e));
  };

  unFollow = async () => {
    const uid = this.state.user;
    let udetails = this.state.userDetails;
    udetails.followers = [{ id: true }];

    firebase.default
      .firestore()
      .collection("users")
      .doc(this.state.userKey)
      .update({
        followers: firebase.firestore.FieldValue.arrayRemove(uid),
      })

      .then((s) => {
        this.fetchUsers();
      })
      .catch((e) => console.log("e", e));
  };

  block = async () => {
    const uid = this.state.user;

    firebase.default
      .firestore()
      .collection("users")
      .doc(this.state.userKey)
      .update({
        blockedusers: firebase.firestore.FieldValue.arrayUnion(uid),
      })

      .then((s) => this.fetchUsers())
      .catch((e) => console.log("e", e));
  };

  unBlock = async () => {
    const uid = this.state.user;
    let udetails = this.state.userDetails;
    udetails.followers = [{ id: true }];

    firebase.default
      .firestore()
      .collection("users")
      .doc(this.state.userKey)
      .update({
        blockedusers: firebase.firestore.FieldValue.arrayRemove(uid),
      })

      .then((s) => {
        this.fetchUsers();
      })
      .catch((e) => console.log("e", e));
  };

  render() {
    const { userKey, userDetails, following, blockedusers, user } = this.state;
    let isFollowing = false;
    let isBlocked = false;

    if (following && following.includes(user)) {
      isFollowing = true;
    }

    if (blockedusers && blockedusers.includes(user)) {
      isBlocked = true;
    }

    return (
      <ScrollView style={styles.container}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Feather name="chevron-left" size={30} color="black" />
          </TouchableOpacity>

          <Text style={styles.headertitle}>Profile</Text>
        </View>
        <View style={styles.data}>
          <View>
            <Image
              source={
                userDetails.image && userDetails.image !== ""
                  ? { uri: userDetails.image }
                  : require("../../assets/placeholderimage.png")
              }
              style={{ width: 80, height: 80, borderRadius: 50 }}
            />
            <Text style={styles.uname}>
              {userDetails.Name ? userDetails.Name : ""}
            </Text>
          </View>
          <View>
            <Text
              style={{ fontSize: 14, fontWeight: "500", textAlign: "center" }}
            >
              {userDetails.followers ? userDetails.followers.length : "0"}
            </Text>
            <Text style={{ fontSize: 12, textAlign: "center" }}>Followers</Text>
          </View>
          {userDetails.id &&
          userDetails.id !== firebase.default.auth().currentUser.uid ? (
            <View>
              {/* {this.state.following ? ( */}
              {!isFollowing ? (
                <TouchableOpacity
                  style={styles.follow}
                  onPress={() => this.follow()}
                >
                  <Text style={styles.followtext}>Follow</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.unfollow}
                  onPress={() => this.unFollow()}
                >
                  <Text style={styles.following}>Following</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : null}
        </View>
        {userDetails.id &&
        userDetails.id !== firebase.default.auth().currentUser.uid ? (
          <View style={{ marginTop: 20 }}>
            {!isBlocked ? (
              <TouchableOpacity
                style={[
                  styles.editprofile,
                  { backgroundColor: "red", borderColor: "white" },
                ]}
                onPress={() => this.block()}
              >
                <Text style={styles.blockuser}>Block User</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.editprofile}
                onPress={() => this.unBlock()}
              >
                <Text style={styles.unblockuser}>Unblock User</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={{ marginTop: 20 }}>
            <TouchableOpacity
              style={styles.editprofile}
              onPress={() =>
                this.props.navigation.push("Editprofile", {
                  userkey: userKey,
                  fetchUsers: this.fetchUsers,
                })
              }
            >
              <Text style={styles.editprofiletext}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        )}

        <View
          style={{
            marginTop: 10,
          }}
        >
          <View style={styles.common1}>
            <Image
              source={require("../../assets/profile2.png")}
              style={{ width: 30, height: 30 }}
            />
            <Text style={{ fontSize: 13, marginLeft: 10 }}>
              {userDetails.Name ? userDetails.Name : ""}
            </Text>
          </View>

          <View style={styles.common1}>
            <Image
              source={require("../../assets/email.png")}
              style={{ width: 30, height: 22 }}
            />
            <Text style={{ fontSize: 13, marginLeft: 10 }}>
              {userDetails.email ? userDetails.email : ""}
            </Text>
          </View>

          <View style={styles.common1}>
            <Image
              source={require("../../assets/phone2.png")}
              style={{ width: 30, height: 30 }}
            />
            <Text style={{ fontSize: 13, marginLeft: 10 }}>
              {userDetails.phoneNo ? userDetails.phoneNo : "-"}
            </Text>
          </View>

          <View style={styles.common1}>
            <Text
              style={{
                width: 30,
                height: 30,
                textAlign: "center",
                marginTop: 5,
              }}
            >
              *
            </Text>
            <Text style={{ fontSize: 13, marginLeft: 10 }}>
              {userDetails.bio ? userDetails.bio : "no bio present"}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default _Profile;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
    height: height,
  },
  root: {
    //   backgroundColor: theme['color-basic-100'],
    marginTop: 10,
  },
  header: {
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 17,
  },
  userInfo: {
    flexDirection: "row",
    paddingVertical: 18,
  },
  bordered: {
    borderBottomWidth: 1,
    borderColor: "transparent",
  },
  section: {
    flex: 1,
    alignItems: "center",
  },
  space: {
    marginBottom: 3,
    // color: theme["color-basic-1000"],
  },
  separator: {
    backgroundColor: "transparent",
    alignSelf: "center",
    flexDirection: "row",
    flex: 0,
    width: 1,
    height: 42,
  },
  buttons: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  button: {
    flex: 1,
    alignSelf: "center",
  },
  text: {
    color: "transparent",
  },
  add: {
    backgroundColor: "#939393",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  unfollow: {
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
    padding: 10,
    left: 10,
    borderColor: "white",
    borderRadius: 5,
    backgroundColor: "#3b5998",
  },
  follow: {
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
    padding: 10,
    left: 10,
    borderColor: "silver",
    borderRadius: 5,
  },
  editprofile: {
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    padding: 5,
    borderColor: "silver",
    borderRadius: 3,
  },
  container: {
    padding: 10,
    backgroundColor: "white",
    height: height,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  headertitle: {
    width: "82%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  pickimage: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom:20
  },
  name: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 12,
    marginTop: 10,
  },
  changeusername: {
    marginTop: 10,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
  change: {
    marginTop: 10,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
  save: {
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    padding: 10,
    borderColor: "silver",
    borderRadius: 3,
  },
  data: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  uname: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 12,
    top: 10,
  },
  blockuser: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  unblockuser: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    fontWeight: "bold",
    color: "red",
  },
  common1: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  following: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  editprofiletext: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  followtext: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },
});
