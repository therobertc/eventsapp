import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";

const { height } = Dimensions.get("screen");

class App extends React.Component {
  state = {
    userkey: "",
    Name: "",
    email: "",
    phoneNo: "",
    bio: "",
    image: "",
    updating: false,
    imgSelected: null,
  };

  async componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async (id) => {
    const db = firebase.default.firestore();
    var users = db.collection("users");
    users
      .where("id", "==", firebase.default.auth().currentUser.uid)
      .get()
      .then((s) => {
        s.docs.forEach((doc) => {
          this.setState(
            {
              Name: doc.data().Name ? doc.data().Name : "",
              email: doc.data().email ? doc.data().email : "",
              phoneNo: doc.data().phoneNo ? doc.data().phoneNo : "",
              image: doc.data().image ? doc.data().image : "",
              bio: doc.data().bio ? doc.data().bio : "",
              userKey: doc.id,
            },
            () => {
              this.setState({ imgSelected: null });
            }
          );
        });
      })
      .catch((e) => {
        console.log("e", e);
      });
  };

  update = (img) => {
    this.setState({ updating: true });
    firebase.default
      .firestore()
      .collection("users")
      .doc(this.state.userKey)
      .update({
        Name: this.state.Name,
        email: this.state.email,
        phoneNo: this.state.phoneNo,
        bio: this.state.bio,
        image: img,
      })

      .then((s) => {
        this.setState({ updating: false });

        this.props.navigation.goBack();
        this.props.route.params.fetchUsers();
      })
      .catch((e) => this.setState({ updating: false }));
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({
        image: result.uri,
        imgSelected: true,
      });
    }
  };

  uploadImageAsync = async (uri) => {
    this.setState({ updating: true });

    const uid = firebase.default.auth().currentUser.uid;
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    let key = new Date().getTime();
    const ref = firebase.default.storage().ref().child(uid);
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    let img = await snapshot.ref.getDownloadURL();

    this.update(img);
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Feather name="chevron-left" size={30} color="black" />
          </TouchableOpacity>

          <Text style={styles.headertitle}>Edit Profile</Text>
        </View>

        <View style={styles.pickimage}>
          <TouchableOpacity onPress={() => this.pickImage()}>
            <Image
              source={
                this.state.image && this.state.image !== ""
                  ? { uri: this.state.image }
                  : require("../../assets/placeholderimage.png")
              }
              style={{ width: 80, height: 80, borderRadius: 50 }}
            />
            <Text style={styles.name}>{this.state.Name}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View>
            <Text style={{ marginTop: 20 }}>Change Username:</Text>
            <TextInput
              style={styles.changeusername}
              value={this.state.Name}
              onChangeText={(e) => this.setState({ Name: e })}
            ></TextInput>
          </View>

          {/* <View>
            <Text style={{ marginTop: 20 }}>Change Emal:</Text>
            <TextInput
              editable={false}
              style={[styles.change,{backgroundColor:'#E8E8E8'}]}
              value={this.state.email}
              onChangeText={(e) => this.setState({ email: e })}
            ></TextInput>
          </View> */}

          <View>
            <Text style={{ marginTop: 20 }}>Change Phone:</Text>
            <TextInput
              style={styles.change}
              value={this.state.phoneNo}
              onChangeText={(e) => this.setState({ phoneNo: e })}
            ></TextInput>
          </View>

          <View>
            <Text style={{ marginTop: 20 }}>Bio:</Text>
            <TextInput
              style={styles.change}
              value={this.state.bio}
              onChangeText={(e) => this.setState({ bio: e })}
            ></TextInput>
          </View>

          <View style={{ marginTop: 20 }}>
            {!this.state.updating ? (
              <TouchableOpacity
                style={styles.save}
                onPress={(e) => {
                  if (this.state.imgSelected) {
                    this.uploadImageAsync(this.state.image);
                  } else {
                    this.update(this.state.image);
                  }
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  Save
                </Text>
              </TouchableOpacity>
            ) : (
              <ActivityIndicator size="large" color="#0000ff" />
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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
    margin: 20,
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
});

export default App;
