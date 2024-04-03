import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BMWScreen = () => {
  const navigation = useNavigation();

  const onPressCarType = (cartype, name, typedc, typeac) => {
    // Navigate to the details screen or perform any other action
    console.log(`Navigating to details for car type: ${cartype}`);
    navigation.navigate('mycar', { carType: cartype, name: name, typedc: typedc, typeac: typeac });
  };

  const carname = [
    {
      cartype: "model 3",
      name: "Tesla model 3",
      typedc: "Plug DC: CCS",
      typeac: "Plug AC: Type2"
    },
    {
      cartype: "model s",
      name: "Tesla model S",
      typedc: "Plug DC: CCS",
      typeac: "Plug AC: Type2"
    },
    {
      cartype: "model x",
      name: "Tesla model X",
      typedc: "Plug DC: CCS",
      typeac: "Plug AC: Type2"
    },
    {
      cartype: "model y",
      name: "Tesla model Y",
      typedc: "Plug DC: CCS",
      typeac: "Plug AC: Type2"
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
      <Text style={styles.alphabet}>Tesla</Text>
      <ScrollView>
        {sortedKeys.map((letter, index) => (
          <View key={index}>
            {classifiedCars[letter].map((car, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => onPressCarType(car.cartype, car.name, car.typedc, car.typeac)}
                style={styles.carTypeBox}
              >
                <Text style={styles.carTypeText}>{car.cartype}</Text>
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
    padding: 10,
    marginTop: 0,  },
  carTypeText: {
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 15,
  },
});

export default BMWScreen;
