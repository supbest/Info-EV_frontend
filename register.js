import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onRegisterPress = () => {
    // Validate input fields, for example, check if passwords match
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }
    if (password.length < 4) {
      Alert.alert('Password must be at least 4 characters long');
      return;
  }

   // Send registration data to backend
    axios.post('http://10.0.2.2:3001/api/signup', {
      email: email,
      name: username,
      password: password
    })
    .then(response => {
      // Handle successful registration
      console.log('Registration successful:', response.data);
      Alert.alert('Registration successful')
      navigation.navigate('login');
    })
    .catch(error => {
      // Handle regisAration error
      console.error('Registration failed:', error);
      Alert.alert('Registration failed. Please try again.');
    });

  };
   
  const onBackPress = () => {
    navigation.navigate('login');
  };

  return (
    <ImageBackground
      source={require('./asset/cz.jpg')}
      style={styles.backgroundImage}
      onError={(error) => console.log('Image load error:', error.nativeEvent.error)}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Register</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#808080"
            onChangeText={text => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#808080"
            onChangeText={text => setUsername(text)}
            value={username}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#808080"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            value={password}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#808080"
            secureTextEntry={true}
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}
          />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={onRegisterPress}>
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Text style={styles.backText}>Back</Text>
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
    fontSize: 70,
    fontWeight: 'bold',
    marginBottom: 100,
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
    marginBottom: 15,
    marginTop: 150,
    borderRadius: 5,
  },
  loginText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: 'gray',
    paddingVertical: 15,
    marginBottom: 15,
    marginTop: 0,
    borderRadius: 5,
  },
  backText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;