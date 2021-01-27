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

const Messages = ({ item, totalmembers, lastmessage, uri }) => {
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
            //marginRight: 5,
            borderColor: "#147efb"
            //alignSelf: "center",
            //marginTop: 15
          }}
          source={{
            uri: "https://i.stack.imgur.com/l60Hf.png"
          }}
        />
        <View style={{ marginLeft: 5 }}>
          <Text style={styles.username}>#{item}</Text>
          {/* <Text style={styles.preview}>{totalmembers} members </Text> */}
          <Text style={styles.preview}>
            {lastmessage > 10 ? `${lastmessage.slice(0, 40)}...` : lastmessage}
          </Text>
          {/* <Text style={styles.text}>{item.groupMembers}</Text> */}
        </View>
      </View>

      {/* <View>
        <Text style={styles.duration}>{randomTime()}</Text>
      </View> */}
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
    color: "#F5F8FA",
    fontFamily: "Montserrat_700Bold"
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  text: {
    color: "#FFF",
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 11
  },
  duration: {
    color: "#FFF",
    fontSize: 12,
    //flex: 1,

    //position: "absolute",
    fontFamily: "Montserrat_600SemiBold"
  },
  username: {
    color: "#FFF",
    fontFamily: "Montserrat_700Bold",
    fontSize: 15,
    paddingLeft: 10
  },
  preview: {
    //color: "#657786",
    color: "#7c818c",
    //fontFamily: "Montserrat_300SemiBold",
    fontSize: 15,
    paddingLeft: 10,
    marginRight: 10
  },
  card: {
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowRadius: 2,
    borderBottomColor: "#7c818c",
    borderBottomWidth: 1,
    //shadowColor: "#B9BABD",
    //marginHorizontal: 10,
    shadowOpacity: 0.2,
    //marginVertical: 5,
    elevation: 1,
    //backgroundColor: "#e8eef1",
    //backgroundColor: "#35383F"
    //backgroundColor: "#4b5162",
    //backgroundColor: "#35383F",
    //borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: "row",
    //paddingHorizontal: 40,
    alignItems: "center",
    //marginTop: 15,
    //marginBottom: 20,
    justifyContent: "space-between",
    height: 80
  }
});
