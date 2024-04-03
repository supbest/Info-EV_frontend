import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const NchargerScreen = () => {
  const navigation = useNavigation();

  // State variables for form data
  const [pointName, setLocationName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [type, setType] = useState('');
  const [spec, setSpec] = useState('');
  const [description, setDescription] = useState('');
  const [link, setAppLink] = useState('');
  const [photoLink, setPhotoLink] = useState('');
  const [username, setUsername] = useState('');
  useEffect(() => {
    axios.get('http://10.0.2.2:3001/api/username')
      .then(response => {
        setUsername(response.data.username);
      })
      .catch(error => {
        console.error('Error fetching username:', error);
      });
  }, []);
  const onRegisterPress = () => {
    
    if (!username) {
      // Show alert message if username is missing
      Alert.alert("Please login before register");
      return; // Stop further execution
    }
  
    // Send charger data to backend
    axios.post('http://10.0.2.2:3001/api/newcharger', {
      pointName,
      latitude,
      longitude,
      type,
      spec,
      description,
      link,
    })
    .then(response => {
      navigation.navigate('map');
      console.log('Registration successful:', response.data);
      Alert.alert('Register Sucessfuly');
    })
    .catch(error => {
      console.error('Registration failed:', error);
      // Show an alert or toast message indicating registration failure
      Alert.alert('Registration failed', 'Failed to register new charger');
    });
  };

  return (
    <ImageBackground
      source={require('./asset/cz.jpg')}
      style={styles.backgroundImage}
      onError={(error) => console.log('Image load error:', error.nativeEvent.error)}
    >
      <View style={styles.container}>
        <Text style={styles.header}>New Charger</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Location Name"
            placeholderTextColor="#808080"
            value={pointName}
            onChangeText={setLocationName}
          />
          <TextInput
            style={styles.input}
            placeholder="Latitude"
            placeholderTextColor="#808080"
            value={latitude}
            onChangeText={setLatitude}
          />
          <TextInput
            style={styles.input}
            placeholder="Longitude"
            placeholderTextColor="#808080"
            value={longitude}
            onChangeText={setLongitude}
          />
          <TextInput
            style={styles.input}
            placeholder="Type"
            placeholderTextColor="#808080"
            value={type}
            onChangeText={setType}
          />
          <TextInput
            style={styles.input}
            placeholder="Spec"
            placeholderTextColor="#808080"
            value={spec}
            onChangeText={setSpec}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            placeholderTextColor="#808080"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Link to Your App"
            placeholderTextColor="#808080"
            value={link}
            onChangeText={setAppLink}
          />
        </View>
        <TouchableOpacity style={styles.registerButton} onPress={onRegisterPress}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    objectFit: 'cover'
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  header: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 50,
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
  registerButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    marginBottom: 10,
    marginTop: 100,
    borderRadius: 10,
  },
  registerText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default NchargerScreen;
