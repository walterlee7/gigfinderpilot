if (!console.dir) {
    console.dir = () => { };
    console.log = () => { };
}

import { AppRegistry } from 'react-native';
import App from './src/App';



AppRegistry.registerComponent('GigFinder', () => App);
