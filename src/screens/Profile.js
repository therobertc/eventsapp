import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";

import * as firebase from "firebase";
const { height } = Dimensions.get("screen");
class _Profile extends Component {
  state = {
    images: [],
    userDetails: {},
    userKey: "",
    user: "",
  };

  componentDidMount() {
    if (this.props.route.params && this.props.route.params.uid) {
      this.setState(
        {
          user: this.props.route.params.uid,
        },
        () => this.fetchPosts()
      );
    } else {
      this.setState(
        {
          user: firebase.default.auth().currentUser.uid,
        },
        () => this.fetchPosts()
      );
    }
  }

  fetchPosts = async () => {
    const db = firebase.default.firestore();
    var users = db.collection("users");
    users
      .where("id", "==", this.state.user)
      .get()
      .then((s) => {
        alert();
        s.docs.forEach((doc) => {
          this.setState({ userDetails: doc.data(), userKey: doc.id });
        });
      })
      .catch((e) => {
        console.log("e", e);
      });
  };

  follow = async () => {
    const uid = firebase.default.auth().currentUser.uid;
    let udetails = this.state.userDetails;
    udetails.followers = [{ id: true }];

    firebase.default
      .firestore()
      .collection("users")
      .doc(this.state.userKey)
      .update({
        followers: firebase.firestore.FieldValue.arrayUnion({
          [uid]: true,
        }),
      })

      .then((s) => console.log("s", s))
      .catch((e) => console.log("e", e));

    // await firebase.default
    //   .firestore()
    //   .collection("users")
    //   .doc()
    //   //   .set(udetails)
    //   .set({
    // //     followers: firebase.firestore.FieldValue.arrayUnion({
    // id: true,
    // //     }),
    //   })
    //   .then((s) => {
    //     console.log(s);
    //   })
    //   .catch((e) => console.log("e", e));
  };

  fetchUserDetails = async () => {
    try {
      const userDetails = await this.props.firebase.getUserDetails();
      // console.log('USER DETAILS ===========>>', userDetails)
      this.setState({ userDetails });
    } catch (error) {
      console.log(error);
    }
  };

  handleSignout = async () => {
    try {
      await this.props.firebase.signOut();
      this.props.navigation.navigate("Auth");
    } catch (error) {
      console.log(error);
    }
  };

  handleEditAvatarNavigation = () => {
    this.props.navigation.navigate("EditAvatar");
  };

  render() {
    const { userKey, userDetails } = this.state;
    return (
      <View
        style={{
          padding: 10,
          marginTop: 15,
          backgroundColor: "white",
          height: height,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <View>
            <Image
              source={require("../../assets/profile.jpeg")}
              style={{ width: 80, height: 80, borderRadius: 50 }}
            />
            <Text
              style={{
                textAlign: "center",
                fontWeight: "600",
                fontSize: 12,
                top: 10,
              }}
            >
              {userDetails.Name ? userDetails.Name : ""}
            </Text>
          </View>
          <View>
            <Text
              style={{ fontSize: 14, fontWeight: "500", textAlign: "center" }}
            >
              {userDetails.followers ? userDetails.followers.length : ""}
            </Text>
            <Text style={{ fontSize: 12, textAlign: "center" }}>Followers</Text>
          </View>
          {userDetails.id &&
          userDetails.id !== firebase.default.auth().currentUser.uid ? (
            <View>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  width: "90%",
                  padding: 10,
                  left: 10,
                  borderColor: "silver",
                  borderRadius: 3,
                }}
                onPress={() => this.follow()}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  Follow
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>

        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
              padding: 5,
              borderColor: "silver",
              borderRadius: 3,
            }}
            onPress={() =>
              this.props.navigation.push("Editprofile", { userkey: userKey })
            }
          >
            <Text
              style={{ fontSize: 12, fontWeight: "500", textAlign: "center" }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 10,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 10,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/profile2.png")}
              style={{ width: 30, height: 30 }}
            />
            <Text style={{ fontSize: 13, marginLeft: 10 }}>
              {userDetails.Name ? userDetails.Name : ""}
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 10,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/email.png")}
              style={{ width: 30, height: 20 }}
            />
            <Text style={{ fontSize: 13, marginLeft: 10 }}>
              {userDetails.email ? userDetails.email : ""}
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 10,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/phone2.png")}
              style={{ width: 30, height: 30 }}
            />
            <Text style={{ fontSize: 13, marginLeft: 10 }}>
              {userDetails.phoneNo ? userDetails.phoneNo : "-"}
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 10,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/phone2.png")}
              style={{ width: 30, height: 30 }}
            />
            <Text style={{ fontSize: 13, marginLeft: 10 }}>
              {userDetails.bio ? userDetails.bio : "no bio present"}
            </Text>
          </View>

          {/* <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 10,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/website.png")}
              style={{ width: 30, height: 30 }}
            />
            <Text style={{ fontSize: 13, marginLeft: 10 }}> www.Here.com</Text>
          </View> */}
        </View>
      </View>
    );
  }
}

export default _Profile;

const styles = StyleSheet.create({
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
});
