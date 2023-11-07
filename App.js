import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { AppNavigator } from "./navigation/AppNavigator";
import { UserProvider } from "./contexts/UserContext";
import "./firebase";

export default function App() {
  return (
    <UserProvider>
      <View style={styles.container}>
        <AppNavigator />
        <StatusBar style="auto" />
      </View>
    </UserProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
