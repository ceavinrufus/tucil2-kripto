import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextEncoder,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

const ReaderFile = ({ setFile, setFileName, setMimeType }) => {
  const pickFile = async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        multiple: false,
      });
      if (!response.canceled) {
        // Handle the retrieved file
        await handleFile(response);
      }
    } catch (error) {
      console.error("Error picking file:", error);
    }
  };

  const handleFile = async (result) => {
    try {
      const { uri, name, mimeType } = result.assets[0];

      try {
        const fileData = await fetch(uri); // Fetch the file data
        const buffer = await fileData.arrayBuffer();
        const uint8Array = new Uint8Array(buffer);
        setFileName(name);
        setFile(uint8Array);
        setMimeType(mimeType);
      } catch (error) {
        console.error("Error reading file:", error);
      }
    } catch (error) {
      console.error("Error handling file:", error);
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={pickFile}>
        <Text style={styles.buttonText}>Upload File</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#5F8DFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ReaderFile;
