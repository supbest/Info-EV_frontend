import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const MarkerDetailPage = ({ route }) => {
  const navigation = useNavigation();
  const { markerId } = route.params;
  const [markerDetail, setMarkerDetail] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchMarkerDetail();
    // fetchComments();
  }, []);

  const fetchMarkerDetail = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:3001/api/points/${markerId}`);
      setMarkerDetail(response.data);
    } catch (error) {
      console.error('Error fetching marker detail:', error);
    }
  };

  // const fetchComments = async () => {
  //   try {
  //     const response = await axios.get(`http://10.0.2.2:3001/api/comments/${markerId}`);
  //     console.log('Fetched comments:', response.data);
  //     setComments(response.data);
  //   } catch (error) {
  //     console.error('Error fetching comment detail:', error);
  //   }
  // };

  const handleChargePress = (link) => {
    const url = `${link}`;
    Linking.openURL(url);
  };

  const handleDirectionPress = (latitude, longitude) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const handleContactPress = () => {
    // Action to perform when Contact icon is pressed
    // For example, make a phone call
    const phoneNumber = '02-646-3555'; // Replace with the desired phone number
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const onPressBack = () => {
    navigation.navigate('map');
  };

  return (
    <View style={styles.container}>
      {markerDetail &&comments&& (
        <>
          <View style={styles.iconContainer2}>
            <View style={styles.leftarrow}>
            <TouchableOpacity onPress={onPressBack}>
            <Image
              source={require('./asset/leftarrow.png')}
              resizeMode='contain'
              style={styles.icon}/>
            </TouchableOpacity>
            </View>
            <View style={styles.arrow}>
             <Text style={styles.header}>{markerDetail.pointName}</Text> 
             </View>
            
          </View>
          <Image
            source={require('./asset/PTTCharge.jpg')}
            style={styles.coverimage}
            resizeMode='contain'
          />
        <View style={styles.box}>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={()=>handleChargePress(markerDetail.link)}>
              <View style={styles.iconBox}>
                <View style={styles.circularIcon}>
                  <Image source={require('./asset/lightning-icon_34399.png')} style={styles.iconImage} />
                </View>
                <Text style={styles.label}>Charge</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleDirectionPress(markerDetail.latitude, markerDetail.longitude)}>
              <View style={styles.iconBox}>
                <View style={styles.circularIcon}>
                  <Image source={require('./asset/direction.png')} style={styles.iconImage} />
                </View>
                <Text style={styles.label}>Direction</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleContactPress}>
              <View style={styles.iconBox}>
                <View style={styles.circularIcon}>
                  <Image source={require('./asset/contact.png')} style={styles.iconImage} />
                </View>
                <Text style={styles.label}>Contact</Text>
              </View>
            </TouchableOpacity>
          </View>
        <View style={styles.typebox}>
          <Text>ประเภทของหัวชาร์จ</Text>
        </View>
        <View style={styles.infobox}>
         <Text style={styles.font}>{markerDetail.type}, {markerDetail.spec}</Text>
          <Text style={styles.fontdes}>{markerDetail.description}</Text>
          </View>
        </View>
        <View style={styles.line}>
          <Text></Text>
        </View>

          
          <View>
            {/* {renderComments()} */}
          </View>
        
         </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  box:{
    marginTop:0,
    marginRight:0,
    marginBottom:0,
    backgroundColor:'#D0CECE',
    height:750

  },
  typebox:{
    backgroundColor:'#F3F3F3',
    marginLeft:11.5
  }
  ,
  font:{
    fontSize:25,
    marginLeft:4,
  },
  icon:{
    width:25,
    height:25,
    marginTop:120,
    marginLeft:10
  }
  ,
  fontdes:{
    color:'#878787',
    backgroundColor:'#E7E7E7'
  },
  infobox:{
    marginLeft:10
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9bedb0'
  },
  leftarrow: {
    flex: 1,
    alignItems: 'left',
    justifyContent: 'center',
    backgroundColor: '#9bedb0',
  },
  arrow: {
    flex:2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9bedb0',
    width: 300
  },
  header: {

    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop:120,
    width:350,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop:20,
    marginBottom:10
  },
  iconContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop:188,
    marginBottom:10
  },
  iconBox: {
    alignItems: 'center',
    justifyContent:'space-between',
    marginLeft:50,
    marginRight:50
  },
  circularIcon: {
    width: 70,
    height: 70,
    borderRadius: 35, // half of width and height to make it circular
    backgroundColor: '#B8FBCD', // color of the circle
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: 50,
    height: 50,
  },
  label: {
    marginTop: 5,
    fontWeight:'bold'
  },
  coverimage:{
    height:300
  }
});

export default MarkerDetailPage;
