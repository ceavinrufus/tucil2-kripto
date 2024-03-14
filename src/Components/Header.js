import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

const Header = ({ label }) => {
  // console.log(label);

  return (
    <View style={styles.container}>
      <Text style={styles.labelStyle}>{label}</Text> 
      {/* //label itu props, text nya di pass dari homescreen. */}
    </View>
  );
};

const deviceWidth = Math.round(Dimensions.get('window').width); //ambil ukuran layar masukin ke const trus dipake buat styling

const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: 90,
    backgroundColor: '#5F8DFF',
    justifyContent: 'flex-end',
    paddingBottom: 20,
    alignItems: 'center',
  },
  labelStyle: {
    fontFamily: 'Roboto',
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff'
  }
});

export default Header;