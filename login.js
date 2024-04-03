import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  useEffect(() => {
    // Check login status on component mount
    // You can implement this based on your authentication logic
    // For demonstration, assume the user is already logged in
    // You should replace this with actual login status check
    setIsLoggedIn(true);
  }, []);

  const onLoginPress = () => {
    if (!username || !password) {
      Alert.alert('Please enter username and password');
      return;
    }
    axios.post('http://10.0.2.2:3001/api/login', {
      name: username,
      password: password
    })
    .then(response => {
      console.log('Login successful:', response.data);
      setIsLoggedIn(true); // Update login status
      navigation.navigate('map');
    })
    .catch(error => {
      // Handle login error
      console.error('Login failed:', error);
      Alert.alert('Login failed', 'Incorrect username or password');
    });
  };

  const onRegisterPress = () => {
    navigation.navigate('register');
  };

  const onLogoutPress = async () => {
    try {
      const response = await axios.delete('http://10.0.2.2:3001/api/logout');
      console.log(response.data.message); // Log the response message
      // Handle any additional logic after successful logout, such as navigation or state updates
    } catch (error) {
      console.error('Logout failed:', error);}
    setIsLoggedIn(false); // Update login status
    // Perform logout actions here if needed
  };
  const onForgotPasswordPress = () => {
    navigation.navigate('ForgotP');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./asset/lighting.jpg')}
        style={styles.headerImage}
        resizeMode="cover"
      />
      <Text style={styles.header}>Info EV</Text>
      <View style={styles.inputContainer}>
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
        <TouchableOpacity onPress={onForgotPasswordPress}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={isLoggedIn ? styles.loginButton :styles.logoutButton} onPress={isLoggedIn ? onLoginPress : onLogoutPress}>
        <Text style={isLoggedIn ? styles.loginText : styles.logoutText}>{isLoggedIn ? 'Login' : 'Logout'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ styles.registerButton} onPress={onRegisterPress}>
          <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  headerImage: {
    width: '100%', 
    height: 300, 
  },
  header: {
    fontSize: 70,
    fontWeight: 'bold',
    marginBottom: 30,
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
    borderRadius: 5,
  },
  sidebarButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    marginBottom: 15,
    borderRadius: 5,
  },
  loginText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: "#808080",
    paddingVertical: 15,
    borderRadius: 5,
  },
  registerText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'red', // Change button color to red
    paddingVertical: 15,
    marginBottom: 15,
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
