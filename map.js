import React, { useState, useEffect,useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, Platform, auto } from 'react-native';
import MapView, { Circle, Marker, enableLatestRenderer } from 'react-native-maps';
import { Linking, PermissionsAndroid } from 'react-native';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
enableLatestRenderer();

const Map = ({ navigation }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [comments, setComments] = useState([]);
  const [markerData, setMarkerData] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null); // State to store current position
  const [hasLocationPermission, setHasLocationPermission] = useState(false); // State to track location permission
  const mapViewRef = useRef(null);




  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, []);
  const fetchData = async () => {
    fetchPointCollection();
    getCurrentPosition();
  };
  useEffect(() => {
    if (selectedMarker) {
      const markerInfo = findMarkerDataById(selectedMarker);
      if (markerInfo) {
        fetchComments(markerInfo._id);
      }
    }
  }, [selectedMarker]);

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
  };

  const onPressMarkerInfo = (_id) => {
    navigation.navigate('comment', { _id });
  };

  const findMarkerDataById = (_id) => {
    return markerData.find(marker => marker._id === _id);
  };
  const onPressMarkerinfo = (_id) => {
    navigation.navigate('infopage', { markerId: _id });
  };
  
  const renderComments = () => {
    return comments.map((comment, index) => (
      <View key={index} style={styles.headerContainer2}>
        <View style={styles.typeQuantityContainer2}>
          <Text  style={styles.UsernameText}>{comment.username}</Text>
          <Text key={index} style={styles.reviewDate}>{comment.timestamp}</Text>
        </View>
        <Text key={index} style={styles.reviewText}>{comment.comment}</Text>
      </View>
    ));
  };
  
  const fetchComments = async (_id) => {
    try {
      const response = await axios.get(`http://10.0.2.2:3001/api/comments?markerId=${_id}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchPointCollection = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:3001/api/points');
      const points = response.data.map(marker => ({ ...marker, _id: marker._id.toString() })); // Convert _id to string
      setMarkerData(points);
    } catch (error) {
      console.error('Error fetching point collection:', error);
    }
  };

  const renderBottomTabBarContent = () => {
    if (selectedMarker) {
      const markerInfo = findMarkerDataById(selectedMarker);
      if (markerInfo) {
        return (
        
          <View style={styles.bottomBar}>
            <ScrollView style={styles.scrollView}>
            <View style={styles.headerContainer}>
              <Text style={styles.header}>{markerInfo.pointName}</Text>
              <TouchableOpacity onPress={() => onPressMarkerinfo(selectedMarker)} style={styles.contentContainer}>
                <Image source={require('./asset/900px-Minimalist_info_Icon.png')} style={styles.icon} />
              </TouchableOpacity>
              <View>
                <TouchableOpacity onPress={() => handleDirectionPress(markerInfo.latitude, markerInfo.longitude)}>
                  <Text style={styles.directionIcon}>Direction</Text>
                </TouchableOpacity>
              </View>
            </View>
            {markerInfo.type && markerInfo.description && markerInfo.link && (
              <View style={styles.inbox}>
                <Text style={styles.text}>ประเภทของหัวชาร์จ</Text>
                <View style={styles.typeQuantityContainer}>
                  <Text style={styles.texttype}>Type: {markerInfo.type}</Text>
                  <TouchableOpacity onPress={() => handleLinkPress(markerInfo.link)}>
                    <Text style={styles.chargeButton}>Charge</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.text}>{markerInfo.description}</Text>
              </View>
            )}
            <View style={styles.headerContainer}>
              <Text style={styles.headerreview}>Review</Text>
              <TouchableOpacity onPress={() => onPressMarkerInfo(selectedMarker)} style={styles.contentContainer}>
                <Image source={require('./asset/plus.png')} style={styles.icon2} />
              </TouchableOpacity>
            </View>
            {/* Scrollable comments section */}
              <View>
                {renderComments()}
              </View>
            </ScrollView>
          </View>
        );
      }
    }
    return null; // Return null if no marker is selected or marker info is not available
  };

  const handleDirectionPress = (latitude, longitude) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const handleLinkPress = (link) => {
    const url = `${link}`;
    Linking.openURL(url);
  };
  const checkLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location.',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setHasLocationPermission(true);
        // Once permission is granted, start accessing the location
        Geolocation.getCurrentPosition(
          position => {
            console.log('Current position:', position);
            // Update the current position state
            setCurrentPosition({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            // Update the map view region to the current position
            mapViewRef.current.animateToRegion({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            });
          },
          error => {
            console.error('Error getting location:', error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        console.warn('Location permission denied');
      }
    } catch (err) {
      console.error('Error checking location permission:', err);
    }
  };
  

  const getCurrentPosition = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.watchPosition(
            position => {
              const { latitude, longitude } = position.coords;
              setCurrentPosition({ latitude, longitude }); // Set current position
            },
            error => console.error('Error watching position:', error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 } // Specify options for watching position
            );
          } else {
            console.log('Location permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        Geolocation.watchPosition(
          position => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({ latitude, longitude }); // Set current position
          },
          error => console.error('Error watching position:', error),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 } // Specify options for watching position
        );
      }
    };
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
        {currentPosition && (
          <MapView
            ref={mapViewRef}
            style={styles.map}
            initialRegion={{
              latitude: currentPosition.latitude,
              longitude: currentPosition.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            {currentPosition && (
            
              <Circle
                center={{
                latitude: currentPosition.latitude,
                longitude: currentPosition.longitude,
                }}
                radius={200} // Adjust the radius as needed to make the circle visible on the map
                fillColor="rgba(0, 0, 255, 0.3)" // Set the fill color of the circle (blue with transparency)
                strokeColor="rgba(0, 0, 255, 0.5)" // Set the stroke color of the circle (blue with transparency)
                strokeWidth={2} // Set the stroke width of the circl
                />
          
            )}
            {markerData.map(marker => (
              <Marker
                key={marker.id}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                onPress={() => handleMarkerPress(marker._id)}
              />
            ))}
          </MapView>)}
          <View style={styles.icon3box}>
            <TouchableOpacity onPress={checkLocationPermission}>
              <Image
              source={require('./asset/Current.jpg')}
              style={styles.icon3}
              />
            </TouchableOpacity>
          </View>
          {selectedMarker && renderBottomTabBarContent()}
        </View>
        
      </SafeAreaView>
    );
  };


const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  headerreview: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 19,
    marginRight: 250,
    marginLeft:20
  },
  r:{
    marginBottom:10
  },

  reviewDate: {
    textAlign: 'right',
    marginRight: 20,
    marginTop: 10,
  },
  inbox: {
    backgroundColor: "#c4cec7",
    paddingHorizontal: 20
  },
  inbox2: {
    backgroundColor: "#c4cec7",
    paddingHorizontal: 177
  },
  bottomBar: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: '#9bedb0',
    paddingVertical: 20,
    alignItems: 'center',
    borderRadius: 15,
    marginTop:10
  },
  contentContainer: {
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between'
  },
  headerContainer2: {
    alignItems: 'left',
    marginBottom: 10,
    backgroundColor: "#c4cec7",
    width: 413
  },
  header: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'left',
    marginRight: 20,
    marginLeft:20,
    width:230
  },
    UsernameText: {
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 20,
    marginTop:10
    
  },
  icon2: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginTop: 20
  },
  icon3:{
    width: 50,
    height: 50,
    marginTop: 720,
    marginLeft: 350,
    marginBottom:'auto',
    borderRadius:50
  },
  icon3box:{
    alignContent:'left',
    width: 50,
    height: 50,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginLeft: auto,
  },
  directionIcon: {
    backgroundColor: "green",
    paddingVertical: 10,
    borderRadius: 15,
    paddingHorizontal: 18,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight:20
  },
  text: {
    textAlign: 'left',
    marginRight: 100,
    marginTop:10,
    marginBottom:10
  },
  typeQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  typeQuantityContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  chargeButton: {
    backgroundColor: "green",
    paddingVertical: 10,
    borderRadius: 15,
    paddingHorizontal:18,
color: 'white',
fontWeight: 'bold'
},
reviewText: {
textAlign: 'left',
marginLeft: 20,
marginTop: 10,
marginBottom: 10
},
scrollView: {
  maxHeight: 250, // Set a maximum height for the scroll view
  width: '100%', // Make the scroll view take the full width
},
texttype:{
  fontWeight:'bold',
  fontSize:17
}
});


export default Map;
