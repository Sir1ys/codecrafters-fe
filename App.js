import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import './firebase';

export default function App() {
  return (
    <View style={styles.container}>
      <SignIn />
      <SignUp />
      <StatusBar style="auto" />
    </View>
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