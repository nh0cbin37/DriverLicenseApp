import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// import Login from './Login';
// import { Main_App } from './screens/indexScreens';
// import Navigation from './Navigation';
import Navigation_Bottom from './navigations/Navigation_Bottom';
import { Provider } from 'react-redux';
import store from './redux/store';


export default function App() {
  return (
    <Provider store={store}>
      <Navigation_Bottom />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});