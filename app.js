import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import register from './register';
import login from './login';
import setting from './setting';
import map from './map';
import nCharger from './Ncharger';
import Forgotpassword from'./Forgotpassword';
import mycar from './mycar';
import carlist from './carlist';
import { Image, View } from 'react-native'; 
import audi from './Audi';
import BMW from './BMW';
import comment from './AddCommentPage'
import BYD from './BYD';
import GWM from './GWM'
import Lotus from './Lotus'
import MG from './MG'
import Nissan from './Nissan'
import Tesla from './Tesla'
import Volvo from './Volvo'
import infopage from './infopage'
import setr from './settinglog'




const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const loginName = "login";
const settingName = "setting";
const mapName = "map";
import axios from 'axios';


const TabStack = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Fetch login status from backend
    const fetchLoginStatus = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:3001/api/checkLoggedIn');
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (error) {
        console.error('Error fetching login status:', error);
      }
    };

    fetchLoginStatus();
  }, []);
  return (
    <Tab.Navigator
      initialRouteName={mapName}
      screenOptions={{
        activeTintColor: 'green',
        inactiveTintColor: 'grey',
        labelStyle: { paddingBottom: 10, fontSize: 10 },
        style: { padding: 10, height: 70 }
      }}>
      <Tab.Screen name={mapName}  component={map}  options={{ headerShown: false ,
      tabBarIcon: ({ focused }) => {
        return (
          <View>
            <Image
              source={require("./asset/map_854878.png")}
              resizeMode="contain"
              style={{ width: 25 }}
            />
          </View>
        );
      },
    }}
  />
      <Tab.Screen 
        name={isLoggedIn ? settingName : 'setr'} // Use dynamic component based on login status
        component={isLoggedIn ? setting : setr} // Use setting component if logged in, otherwise use setr
        options={{ headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("./asset/settings.1024x1024.png")}
                resizeMode="contain"
                style={{ width: 25 }}
              />
            </View>
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={TabStack} options={{ headerShown: false }} />
      <Stack.Screen
        name="login"
        component={login}
        options={{ title: ''}}
      />
      <Stack.Screen
        name="register"
        component={register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="charger"
        component={nCharger}
        options={{title: '' }}
      />
      <Stack.Screen
        name="ForgotP"
        component={Forgotpassword}
        options={{title: '' }}
      />
      <Stack.Screen
        name="mycar"
        component={mycar}
        options={{title: '' }}
      />
      <Stack.Screen
        name="carlist"
        component={carlist}
        options={{title: '' }}
      />
      <Stack.Screen
        name="Audi"
        component={audi}
        options={{title: '' }}
      />
      <Stack.Screen
        name="BMW"
        component={BMW}
        options={{title: '' }}
      />
      <Stack.Screen
        name="comment"
        component={comment}
        options={{title: '' }}
      />
      <Stack.Screen
        name="BYD"
        component={BYD}
        options={{title: '' }}
      />
      <Stack.Screen
        name="GWM"
        component={GWM}
        options={{title: '' }}
      />
      <Stack.Screen
        name="Lotus"
        component={Lotus}
        options={{title: '' }}
      />
      <Stack.Screen
        name="Volvo"
        component={Volvo}
        options={{title: '' }}
      />
      <Stack.Screen
        name="Tesla"
        component={Tesla}
        options={{title: '' }}
      />
      <Stack.Screen
        name="Nissan"
        component={Nissan}
        options={{title: '' }}
      />
      <Stack.Screen
        name="MG"
        component={MG}
        options={{title: '' }}
      />
      <Stack.Screen
        name="infopage"
        component={infopage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="setr"
        component={setr}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

export default App;
