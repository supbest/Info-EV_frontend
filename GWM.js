import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BYDScreen = () => {
  const navigation = useNavigation();

  const onPressCarType = (cartype) => {
    console.log(`Navigating to details for car type: ${cartype}`);
  };

  const carname = [
    {
      cartype: "Ora Good Cat"
    },
    {
      cartype: "Ora 07",
    }
  ];

  // Function to classify car types by alphabet
  const classifyByAlphabet = () => {
    const classifiedCars = {};
    carname.forEach(car => {
      const firstChar = car.cartype.charAt(0).toUpperCase();
      if (!classifiedCars[firstChar]) {
        classifiedCars[firstChar] = [];
      }
      classifiedCars[firstChar].push(car);
    });
    return classifiedCars;
  };

  const classifiedCars = classifyByAlphabet();

  // Sort the keys alphabetically
  const sortedKeys = Object.keys(classifiedCars).sort();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Info EV</Text>              
      <Text style={styles.alphabet}>GWM</Text>
      <ScrollView>
        {sortedKeys.map((letter, index) => (
          <View key={index}>
            <TouchableOpacity onPress={() => onPressCarType(letter)}>
            </TouchableOpacity>
            {classifiedCars[letter].map((car, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => onPressCarType(car.cartype)}
                style={styles.carTypeBox}
              >
                <Text style={styles.carTypeText}>{car.cartype}</Text>
                <Text>{car.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  alphabet: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  carTypeBox: {
    backgroundColor: '#F0F0F0',
    padding: 1,
  },
  carTypeText: {
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop:5,
    fontSize:15,
  },
  registerButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  registerText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default BYDScreen;
