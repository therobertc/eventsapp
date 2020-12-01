import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Animated,
  Image
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "@expo/vector-icons/Entypo";
import Icon from "@expo/vector-icons/MaterialIcons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Profiles from "../components/Profiles";
import Messages from "../components/Messages";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import AddGroup from "./Sub/AddGroup";
import TrendingStocks from "../components/TrendingStocks";
import StockGroupCard from "../components/StockGroupCard";

const Chat = props => {
  const URL = `https://api.github.com/users`;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const pan = useRef(new Animated.ValueXY()).current;
  const list = useRef(new Animated.ValueXY()).current;

  useEffect(function() {
    const getData = async () => {
      const resp = await fetch(URL);
      const data = await resp.json();
      setData(data);
      setLoading(false);
    };
    getData();

    Animated.timing(pan, {
      toValue: { x: -400, y: 0 },
      delay: 1000,
      useNativeDriver: false
    }).start();

    Animated.timing(list, {
      toValue: { x: 0, y: -300 },
      delay: 2000,
      useNativeDriver: false
    }).start();
  }, []);

  console.log(data.login);

  return (
    <LinearGradient colors={["#657786", "#FFF"]} style={styles.gradient}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Trending Stocks</Text>
        <View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("AddGroup")}
          >
            <FontAwesome name="search" size={24} color="white" />
            {/* <Entypo name="look" color="#000119" size={30} /> */}
          </TouchableOpacity>
        </View>
      </View>

      <TrendingStocks
        onPress={() => {
          this.props.navigation.navigate("StockChat");
        }}
      ></TrendingStocks>

      {/* <ScrollView
        horizontal
        style={styles.proContainer}
        showsHorizontalScrollIndicator={false}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Animated.View style={[pan.getLayout(), styles.card]}>
            {data.map((item, index) => (
              <Profiles
                key={item.id}
                username={item.login}
                uri={item.avatar_url}
              />
            ))}
          </Animated.View>
        )}
      </ScrollView> */}

      <View style={styles.ops}>
        <View style={styles.col}>
          <Text style={styles.day}>Stock Chats</Text>
          <AntDesign
            onPress={() => props.navigation.navigate("AddGroup")}
            name="pluscircleo"
            size={30}
            color="black"
          />
          {/* <Entypo name="dots-three-horizontal" color="#000119" size={30} /> */}
        </View>
        <ScrollView>
          <View style={styles.col2}>
            <StockGroupCard
              ticker="$TSLA"
              pctchange="+1.02%"
              onPress={() => {
                props.navigation.navigate("StockChat", {
                  //itemId: "TSLA",
                  itemName: "$TSLA",
                  itemPic: "https://i.stack.imgur.com/l60Hf.png"
                });
              }}
            ></StockGroupCard>
            <StockGroupCard
              ticker="$SQ"
              pctchange="+4.55%"
              onPress={() => {
                props.navigation.navigate("StockChat", {
                  // itemId: item.id,
                  // itemName: item.login,
                  itemPic: "https://i.stack.imgur.com/l60Hf.png",
                  itemName: "$SQ"
                });
              }}
            ></StockGroupCard>
            <StockGroupCard
              ticker="$NET"
              pctchange="+3.521%"
              onPress={() => {
                props.navigation.navigate("StockChat", {
                  itemName: "$NET",
                  // itemId: item.id,
                  // itemName: item.login,
                  itemPic: "https://i.stack.imgur.com/l60Hf.png"
                });
              }}
            ></StockGroupCard>
          </View>

          <View style={styles.col}>
            <Text style={styles.day}>Trading Groups</Text>
            <AntDesign
              onPress={() => props.navigation.navigate("AddGroup")}
              name="pluscircleo"
              size={30}
              color="black"
            />
            {/* <Entypo name="dots-three-horizontal" color="#000119" size={30} /> */}
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#f20042" />
          ) : (
            <Animated.View style={[list.getLayout(), styles.list]}>
              {data.map((item, index) => (
                <Messages
                  key={item.id}
                  username={item.login}
                  uri={item.avatar_url}
                  count={Math.floor(Math.random() * 3)}
                  onPress={() => {
                    props.navigation.navigate("Discussion", {
                      itemId: item.id,
                      itemName: item.login,
                      itemPic: item.avatar_url
                    });
                  }}
                />
              ))}
            </Animated.View>
          )}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};
export default Chat;

const styles = StyleSheet.create({
  list: {
    marginTop: 300
  },
  card: {
    marginLeft: 400,
    width: 400,
    flexDirection: "row"
  },
  gradient: {
    height: "100%",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    // paddingHorizontal: 20,
    paddingTop: 30
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 20
  },
  header: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
    flex: 1,
    fontSize: 24
  },
  proContainer: {
    marginRight: -20,
    alignSelf: "center"
  },
  ops: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 600,
    backgroundColor: "#FFF",
    marginHorizontal: 0,
    paddingHorizontal: 20
  },
  col: {
    flexDirection: "row",
    marginTop: 25,
    marginHorizontal: 20,
    alignItems: "center"
  },
  col2: {
    flexDirection: "column",
    marginTop: 25
    //marginHorizontal: 20,
    //alignItems: "center"
  },
  day: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#000119",
    flex: 1,
    fontSize: 20
  }
});
