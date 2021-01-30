import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage
} from "react-native";

import * as Linking from "expo-linking";

class TrendingStocks extends Component {
  constructor(props) {
    super(props);
    // Analytics.ANALYTICS.track("Hompage", { Visited: "Currently on home page" });
    this.state = {
      data: [],
      isLoading: true,
      final_data: [],
      isSubscribed: false
    };
  }

  componentDidMount() {
    this.getTrandingData();
  }

  componentWillUnmount() {
    this.getTrandingData();
  }

  handleRefresh = () => {
    this.loadPage();
  };

  async getTrandingData() {
    return fetch("https://sharestock.io/api/trendingStock", {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.log("responseJson", responseJson);
        this.setState(
          {
            data: responseJson.data,
            isLoading: false
          },
          function() {}
        );
      })
      .catch(error => {
        this.setState({ isLoading: false });
        console.error(error);
      });
  }

  shuffleData() {
    this.setState({
      data: this.state.data.sort(() => Math.random() - 0.5)
    });
  }

  TrendingComponent = (props, onPress) => {
    if (this.state.data.length) {
      return this.state.data.map((service, index) => (
        <TouchableOpacity
          key={index}
          onPress={onPress}
          // onPress={() =>
          //   props.navigation.navigate("StockChat", {
          //     // symbol: service.symbol
          //   })
          // }
          style={{ marginLeft: 5, borderRadius: 35 }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 30,
              //   shadowOffset: { width: 0.05, height: 0.05 },
              //   shadowColor: "lightgrey",
              //   shadowOpacity: 0.05,
              borderWidth: 2.5,
              borderColor: "#E1E8ED"
            }}
          >
            <View
              style={{
                height: 100,
                width: 100,

                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 20
              }}
            >
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 18
                  //textAlign: "left"
                }}
              >
                {service.symbol}
              </Text>

              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 14,
                  textAlign: "center",
                  color: parseFloat(service.changePercent) < 0 ? "red" : "green"
                }}
              >
                {parseFloat(service.changePercent) < 0
                  ? (parseFloat(service.changePercent) * 100).toFixed(2)
                  : "+" + (parseFloat(service.changePercent) * 100).toFixed(2)}
                %
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ));
    }
  };

  callBack = () => {
    // console.log("hello");
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: "center",
                // paddingStart: 5,
                // paddingEnd: 5,
                paddingTop: 10
              }}
            >
              {this.TrendingComponent()}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default TrendingStocks;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    marginHorizontal: 8,
    marginVertical: 10
  },
  deleteScreener: {
    color: "#F32013",
    fontWeight: "800",
    textAlign: "center",
    paddingTop: 20
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36
  },
  searchbar: {
    marginTop: 0
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    margin: 0,
    marginTop: 0
  },
  formContent: {
    flexDirection: "row",
    //marginTop:30,
    backgroundColor: "#147efb"
  },
  icon: {
    width: 30,
    height: 30
  },
  iconBtnSearch: {
    alignSelf: "center"
  },
  inputs: {
    height: 50,
    marginLeft: 10,
    borderBottomColor: "#FFFFFF",
    //flex: 1,
    width: 300,
    backgroundColor: "white",
    marginBottom: 50
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: "center"
  },
  saveButton: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    //margin:10,
    width: 50,
    alignSelf: "flex-end",
    backgroundColor: "#147efb",
    borderRadius: 100,
    marginBottom: 10
  },
  saveButtonText: {
    color: "white"
  },
  notificationList: {
    marginTop: 20,
    padding: 10
  },
  notificationBox: {
    padding: 20,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    borderRadius: 10
  },
  image: {
    width: 45,
    height: 45
  },
  description: {
    fontSize: 18,
    color: "#3498db",
    marginLeft: 10
  },
  datacard: {
    //backgroundColor: "#147efb",
    //height: 40,
    width: 100,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  stocktext: {
    fontSize: 18,
    fontWeight: "500",
    justifyContent: "center"
    // color: 'green'
  },

  stocktextred: {
    fontSize: 18,
    fontWeight: "500",
    justifyContent: "center"
    //color: 'red'
  },

  offerCard: {
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "lightgrey",
    shadowOpacity: 1.0,
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: "#e8eef1",
    margin: 10,
    borderRadius: 20,
    width: 340
  },
  screenContainer: {
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowColor: "lightgrey",
    shadowOpacity: 2.0,
    margin: 10,
    //backgroundColor: "#e8eef1",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    paddingTop: 20
  },
  topContainer: {
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowColor: "lightgrey",
    shadowOpacity: 2.0,
    marginHorizontal: 10,
    marginBottom: 10,
    //backgroundColor: "#e8eef1",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    paddingTop: 20
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    //textAlign: "center"
    marginHorizontal: 20
  },
  subheading: {
    fontSize: 14,
    fontWeight: "400",
    //textAlign: "center",
    marginTop: 10,
    marginHorizontal: 20
  },
  ticker: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  tickertext: {
    //paddingLeft: 20,
    //paddingTop: 10,
    fontSize: 18,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center"
  },
  viewmore: {
    color: "#147efb",
    fontWeight: "500",
    textAlign: "center",
    paddingTop: 10
  },
  tickerbox: {
    padding: 10
  },
  seperator: {
    marginVertical: 10,
    borderColor: "#E1E8ED",
    borderWidth: 0.5
  },
  textview: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20
    //height: 100
  }
});
