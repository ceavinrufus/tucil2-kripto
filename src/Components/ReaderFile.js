import React from "react";
import { View, Text, Button } from "react-native";
import * as DocumentPicker from "expo-document-picker";

const ReaderFile = ({ setFile, setFileName }) => {
  const pickFile = async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({ type: "*/*" });
      if (response.type === "success") {
        const { name, uri } = response;
        setFileName(name);

        // Read file content
        const fileContent = await fetch(uri);
        const buffer = await fileContent.arrayBuffer();
        const fileArray = new Uint8Array(buffer);
        setFile(fileArray);
      }
    } catch (error) {
      console.error("Error picking file:", error);
    }
  };

  return (
    <View>
      <Button title="Upload File" onPress={pickFile} />
    </View>
  );
};

export default ReaderFile;
