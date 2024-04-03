import React,{useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation,useRoute } from '@react-navigation/native';

const MyCarScreen = () => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('carlist');
  };
  const route = useRoute();
  const { carType = 'empty' } = route.params || {};
  const { name = '' } = route.params || {};
  const { typedc = '' } = route.params || {};
  const { typeac = '' } = route.params || {};
  const getImagePath = (carType) => {
    // Replace this logic with your actual image paths
    switch (carType.toLowerCase()) {
      case"empty" :
      return require('./asset/mt.jpg');;
      case 'model 3':
        return require('./asset/tesla_model3.png');
      case 'model s':
        return require('./asset/tesla_models.png');
      case 'model x':
        return require('./asset/tesla_modelx.png');
      case 'model y':
        return require('./asset/tesla-model-y-performance-awd.jpg');
      default:
        return null; // Default image if car type not found
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Info EV</Text>
      <View style={styles.imageContainer}>
      <Image
        source={getImagePath(carType)}
        style={styles.headerImage}
        resizeMode="contain"
      />
      </View>
      <View style={styles.informationText}>
        <Text style={styles.Textinformation}>{name}</Text>
        <Text style={styles.Texttype}> {typedc}</Text>
        <Text style={styles.Texttype}> {typeac}</Text>
      </View>
      <View style={styles.inputContainer}>
        
      <TouchableOpacity style={styles.registerButton} onPress={onPress}>
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>
      </View>
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
   registerButton: {
    backgroundColor: "#808080",
    paddingVertical: 15,
    borderRadius: 5,
  },
  imageContainer: {
    alignItems: 'center', // Center image horizontally
    marginBottom: 20,
    marginRight: 180,
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  headerImage:{
    height:300,
    width:400,
    marginBottom: 30
  }
  ,
  header: {
    fontSize: 70,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 30
  },
  registerText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  informationText: {
    alignItems: 'center',
    marginBottom:10
  },
  Textinformation: {    
    fontWeight: 'bold',
    fontSize: 20
  },
  Texttype: {
    marginTop: 10,
    fontSize: 20
  },
});

export default MyCarScreen;
