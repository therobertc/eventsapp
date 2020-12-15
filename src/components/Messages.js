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

const Messages = ({ item }) => {
  return (
    <View style={styles.container}>
      {/* {count > 0 ? (
        <LinearGradient
          colors={["#7F8C8D", "#FFFFFF", "#000"]}
          style={styles.gradientStyle}
        >
          <Text style={styles.count}>{count}</Text>
        </LinearGradient>
      ) : null} */}

      {/* <Image source={ Images.groups } style={styles.image} /> */}
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.username}>#{item}</Text>
        {/* <Text style={styles.text}>{item.groupMembers}</Text> */}
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
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 15,
    //marginBottom: 20,
    justifyContent: "space-between"
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
    flex: 1,

    //position: "absolute",
    fontFamily: "Montserrat_600SemiBold"
  },
  username: {
    color: "#000119",
    fontFamily: "Montserrat_700Bold"
  }
});
