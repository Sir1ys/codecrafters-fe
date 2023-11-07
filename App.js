import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import "./firebase";
import { AppNavigator } from "./navigation/AppNavigator";

export default function App() {
  return (
    <View style={styles.container}>
      <AppNavigator />
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
