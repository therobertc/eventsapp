import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  View,
  ActivityIndicator,
  Animated
} from "react-native";
import { WebView } from "react-native-webview";
const Feedback = () => {
  const [showModal, setModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {}, [isLoading]);
  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <>
      <TouchableOpacity
        onPress={() => setModal(true)}
        style={styles.buttonContainer}
      >
        <Text>Subscribe</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {}}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => setModal(false)}
              style={styles.close}
            >
              <Text style={{ fontWeight: "bold" }}>╳</Text>
            </TouchableOpacity>
            {isLoading && <ActivityIndicator size={"large"} color={"grey"} />}
            <WebView
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              style={styles.webViewContainer}
              source={{
                uri: `https://stockchatapp.com`
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22
  },
  buttonContainer: {
    display: "flex",
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  modalView: {
    width: "100%",
    height: "93%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "white"
  },
  webViewContainer: {
    height: "90%",
    width: "100%"
  },
  close: {
    alignSelf: "flex-end",
    padding: 6,
    marginRight: 20,
    marginTop: 10
  }
});

export default Feedback;
