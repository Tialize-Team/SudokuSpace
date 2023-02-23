import React from "react";
import { StyleSheet, Text, View, Modal, Pressable } from "react-native";

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        color: "black",
        marginBottom: 15,
        textAlign: "center"
    }
});

type ModalWindowProps = {
    visible: boolean;
    title: string;
    body: string;
    onRequestClose: any;
};

const ModalWindow = ({visible, title, body, onRequestClose}: ModalWindowProps) => {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onRequestClose();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{title}</Text>
          <Text style={styles.modalText}>{body}</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {onRequestClose();}}
          >
            <Text style={styles.textStyle}>閉じる</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ModalWindow;