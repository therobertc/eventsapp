import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";
import axios from "axios";
import URL from "../../Constant/Constant";
import moment from "moment";


class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post_data: null,
            isLoading: true,
            user_email: null
        };
    }

    async componentDidMount() {
        this._getManualNotification();
    }

    _getManualNotification = () => {
        let url = URL.HOST_URL + "api/getAllNotification/?type=1";
        axios.get(url).then(response => {
            this.setState({ post_data: response.data.data, isLoading: false });
        });
    };

    navigate_to_details = (data) =>{
        if(data !== null && data !== undefined) {
            let list = data.title.split(" ");
            let symbol = list[0].trim();
            if(symbol === symbol.toUpperCase())
            this.props.navigation.push("StockDetails", {
                symbol: list[0]
            })

        }
    }

    _render_post_data = () => {

        if (this.state.post_data != null) {

            let list = this.state.post_data;
            return list.map((data, index) => {
                return (
                    <View key={index}>
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => this.navigate_to_details(data)}
                        >
                            <View
                                style={{
                                    flexDirection: "column",
                                    justifyContent: "space-between"
                                }}
                            >
                                <Text
                                    style={{ color: "black", fontWeight: "bold", fontSize: 16 }}
                                >
                                    {data.title}
                                </Text>
                                <Text style={{ color: "black", paddingTop: 5, fontSize: 16 }}>
                                    {data.message}
                                </Text>
                                <Text style={{ color: "green", paddingTop: 5, fontSize: 16 }}>
                                    {moment(
                                        new Date(data.dateTime)
                                    ).fromNow()}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                );
            });
        }
    };

    render() {
        if (this.state.isLoading) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#35383F"
                    }}
                >
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                {this._render_post_data()}
            </View>
        );
    }
}

export default Notifications;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#35383F"
    },
    text: {
        marginHorizontal: 8,
        marginVertical: 10
    },
    bottom: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 36
    },
    searchbar: {
        marginTop: 50
    },
    loadCon: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#147efb"
    },
    loadTitle: {
        color: "#fff",
        fontSize: 16,
        margin: 8,
        fontWeight: "700"
    },
    profileImage: {
        flex: 1,
        height: 120,
        width: 120,
        borderRadius: 60,
        borderWidth: 2,
        marginBottom: 0,
        marginRight: 5,
        borderColor: "#147efb",
        alignSelf: "flex-start",
        marginTop: 15
    },
    card: {
        //backgroundColor: "#F5F8FA",
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowColor: "lightgrey",
        shadowOpacity: 2.0,
        backgroundColor: "#FFF",
        borderRadius: 10,
        padding: 10,
        // height: 500,
        marginTop: 10,
        marginHorizontal: 10,
        justifyContent: "center"
    }
});
