import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SnapshotViewIOS
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const randomTime = () => {
  const hrs = Math.round(Math.random() * 12);
  const mins = Math.round(Math.random() * 60);
  const hFormat = hrs < 10 ? "0" : "";
  const mFormat = mins < 10 ? "0" : "";
  const amPm = hrs < 12 ? "AM" : "PM";
  return String(hFormat + hrs + ":" + mFormat + mins + " " + amPm);
};

const Messages = ({ item, uri }) => {
  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image
          source={{ uri: uri }}
          style={{
            //flex: 1,
            height: 40,
            width: 40,
            borderRadius: 20,
            //borderWidth: 2,
            marginBottom: 0,
            marginRight: 5,
            borderColor: "#147efb"
            //alignSelf: "center",
            //marginTop: 15
          }}
          source={{
            uri: "https://i.stack.imgur.com/l60Hf.png"
          }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.username}>#{item}</Text>
          <Text style={styles.preview}>This group is trending</Text>
          {/* <Text style={styles.text}>{item.groupMembers}</Text> */}
        </View>
      </View>

      <View>
        <Text style={styles.duration}>{randomTime()}</Text>
      </View>
    </View>
  );
};
export default Messages;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  },
  gradientStyle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20
  },
  count: {
    color: "#fff",
    fontFamily: "Montserrat_700Bold"
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  text: {
    color: "black",
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 11
  },
  duration: {
    color: "#000119",
    fontSize: 12,
    //flex: 1,

    //position: "absolute",
    fontFamily: "Montserrat_600SemiBold"
  },
  username: {
    color: "#000119",
    fontFamily: "Montserrat_700Bold",
    fontSize: 15,
    paddingLeft: 10
  },
  preview: {
    color: "#000119",
    //fontFamily: "Montserrat_300SemiBold",
    fontSize: 15,
    paddingLeft: 10
  },
  card: {
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowRadius: 2,
    shadowColor: "lightgrey",
    marginHorizontal: 10,
    shadowOpacity: 1.0,
    marginVertical: 5,
    elevation: 1,
    //backgroundColor: "#e8eef1",
    //backgroundColor: "#F5F8FA"
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    //paddingHorizontal: 40,
    alignItems: "center",
    //marginTop: 15,
    //marginBottom: 20,
    justifyContent: "space-between",
    height: 80
  }
});
