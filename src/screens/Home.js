import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage,
    Share
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Icon, Header, Left, Right, Body, Button} from "native-base";
// import UserAdvanceScreener from "./UserAdvanceScreener";
import UserScreener from "../components/Screeners/UserScreener";
import * as Linking from "expo-linking";
import URL from '../../Constant/Constant';
import Analytics from '../../Constant/ExpoMixpanelConstant';
import TrendingStocks from "../components/TrendingStocks";



class Home extends Component {

    constructor(props) {
        super(props);
        Analytics.ANALYTICS.track("Hompage",{"Visited":"Currently on home page"});
        this.state = {
            data: [],
            isLoading: true,
            final_data: [],
            popularstock: [],
            largecap: [],
            under5stock: [],
            topgainers: [],
            overbought: [],
            oversold: [],
            mostvolatile:[],
            isSubscribed: false
        };
    }

    

    componentDidMount() {

        // Linking.addEventListener('url', this.handleOpenURL);
        // AsyncStorage.getItem("user")
        //     .then(user => {
        //         user = JSON.parse(user);
        //         this.setState({ isSubscribed: user.sub_status});
        //     })
        //     .catch(err => {
        //         console.log(err.message);
        //     });
        this._getAllDefaultScreener();
        this.getTrandingData();
    }

    // handleOpenURL = (event) => {
    //     let { path, queryParams } = Linking.parse(event.url);
    //     if(queryParams["stock"] !== undefined && queryParams['stock'] !== null && queryParams['stock'] !== "" ){
    //         this.props.navigation.navigate("search_detail", {symbol:queryParams['stock']})
    //     }
    //     if(queryParams["screener"] != null && queryParams["screener"] !== undefined && queryParams['screener'] !== ""){
    //         this.props.navigation.navigate("AddSharedScreener");
    //     }
    // }

    componentWillUnmount() {
        // Linking.removeEventListener('url', this.handleOpenURL);
        this._getAllDefaultScreener();
        this.getTrandingData();
    }

