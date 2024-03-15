import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import VigenereCipher from "../Utils/VigenereCipher.js";
// import DocumentPicker from 'react-native-document-picker';
//https://medium.com/@prem__kumar/implementing-file-upload-with-react-native-document-picker-in-react-native-5c3493da698d
//masih error gatau gmn import nya dah

const CryptoCard = () => {
  const [plaintext, setPlaintext] = useState("");
  const [key, setKey] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [selectedOption, setSelectedOption] = useState('');

  
  const handleEncrypt = () => {
    const vigenere = new VigenereCipher(key);
    const encryptedText = vigenere.encrypt(plaintext);
    setCiphertext(encryptedText);
  };

  const handleDecrypt = () => {
    const vigenere = new VigenereCipher(key);
    const decryptedText = vigenere.decrypt(ciphertext);
    setDecryptedText(decryptedText);
  };

  // const uploadFileOnPressHandler = async () => {
  //   try {
  //     const pickedFile = await DocumentPicker.pickSingle({
  //       type: [DocumentPicker.types.allFiles],
  //     });
  //     console.log('pickedFile',pickedFile);
      
  //     await RNFS.readFile(pickedFile.uri, 'base64').then(data => {
  //       console.log('base64',data);
  //     });
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       console.log(err);
  //     } else {
  //       console.log(error);
  //       throw err;
  //     }
  //   }
  // };

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
              onChangeText={(text) => setKey(text.replace(/[^a-zA-Z\s]/g, ""))}
              multiline={false}
            />
          </View>
          <Text style={styles.textStyle}>Select Input Source:</Text>
          <Picker
            selectedValue={selectedOption}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedOption(itemValue)
            }>
            <Picker.Item label="Text" value="text" />
            <Picker.Item label="File" value="file" />
          </Picker>
          {/* <Button title="Gallary" onPress={async () => {
              uploadFileOnPressHandler();
          }} /> */}
          <View style={styles.separator} />
          {selectedOption === 'text' && (
            <View>
              <Text style={styles.textStyle}>Plain Text:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter plain text"
                  value={plaintext}
                  onChangeText={(text) => setPlaintext(text.replace(/[^a-zA-Z\s]/g, ""))}
                  multiline={true}
                />
              </View>
              <Text style={styles.textStyle}>Encrypted Text:</Text>
              <ScrollView style={styles.outputContainer}>
                <Text style={styles.outputText}>{ciphertext}</Text>
              </ScrollView>
              <View style={styles.separator} />
              <Text style={styles.textStyle}>Ciphertext:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter ciphertext"
                  value={ciphertext}
                  onChangeText={(text) => setCiphertext(text.replace(/[^a-zA-Z\s]/g, ""))}
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
          {selectedOption === 'file' && (
            <View style={styles.inputContainer}>
              {/* disini bikin uploader */}
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
        </View>
      </View>
    </ScrollView>
  );
};

const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    width: deviceWidth - 20,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 25,
  },
  cardContainer: {
    width: deviceWidth - 25,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#5F8DFF',
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 10, // Add padding at the bottom of the card

    shadowColor: '#000',
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
    fontWeight: '800',
    textAlign: 'center', // Align text to the center
  },
  textStyle: {
    paddingTop: 10,
    fontSize: 20,
    fontWeight: '500',
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
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
  },
  outputContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  outputText: {
    fontSize: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10
  },
  separator: {
    height: 2, // Adjust the height to create the desired line thickness
    backgroundColor: '#ccc', // Adjust the color of the separator
    marginTop: 20, // Adjust the margin to position the separator
    marginBottom: 20, // Adjust the margin to position the separator
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#5F8DFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CryptoCard;
