import { registerRootComponent } from 'expo';

import App from './App';
import Login from './app-temp/screens/login';
import Plantilla from './app-temp/screens/Plantilla';
import Calculadora from './app-temp/screens/Calculadora';
import FakeStore from './app-temp/screens/FakeStore';
import FakeStore2 from './app-temp/screens/fakeStore2';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(FakeStore2);
