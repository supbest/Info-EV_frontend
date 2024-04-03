// AddCommentPage.js

import React, { useState,useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const AddCommentPage = ({ route, navigation }) => {
  const [comment, setComment] = useState('');
  const [username, setUsername] = useState('');
  const { _id } = route.params; // Moved inside the component body

  const handleSubmit = () => {
    // Check if username is present
    if (!username) {
      // Show alert message if username is missing
      alert("Please login before posting a comment");
      return; // Stop further execution
    }
  
    // If username is present, proceed with posting the comment
    axios.post('http://10.0.2.2:3001/api/comment', {
      MarkerId: _id,
      comment: comment,
      username: username
    })
      .then(response => {
        console.log('Comment submitted for marker:', _id);
        console.log('Comment:', comment);
        // Navigate back to the Map page or any other page as needed
        navigation.goBack();
      })
      .catch(error => {
        console.error('Error submitting comment:', error);
        // Handle error if needed
      });
  };
  
  useEffect(() => {
    axios.get('http://10.0.2.2:3001/api/username')
      .then(response => {
        setUsername(response.data.username);
      })
      .catch(error => {
        console.error('Error fetching username:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a comment..."
        onChangeText={text => setComment(text)}
        value={comment}
        multiline
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#a3ed9b'
  },
  input: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
    backgroundColor:'white'
  },
});

export default AddCommentPage;
