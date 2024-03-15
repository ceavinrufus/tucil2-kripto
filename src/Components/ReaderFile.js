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
import { Buffer } from "buffer";

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
        const fileData = await readContent(uri);
        setFileName(name);
        setFile(fileData);
        setMimeType(mimeType);
      } catch (error) {
        console.error("Error reading file:", error);
      }
    } catch (error) {
      console.error("Error handling file:", error);
    }
  };

  const readContent = async (uri) => {
    try {
      const data = await FileSystem.readAsStringAsync(uri, {
        encoding: "base64",
      });
      return Buffer.from(data, "base64").toString("binary");
    } catch (error) {
      console.error("Error reading file:", error);
      return null;
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
