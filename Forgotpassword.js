import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NchargerScreen = () => {
  return (
  <ImageBackground
    source={require('./asset/cz.jpg')} // แทนที่ path_to_your_image.jpg ด้วยที่อยู่ของรูปภาพ
    style={styles.backgroundImage}
    onError={(error) => console.log('Image load error:', error.nativeEvent.error)}
  >
    <View style={styles.container}>
      <Text style={styles.header}>Forgot Password</Text>
      <View style={styles.inputContainer}>
      <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#808080"
        />
        <TextInput
          style={styles.input}
          placeholder="Re-Email"
          placeholderTextColor="#808080"
        />
      </View>
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>send</Text>
      </TouchableOpacity>
    </View>
  </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage : {
    flex:1,
    resizeMode:'cover',
    justifyContent: 'center',
    objectFit:'cover'
  }, 
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  header: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 60,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F0F0F0',
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  forgotPassword: {
    color: 'green',
    textAlign: 'right',
  },
  loginButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    marginBottom: 10,
    marginTop: 300,
    borderRadius: 30,
  },
  loginText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default NchargerScreen;