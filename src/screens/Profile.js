import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  ActionSheetIOS
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as firebase from "firebase";
import LinkPortfolioButton from "../components/LinkPortfolioButton";

const { height } = Dimensions.get("screen");
class _Profile extends Component {
  state = {
    images: [],
    userDetails: {},
    userKey: "",
    user: "",
    following: false,
    blockedusers: []
  };

  componentDidMount() {
    if (this.props.route.params && this.props.route.params.uid) {
      this.setState(
        {
          user: this.props.route.params.uid
        },
        () => this.fetchUsers()
      );
    } else {
      this.setState(
        {
          user: firebase.default.auth().currentUser.uid
        },
        () => this.fetchUsers()
      );
    }
  }

  actionSheet = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Block User"],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
        userInterfaceStyle: "dark"
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          this.block();
        } else if (buttonIndex === 2) {
          setResult("🔮");
        }
      }
    );

  fetchUsers = async () => {
    const db = firebase.default.firestore();
    var users = db.collection("users");
    users
      .where("id", "==", this.state.user)
      .get()
      .then(s => {
        s.docs.forEach(doc => {
          this.setState({
            userDetails: doc.data(),
            userKey: doc.id,
            following: doc.data().followers,
            blockedusers: doc.data().blockedusers
          });
        });
      })
      .catch(e => {
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
        followers: firebase.firestore.FieldValue.arrayUnion(uid)
      })

      .then(s => this.fetchUsers())
      .catch(e => console.log("e", e));
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
        followers: firebase.firestore.FieldValue.arrayRemove(uid)
      })

      .then(s => {
        this.fetchUsers();
      })
      .catch(e => console.log("e", e));
  };

  block = async () => {
    const uid = this.state.user;

    firebase.default
      .firestore()
      .collection("users")
      .doc(this.state.userKey)
      .update({
        blockedusers: firebase.firestore.FieldValue.arrayUnion(uid)
      })

      .then(s => this.fetchUsers())
      .catch(e => console.log("e", e));
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
        blockedusers: firebase.firestore.FieldValue.arrayRemove(uid)
      })

      .then(s => {
        this.fetchUsers();
      })
      .catch(e => console.log("e", e));
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
            marginTop: 30,
            paddingHorizontal: 10
          }}
        >
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Feather name="chevron-left" size={30} color="#FFF" />
          </TouchableOpacity>

          <Text style={styles.headertitle}>Profile</Text>

          <TouchableOpacity onPress={this.actionSheet}>
            <Feather name="more-horizontal" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.data}>
          <View>
            <Image
              source={
                userDetails.image && userDetails.image !== ""
                  ? { uri: userDetails.image }
                  : require("../../assets/placeholderimage.png")
              }
              style={{
                width: 80,
                height: 80,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: "#FFF"
              }}
            />
          </View>

          <View style={{ flexDirection: "column" }}>
            {/* <Text
              style={{
                fontSize: 18,
                textAlign: "center",

                color: "#FFF",
                fontWeight: "500"
              }}
            >
              +30.53%
            </Text> */}

            <TouchableOpacity
            //onPress={() => this.props.navigation.goBack()}
            >
              <Feather
                style={{
                  fontSize: 18,
                  textAlign: "center",

                  color: "#FFF",
                  fontWeight: "500"
                }}
                name="lock"
                size={30}
                color="#FFF"
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 18,
                top: 10,
                color: "#FFF"
              }}
            >
              Monthly Gain
            </Text>
          </View>
          <View style={{ paddingRight: 30 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                textAlign: "center",
                color: "#FFF"
              }}
            >
              {userDetails.followers ? userDetails.followers.length : "0"}
            </Text>
            <Text
              style={{
                fontSize: 18,
                top: 10,
                color: "#FFF"
              }}
            >
              Subscribers
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 30
          }}
        >
          {/* <View style={styles.common1}>
            <Text
              style={{
                width: 30,
                height: 30,
                textAlign: "center",
                marginTop: 5,
                color: "#FFF"
              }}
            >
              @
            </Text>
            <Text style={{ fontSize: 13, marginLeft: 10, color: "#FFF" }}>
              {userDetails.Name ? userDetails.Name : ""}
            </Text>
          </View> */}

          {/* <View style={styles.common1}>
            <Text
              style={{
                width: 30,
                height: 30,
                textAlign: "center",
                marginTop: 5,
                color: "#FFF"
              }}
            >
              email
            </Text>
            <Text style={{ fontSize: 13, marginLeft: 10, color: "#FFF" }}>
              {userDetails.email ? userDetails.email : ""}
            </Text>
          </View> */}

          {/* <View style={styles.common1}>
            <Text
              style={{
                width: 30,
                height: 30,
                textAlign: "center",
                marginTop: 5,
                color: "#FFF"
              }}
            >
              #
            </Text>
            <Text style={{ fontSize: 13, marginLeft: 10, color: "#FFF" }}>
              {userDetails.phoneNo ? userDetails.phoneNo : "-"}
            </Text>
          </View> */}

          {/* <Text
              style={{
                width: 30,
                height: 30,
                textAlign: "center",
                marginTop: 5,
                color: "#FFF"
              }}
            >
              bio
            </Text> */}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Text style={styles.uname}>
              @{userDetails.Name ? userDetails.Name : ""}
            </Text>

            <Image
              source={require("../../assets/verified.png")}
              // source={{ uri: itemPic }}
              style={{ height: 20, width: 20 }}
            />
          </View>

          <Text style={styles.bio}>
            {userDetails.bio ? userDetails.bio : " "}
          </Text>

          {userDetails.id &&
          userDetails.id !== firebase.default.auth().currentUser.uid ? (
            <View>
              {/* {this.state.following ? ( */}
              {!isFollowing ? (
                <TouchableOpacity
                  style={styles.follow}
                  onPress={() => this.follow()}
                >
                  <Text style={styles.followtext}>SUBSCRIBE</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.unfollow}
                  onPress={() => this.unFollow()}
                >
                  <Text style={styles.following}>UNSUBSCRIBE</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : null}

          {userDetails.id &&
          userDetails.id !== firebase.default.auth().currentUser.uid ? (
            <View style={{ marginTop: 20 }}>
              {!isBlocked ? (
                <TouchableOpacity
                //style={[styles.block, { backgroundColor: "red" }]}
                //onPress={() => this.block()}
                >
                  {/* <Text style={styles.blockuser}>Block User</Text> */}
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
                    fetchUsers: this.fetchUsers
                  })
                }
              >
                <Text style={styles.editprofiletext}>Edit Profile</Text>
              </TouchableOpacity>

              <View style={styles.feed}>
                {/* <Text style={styles.header}>Portfolio</Text> */}
                <Text style={styles.text}>
                  Your portfolio is not connected.
                </Text>

                <View style={{ paddingVertical: 20, marginHorizontal: 10 }}>
                  <View style={styles.feed}>
                    {/* <Image
                      source={require("../../assets/icon.png")}
                      // source={{ uri: itemPic }}
                      style={styles.avatar}
                    /> */}
                    <Text style={styles.header2}> Link your broker</Text>
                    <Text style={styles.text}>
                      Account values will always be private.
                    </Text>
                    <Text style={styles.link}>Why link an account?</Text>
                  </View>
                  <View
                    style={{
                      //justifyContent: "center",
                      alignItems: "center",
                      paddingTop: 50
                    }}
                  >
                    <LinkPortfolioButton></LinkPortfolioButton>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

export default _Profile;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: height,
    backgroundColor: "#282c34"
  },
  root: {
    //   backgroundColor: theme['color-basic-100'],
    marginTop: 10
  },
  header: {
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 17
  },
  userInfo: {
    flexDirection: "row",
    paddingVertical: 18
  },
  bordered: {
    borderBottomWidth: 1,
    borderColor: "transparent"
  },
  section: {
    flex: 1,
    alignItems: "center"
  },
  space: {
    marginBottom: 3
    // color: theme["color-basic-1000"],
  },
  separator: {
    backgroundColor: "transparent",
    alignSelf: "center",
    flexDirection: "row",
    flex: 0,
    width: 1,
    height: 42
  },
  buttons: {
    flexDirection: "row",
    paddingVertical: 8
  },
  button: {
    flex: 1,
    alignSelf: "center"
  },
  text: {
    color: "transparent"
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
    justifyContent: "center"
  },
  unfollow: {
    //borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    //width: "80%",
    padding: 10,
    borderColor: "silver",
    borderRadius: 5,
    backgroundColor: "#7c818c"
  },
  follow: {
    //borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    //width: "80%",
    padding: 10,
    borderColor: "silver",
    borderRadius: 5,
    backgroundColor: "#3b5998"
  },
  editprofile: {
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    padding: 10,
    borderColor: "silver",
    borderRadius: 3
  },

  block: {
    //borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    padding: 10,
    borderColor: "silver",
    borderRadius: 3
  },

  feed: {
    paddingTop: 20
  },

  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15
  },
  headertitle: {
    width: "82%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF"
  },
  pickimage: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20
  },
  name: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 12,
    marginTop: 10
  },
  changeusername: {
    marginTop: 10,
    height: 40,
    borderColor: "gray",
    borderWidth: 1
  },
  change: {
    marginTop: 10,
    height: 40,
    borderColor: "gray",
    borderWidth: 1
  },
  save: {
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    padding: 10,
    borderColor: "silver",
    borderRadius: 3
  },
  data: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 20
  },
  uname: {
    textAlign: "left",
    fontWeight: "600",
    fontSize: 20,
    //top: 10,
    paddingLeft: 10,
    paddingRight: 5,
    color: "#FFF"
  },

  bio: {
    textAlign: "left",
    //fontWeight: "600",
    fontSize: 18,
    paddingVertical: 20,
    paddingLeft: 10,
    color: "#FFF"
  },
  blockuser: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    color: "white",
    fontWeight: "bold"
  },
  unblockuser: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    fontWeight: "bold",
    color: "red"
  },
  common1: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center"
  },
  following: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    color: "white"
  },
  editprofiletext: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    color: "#FFF"
  },
  followtext: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFF"
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    //position: "absolute",
    //bottom: 10,
    //right: 110,
    //top: 200,
    height: 50,
    backgroundColor: "#147efb",
    borderRadius: 100,
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 30
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 30,
    alignSelf: "center"
  },
  header2: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
    flex: 1,
    fontSize: 20,
    paddingBottom: 10,
    textAlign: "center"
  },
  text: {
    //fontFamily: "Montserrat_400Regular",
    color: "#FFF",
    textAlign: "center",
    fontSize: 20
  },
  link: {
    //fontFamily: "Montserrat_400Regular",
    color: "#147efb",
    textAlign: "center",
    fontSize: 20,
    paddingVertical: 10
  }
});
