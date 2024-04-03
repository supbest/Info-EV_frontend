/**
 * @format
 */

import {AppRegistry} from 'react-native';
import login from './login';
import register from './register';
import newc from './setting';
import {name as appName} from './app.json';
import MyStack from './app';
import carlist from './carlist';
import final from './infopage'


AppRegistry.registerComponent(appName, () => MyStack)


