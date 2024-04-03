import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SettingScreen = () => {
  const navigation = useNavigation()
  const onpress = () => {
   navigation.navigate('login');};
  const nChargerpress = () => {
   navigation.navigate('charger');
  };
  const mycarpress = () => {
    navigation.navigate('mycar')
  }

  return (
  <ImageBackground
    source={require('./asset/cz.jpg')} // แทนที่ path_to_your_image.jpg ด้วยที่อยู่ของรูปภาพ
    style={styles.backgroundImage}
    onError={(error) => console.log('Image load error:', error.nativeEvent.error)}
  >
    <View style={styles.container}>
      <Text style={styles.header}>Setting</Text>
      <View style={styles.inputContainer}>
      <TouchableOpacity style={styles.input} onPress={mycarpress}>
        <Text style={styles.loginText}>Mycar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.input} onPress={nChargerpress}>
        <Text style={styles.loginText}>New Charger Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.input} onPress = {onpress}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.input}>
        <Text style={styles.loginText}>Notification</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.input}>
        <Text style={styles.loginText}>Rate this app</Text>
      </TouchableOpacity>
      </View>
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
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 50,
    marginTop: 90,
    textAlign: 'left',
  },
  inputContainer: {
    marginBottom: 450,
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
    backgroundColor: 'red',
    paddingVertical: 15,
    marginBottom: 10,
    marginTop: 350,
    borderRadius: 30,
  },
  loginText: {
    color: 'grey',
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop: 10,
  },
  logoutText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 3,
    fontSize: 20,
  },
});

export default SettingScreen;