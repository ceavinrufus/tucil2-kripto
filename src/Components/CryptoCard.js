import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import ModifiedRC4Cipher from "../Utils/ModifiedRC4Cipher.js";
import ReaderFile from "./ReaderFile.js";
import * as FileSystem from "expo-file-system";

const CryptoCard = () => {
  const [key, setKey] = useState("");
  const [plaintext, setPlaintext] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [selectedOption, setSelectedOption] = useState("text");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [mimeType, setMimeType] = useState("");
  const [encryptedFile, setEncryptedFile] = useState();
  const [decryptedFile, setDecryptedFile] = useState();

  const rc4 = new ModifiedRC4Cipher(key);

  const handleEncrypt = () => {
    const encryptedText = rc4.encrypt(plaintext);
    setEncryptedText(encryptedText);
  };

  const handleDecrypt = () => {
    const decryptedText = rc4.decrypt(ciphertext);
    setDecryptedText(decryptedText);
  };

  const downloadFile = async (content, nameExtension) => {
    try {
      const blob = await new Blob([content.buffer], {
        type: mimeType,
      });
      const url = URL.createObjectURL(blob); // Create a temporary URL for the blob
      // console.log(escape(String.fromCharCode(...content)));

      // Choose a suitable download directory (replace with your desired location)
      const downloadPath =
        fileName.split(".")[0] +
        "_" +
        nameExtension +
        "." +
        fileName.split(".")[1];

      const link = document.createElement("a");
      link.href = url;
      link.download = downloadPath;
      link.click();

      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error("Error downloading file:", error);
      // Handle other errors
    }
  };

  const encryptFile = () => {
    // Encrypt file
    const encryptedContent = rc4.encryptFile(file);
    setEncryptedFile(encryptedContent);
    setDecryptedFile(null);
  };

  const decryptFile = () => {
    // Decrypt file
    const decryptedContent = rc4.decryptFile(file);
    setDecryptedFile(decryptedContent);
    setEncryptedFile(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Text style={styles.titleStyle}>Modified RC4</Text>
          <Text style={styles.textStyle}>Key:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter key"
              value={key}
              onChangeText={(text) => setKey(text)}
              multiline={false}
            />
          </View>
          <Text style={styles.textStyle}>Select Input Source:</Text>
          <Picker
            selectedValue={selectedOption}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedOption(itemValue)
            }
          >
            <Picker.Item label="Text" value="text" />
            <Picker.Item label="File" value="file" />
          </Picker>

          <View style={styles.separator} />
          {selectedOption === "text" && (
            <View>
              <Text style={styles.textStyle}>Plain Text:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter plain text"
                  value={plaintext}
                  onChangeText={(text) => setPlaintext(text)}
                  multiline={true}
                />
              </View>
              <Text style={styles.textStyle}>Encrypted Text:</Text>
              <ScrollView style={styles.outputContainer}>
                <Text style={styles.outputText}>{encryptedText}</Text>
              </ScrollView>
              <View style={styles.separator} />
              <Text style={styles.textStyle}>Ciphertext:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter ciphertext"
                  value={ciphertext}
                  onChangeText={(text) => setCiphertext(text)}
                  multiline={true}
                />
              </View>
              <Text style={styles.textStyle}>Decrypted Text:</Text>
              <ScrollView style={styles.outputContainer}>
                <Text style={styles.outputText}>{decryptedText}</Text>
              </ScrollView>
              <View style={styles.separator} />
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleEncrypt}>
                  <Text style={styles.buttonText}>Encrypt</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleDecrypt}>
                  <Text style={styles.buttonText}>Decrypt</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {selectedOption === "file" && (
            <View style={styles.inputContainer}>
              {/* disini bikin uploader */}
              <ReaderFile
                setFile={setFile}
                setFileName={setFileName}
                setMimeType={setMimeType}
              />
              {file && <Text>File Selected: {fileName}</Text>}

              <View style={styles.separator} />

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={encryptFile}>
                  <Text style={styles.buttonText}>Encrypt</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={decryptFile}>
                  <Text style={styles.buttonText}>Decrypt</Text>
                </TouchableOpacity>
                {/* <Button
                  title="Encrypt File"
                  onPress={encryptFile}
                  disabled={!file || !key}
                />
                <Button
                  title="Decrypt File"
                  onPress={decryptFile}
                  disabled={!file || !key}
                /> */}
              </View>
              {/* Other UI components */}
              <View style={styles.separator} />

              <View>
                {file && (
                  <View style={{ gap: 4 }}>
                    {encryptedFile && (
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => downloadFile(encryptedFile, "encrypted")}
                      >
                        <Text style={styles.buttonText}>
                          Download Encrypted File
                        </Text>
                      </TouchableOpacity>
                    )}
                    {decryptedFile && (
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => downloadFile(decryptedFile, "decrypted")}
                      >
                        <Text style={styles.buttonText}>
                          Download Decrypted File
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const deviceWidth = Math.round(Dimensions.get("window").width);
const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    width: deviceWidth - 20,
    alignItems: "center",
    marginTop: 25,
    marginBottom: 25,
  },
  cardContainer: {
    width: deviceWidth - 25,
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#5F8DFF",
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 10, // Add padding at the bottom of the card

    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 9,
  },
  titleStyle: {
    fontSize: 25,
    fontWeight: "800",
    textAlign: "center", // Align text to the center
  },
  textStyle: {
    paddingTop: 10,
    fontSize: 20,
    fontWeight: "500",
    paddingLeft: 10,
  },
  inputContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  input: {
    fontSize: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 10,
  },
  outputContainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  outputText: {
    fontSize: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 10,
  },
  separator: {
    height: 2, // Adjust the height to create the desired line thickness
    backgroundColor: "#ccc", // Adjust the color of the separator
    marginTop: 20, // Adjust the margin to position the separator
    marginBottom: 20, // Adjust the margin to position the separator
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
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

export default CryptoCard;