    _getAllDefaultScreener = () => {
        return fetch(URL.HOST_URL+'api/getAllDefualt', {
            method: "GET"
        })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    popularstock: responseJson.popularstock,
                    largecap: responseJson.largecap,
                    under5stock: responseJson.stockdata,
                    topgainers: responseJson.topgainers,
                    overbought: responseJson.overbought,
                    oversold: responseJson.oversold,
                    mostvolatile:responseJson.mostvolatile,
                    isLoading: false
                });
            })
            .catch(error => {
                this.setState( {isLoading: false})
                console.error(error.message);
            });
    };

    _renderPopular = () => {
        if (this.state.popularstock !== undefined && this.state.popularstock.length > 4 ) {
            const data = this.state.popularstock;
            return (
                <View style={styles.topContainer}>
                    <Text
                        numberOfLines={1}
                        style={{
                            fontSize: 18,
                            fontWeight: "700",
                            paddingLeft: 10,
                            width: "80%"
                        }}
                    >
                        Popular Stocks
                    </Text>
                    <View style={styles.tickerbox}>
                        <View style={styles.stockcard}>
                            <TouchableOpacity style={styles.ticker}>
                                <Text style={styles.tickertext}>{data[0].name}</Text>

                                <View style={styles.datacard}>
                                    <Text style={[styles.stocktext,{color: parseFloat(data[0].change) < 0  ? '#CF2727' : 'green'}]}>{data[0].change}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.seperator} />
                        <View style={styles.stockcard}>
                            <TouchableOpacity style={styles.ticker}>
                                <Text style={styles.tickertext}>{data[1].name}</Text>

                                <View style={styles.datacard}>
                                    <Text style={[styles.stocktext,{color: parseFloat(data[1].change) < 0  ? '#CF2727' : 'green'}]}>{data[1].change}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.seperator} />
                        <View style={styles.stockcard}>
                            <TouchableOpacity style={styles.ticker}>
                                <Text style={styles.tickertext}>{data[2].name}</Text>
                                <View style={styles.datacard}>
                                    <Text style={[styles.stocktext,{color: parseFloat(data[2].change) < 0  ? '#CF2727' : 'green'}]}>{data[2].change}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.seperator} />
                        <View style={styles.stockcard}>
                            <TouchableOpacity style={styles.ticker}>
                                <Text style={styles.tickertext}>{data[3].name}</Text>
                                <View style={styles.datacard}>
                                    <Text style={[styles.stocktext,{color: parseFloat(data[3].change) < 0  ? '#CF2727' : 'green'}]}>{data[3].change}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.seperator} />
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("PopularStocks")}
                        >
                            <Text style={styles.viewmore}>View More</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    };

    _renderlargecap = () => {
        if ( this.state.largecap !== undefined && this.state.largecap.length > 4 ) {
            const data = this.state.largecap;
            return (
                <View style={styles.screenContainer}>
                    <Text
                        numberOfLines={1}
                        style={{
                            fontSize: 18,
                            fontWeight: "700",
                            paddingLeft: 10,
                            width: "80%"
                        }}
                    >
                        Large Cap Stocks
                    </Text>
                    <View style={styles.tickerbox}>
                        <View style={styles.stockcard}>
                            <TouchableOpacity style={styles.ticker}>
                                <Text style={styles.tickertext}>{data[0].name}</Text>

                                <View style={styles.datacard}>
                                    <Text style={[styles.stocktext,{color: parseFloat(data[0].change) < 0  ? '#CF2727' : 'green'}]}>{data[0].change}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.seperator} />
                        <View style={styles.stockcard}>
                            <TouchableOpacity style={styles.ticker}>
                                <Text style={styles.tickertext}>{data[1].name}</Text>

                                <View style={styles.datacard}>
                                    <Text style={[styles.stocktext,{color: parseFloat(data[1].change) < 0  ? '#CF2727' : 'green'}]}>{data[1].change}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.seperator} />
                        <View style={styles.stockcard}>
                            <TouchableOpacity style={styles.ticker}>
                                <Text style={styles.tickertext}>{data[2].name}</Text>

                                <View style={styles.datacard}>
                                    <Text style={[styles.stocktext,{color: parseFloat(data[2].change) < 0  ? '#CF2727' : 'green'}]}>{data[2].change}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.seperator} />
                        <View style={styles.stockcard}>
                            <TouchableOpacity style={styles.ticker}>
                                <Text style={styles.tickertext}>{data[3].name}</Text>

                                <View style={styles.datacard}>
                                    <Text style={[styles.stocktext,{color: parseFloat(data[3].change) < 0  ? '#CF2727' : 'green'}]}>{data[3].change}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.seperator} />
                        <View style={{ display: 'flex', flexDIrection: 'row', }}>
                            <View>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate("LargeCap")}
                                >
                                    <Text style={styles.viewmore}>View More</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            );
        }
    };

    _renderUnder5stock = () => {
        if (this.state.under5stock !== undefined && this.state.under5stock.length > 4)
        {
            const data = this.state.under5stock;
            return (
                <View style={styles.screenContainer}>
                    <Text
                        numberOfLines={1}
                        style={{
                            fontSize: 18,
                            fontWeight: "700",
                            paddingLeft: 10,
                            width: "80%"
                        }}
                    >
                        Under $5 Stocks
                    </Text>
                    <View style={styles.tickerbox}>
                        <View style={styles.stockcard}>
                            <TouchableOpacity style={styles.ticker}>
                                <Text style={styles.tickertext}>{data[0].name}</Text>

                                <View style={styles.datacard}>
                                    <Text style={[styles.stocktext,{color: parseFloat(data[0].change) < 0  ? '#CF2727' : 'green'}]}>{data[0].change}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.seperator} />
                        <View style={styles.stockcard}>
                            <TouchableOpacity style={styles.ticker}>
                                <Text style={styles.tickertext}>{data[1].name}</Text>

                                <View style={styles.datacard}>
                                    <Text style={[styles.stocktext,{color: parseFloat(data[1].change) < 0  ? '#CF2727' : 'green'}]}>{data[1].change}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.seperator} />
                        <View style={styles.stockcard}>
                            <TouchableOpacity style={styles.ticker}>
                                <Text style={styles.tickertext}>{data[2].name}</Text>

                                <View style={styles.datacard}>
                                    <Text style={[styles.stocktext,{color: parseFloat(data[2].change) < 0  ? '#CF2727' : 'green'}]}>{data[2].change}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.seperator} />
                        <View style={styles.stockcard}>
                            <TouchableOpacity style={styles.ticker}>
                                <Text style={styles.tickertext}>{data[3].name}</Text>
                                <View style={styles.datacard}>
                                    <Text style={[styles.stocktext,{color: parseFloat(data[3].change) < 0  ? '#CF2727' : 'green'}]}>{data[3].change}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.seperator} />
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("Under5")}
                        >
                            <Text style={styles.viewmore}>View More</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    };

    _renderUnder5winners = () => {
        if (this.state.topgainers !== undefined && this.state.topgainers.length > 4) {
            const data = this.state.topgainers;
            return (
                <View style={styles.screenContainer}>
                    <Text
                        numberOfLines={1}
                        style={{
                            fontSize: 18,
                            fontWeight: "700",
                            paddingLeft: 10,
                            width: "80%"
                        }}
                    >
                        Under $5 Winners
                    </Text>
                    <View style={styles.tickerbox}>
                        <View style={styles.stockcard}>
                            <TouchableOpacity style={styles.ticker}>
                                <Text style={styles.tickertext}>{data[0].name}</Text>

                                <View style={styles.datacard}>
                                    <Text style={[styles.stocktext,{color: parseFloat(data[0].change) < 0  ? '#CF2727' : 'green'}]}>{data[0].change}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.seperator} />
                        <View style={styles.stockcard}>
                            <TouchableOpacity style={styles.ticker}>
                                <Text style={styles.tickertext}>{data[1].name}</Text>

                                <View style={styles.datacard}>
                                    <Text style={[styles.stocktext,{color: parseFloat(data[1].change) < 0  ? '#CF2727' : 'green'}]}>{data[1].change}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.seperator} />
                        <View style={styles.stockcard}>
                            <TouchableOpacity style={styles.ticker}>
                                <Text style={styles.tickertext}>{data[2].name}</Text>

                                <View style={styles.datacard}>
                                    <Text style={[styles.stocktext,{color: parseFloat(data[2].change) < 0  ? '#CF2727' : 'green'}]}>{data[2].change}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.seperator} />
                        <View style={styles.stockcard}>
                            <TouchableOpacity style={styles.ticker}>
                                <Text style={styles.tickertext}>{data[3].name}</Text>
                                <View style={styles.datacard}>
                                    <Text style={[styles.stocktext,{color: parseFloat(data[3].change) < 0  ? '#CF2727' : 'green'}]}>{data[3].change}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.seperator} />
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("Top Gainers")}
                        >
                            <Text style={styles.viewmore}>View More</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    };

    _renderMostvolatile = () => {
        if (this.state.mostvolatile !== undefined && this.state.mostvolatile.length > 4)
        {
            const data = this.state.mostvolatile;
            return (
                <View style={styles.screenContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10}}>
                        <Text
                            numberOfLines={1}
                            style={{
                                fontSize: 18,
                                fontWeight: "700",

                                width: "80%"
                            }}
                        >
                            Most Active
                        </Text>
                    </View>
                    <View style={styles.tickerbox}>
                        <View style={styles.stockcard}>
                            <TouchableOpacity style={styles.ticker}>
                                <Text style={styles.tickertext}>{data[0].name}</Text>

                                <View style={styles.datacard}>
                                    <Text style={[styles.stocktext,{color: parseFloat(data[0].change) < 0  ? '#CF2727' : 'green'}]}>{data[0].change}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.seperator} />

                        <View style={styles.stockcard}>
                            <TouchableOpacity style={styles.ticker}>
                                <Text style={styles.tickertext}>{data[1].name}</Text>

                                <View style={styles.datacard}>
                                    <Text style={[styles.stocktext,{color: parseFloat(data[1].change) < 0  ? '#CF2727' : 'green'}]}>{data[1].change}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.seperator} />

                        <View style={styles.stockcard}>
                            <TouchableOpacity style={styles.ticker}>
                                <Text style={styles.tickertext}>{data[2].name}</Text>

                                <View style={styles.datacard}>
                                    <Text style={[styles.stocktext,{color: parseFloat(data[2].change) < 0  ? '#CF2727' : 'green'}]}>{data[2].change}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.seperator} />
                        <View style={styles.stockcard}>
                            <TouchableOpacity style={styles.ticker}>
                                <Text style={styles.tickertext}>{data[3].name}</Text>

                                <View style={styles.datacard}>
                                    <Text style={[styles.stocktext,{color: parseFloat(data[3].change) < 0  ? '#CF2727' : 'green'}]}>{data[3].change}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.seperator} />
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("MostVolatile")}
                        >
                            <Text style={styles.viewmore}>View More</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    };

    _renderoverbought = () => {
        if (  this.state.overbought !== undefined &&
            this.state.overbought.length > 4 ) {
            const data = this.state.overbought;
            return (
                <View style={styles.screenContainer}>
                    <Text
                        numberOfLines={1}
                        style={{
                            fontSize: 18,
                            fontWeight: "700",
                            paddingLeft: 10,
                            width: "80%"
                        }}
                    >
                        Overbought Stocks
                    </Text>

                    <View style={styles.tickerbox}>
                        <View style={styles.stockcard}>
                            <TouchableOpacity style={styles.ticker}>
                                <Text style={styles.tickertext}>{data[0].name}</Text>

                                <View style={styles.datacard}>
                                    <Text style={[styles.stocktext,{color: parseFloat(data[0].change) < 0  ? '#CF2727' : 'green'}]}>{data[0].change}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.seperator} />

                        <View style={styles.stockcard}>
                            <TouchableOpacity style={styles.ticker}>
                                <Text style={styles.tickertext}>{data[1].name}</Text>

                                <View style={styles.datacard}>
                                    <Text style={[styles.stocktext,{color: parseFloat(data[1].change) < 0  ? '#CF2727' : 'green'}]}>{data[1].change}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.seperator} />
                        <View style={styles.stockcard}>
                            <TouchableOpacity style={styles.ticker}>
                                <Text style={styles.tickertext}>{data[2].name}</Text>
                                <View style={styles.datacard}>
                                    <Text style={[styles.stocktext,{color: parseFloat(data[2].change) < 0  ? '#CF2727' : 'green'}]}>{data[2].change}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.seperator} />

                        <View style={styles.stockcard}>
                            <TouchableOpacity style={styles.ticker}>
                                <Text style={styles.tickertext}>{data[3].name}</Text>

                                <View style={styles.datacard}>
                                    <Text style={[styles.stocktext,{color: parseFloat(data[3].change) < 0  ? '#CF2727' : 'green'}]}>{data[3].change}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.seperator} />

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("Overbought")}
                        >
                            <Text style={styles.viewmore}>View More</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    };

    _renderoversold = () => {
        if (this.state.oversold !== null && this.state.oversold.length > 4 ) {
            const data = this.state.oversold;
            return (
                <View style={styles.screenContainer}>
                    <Text
                        numberOfLines={1}
                        style={{
                            fontSize: 18,
                            fontWeight: "700",
                            paddingLeft: 10,
                            width: "80%"
                        }}
                    >
                        Oversold Stocks
                    </Text>

                    <View style={styles.tickerbox}>
                        <View style={styles.stockcard}>
                            <TouchableOpacity style={styles.ticker}>
                                <Text style={styles.tickertext}>{data[0].name}</Text>

                                <View style={styles.datacard}>
                                    <Text style={[styles.stocktext,{color: parseFloat(data[0].change) < 0  ? '#CF2727' : 'green'}]}>{data[0].change}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.seperator} />
                        <View style={styles.stockcard}>
                            <TouchableOpacity style={styles.ticker}>
                                <Text style={styles.tickertext}>{data[1].name}</Text>
                                <View style={styles.datacard}>
                                    <Text style={[styles.stocktext,{color: parseFloat(data[1].change) < 0  ? '#CF2727' : 'green'}]}>{data[1].change}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.seperator} />

                        <View style={styles.stockcard}>
                            <TouchableOpacity style={styles.ticker}>
                                <Text style={styles.tickertext}>{data[2].name}</Text>

                                <View style={styles.datacard}>
                                    <Text style={[styles.stocktext,{color: parseFloat(data[2].change) < 0  ? '#CF2727' : 'green'}]}>{data[2].change}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.seperator} />
                        <View style={styles.stockcard}>
                            <TouchableOpacity style={styles.ticker}>
                                <Text style={styles.tickertext}>{data[3].name}</Text>
                                <View style={styles.datacard}>
                                    <Text style={[styles.stocktext,{color: parseFloat(data[3].change) < 0  ? '#CF2727' : 'green'}]}>{data[3].change}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.seperator} />
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("Oversold")}
                        >
                            <Text style={styles.viewmore}>View More</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    };

    onShare = async () => {
        try {
          const result = await Share.share({
            message:
              "Download Stock Chat and join my trading group! https://stockchatapp.com"
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };


    handleRefresh = () => {
        this.loadPage();
      };

    async getTrandingData() {
        return fetch(
            "https://sharestock.io/api/trendingStock",
            {
                method: "GET"
            }
        )
            .then(response => response.json())
            .then(responseJson => {
                this.setState(
                    {
                        data: responseJson.data,
                        isLoading:false
                    },
                    function() {}
                );
            })
            .catch(error => {
                this.setState({ isLoading:false});
                console.error(error);
            });
    }

    shuffleData() {
        this.setState({
            data: this.state.data.sort(() => Math.random() - 0.5)
        });
    }

    circleComponet() {
        if (this.state.data.length) {
            return this.state.data.map((service, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() =>
                        this.props.navigation.navigate("search_detail", {
                            symbol: service.symbol
                        })
                    }
                    style={{ marginLeft: 5, borderRadius: 35 }}
                >
                    <View
                        style={{
                            backgroundColor: "#fff",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 20,
                            shadowOffset: { width: 0.05, height: 0.05 },
                            shadowColor: "lightgrey",
                            shadowOpacity: 0.05,
                        }}
                    >
                        <View
                            style={{
                                borderRadius: 20,
                                height: 70,
                                width: 100,
                                borderWidth: 2.5,
                                borderColor: "#E1E8ED",
                                justifyContent: "space-between",
                                alignItems: "center",
                                paddingVertical: 12,
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: "600",
                                    fontSize: 18,
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
                                    color: parseFloat(service.changePercent) < 0  ? '#CF2727' : 'green'
                                }}
                            >
                                {parseFloat(service.changePercent) < 0 ? (parseFloat(service.changePercent)*100) .toFixed(2) : "+" + (parseFloat(service.changePercent)*100).toFixed(2)}%
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ));
        }
    }


    render() {

        if (this.state.isLoading) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "white"
                    }}
                >
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                {/* <Header style={{ backgroundColor: "#F5F8FA", borderBottomWidth: 0.2, borderBottomColor: "#E1E8ED"}}>
                    <Left>
                        <Feather
                            style={{
                                color: "black",
                                paddingHorizontal: Platform.OS === 'ios'? 20 : 15,
                                fontSize: 30,
                                fontWeight: "bold"
                            }}
                            name="menu"
                            onPress={() => this.props.navigation.navigate("Profile")}
                        />
                    </Left>

                    <Body>
                        
                            <Image
                                style={{
                                    flex: 1,
                                    aspectRatio:  Platform.OS === 'ios'? 3.0:4.0,
                                    resizeMode: "contain"
                                }}
                                source={require("../../assets/stockchattext.png")}
                            />
                      
                    </Body>

                    <Right>
                        <Feather
                            style={{
                                color: "black",
                                fontWeight: "bold",
                                paddingHorizontal: Platform.OS === 'ios'? 10 : 10,
                                fontSize: 30
                            }}
                            name="search"
                            onPress={() => this.props.navigation.navigate("Search_page")}
                        />
                    </Right>
                </Header> */}

                <ScrollView showsVerticalScrollIndicator={false}
                            // refreshControl={
                            //     <RefreshControl
                            //         //tintColor={$.config.colors.style}
                            //         onRefresh={() => this._refreshList()}
                            //         refreshing={this.state.listRefreshing}
                            //         onRefresh={this.handleRefresh}
                            //     />
                            // }

                >
                   
                 
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Trending Stocks</Text>
          <View>
            <TouchableOpacity
              style={styles.invite}
            //   onPress={onShare}
              title="Share"
              //onPress={() => props.navigation.navigate("InviteFriends")}
            >
              <Feather name="user-plus" size={20} color="white" />
              <Text style={{ color: "white", fontWeight: "500" }}>
                {" "}
                Invite{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TrendingStocks />
                   
                  

                    <View
                        style={{
                            //flex: 1,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingHorizontal: 20,
                            paddingBottom: 10,
                        }}
                    >
                        <Text style={styles.header}>
                            Stock Screeners
                        </Text>

                        <Feather style={{ fontSize: 20, color: "#282c34" }}
                            name="plus-circle"
                            onPress={() => this.props.navigation.navigate("CreateScreener")}
                        />

                    </View>
                    {/* <UserAdvanceScreener  onDataLoaded = {()=>{}}/> */}
                    <UserScreener  onDataLoaded = {()=>{}}/>
                    {this._renderPopular()}
                    {this._renderMostvolatile()}
                    {this._renderlargecap()}
                    {this._renderUnder5stock()}
                    {this._renderUnder5winners()}
                    {this._renderoverbought()}
                    {this._renderoversold()}
                    <View style={{ height: 100 }}></View>
                </ScrollView>
                {/* {!this.state.isSubscribed ? (
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("Subscribe")}
                    >
                        <View
                            style={{
                                height: 50,
                                backgroundColor: "#282c34",
                                justifyContent: "center",

                            }}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: 16,
                                    //paddingLeft: 20
                                    textAlign: 'center'
                                }}
                            >
                                Unlock Your ChartBot Pro Features 👉
                            </Text>
                        </View>
                    </TouchableOpacity>
                ) : (
                    <View></View>
                )} */}
            </View>
        );
    }
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: "#FFF"
        backgroundColor: "#F5F8FA",
        paddingTop: 30
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
    offercard: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        //height: 100,
        marginTop: 10,
        marginHorizontal: 10,
        flexDirection: "column",
        display: "flex",
        paddingVertical: 30
        //justifyContent: "center",
        //alignItems: "center"
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
    stockcard: {
        height: 30,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: "#fff"
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
        justifyContent: "center",
        // color: 'green'
    },

    stocktextred: {
        fontSize: 18,
        fontWeight: "500",
        justifyContent: "center",
        //color: '#CF2727'
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
        color: "#282C34",
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
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 30,
        paddingHorizontal: 20
      },
      header: {
        fontFamily: "Montserrat_700Bold",
        color: "#000",
        flex: 1,
        fontSize: 20
      },
      header2: {
        fontFamily: "Montserrat_800ExtraBold",
        color: "#000",
        flex: 1,
        fontSize: 20
        //paddingVertical: 10
      },
    textview: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 20,
        //height: 100
    },
    invite: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#147efb",
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 5
      },
});
