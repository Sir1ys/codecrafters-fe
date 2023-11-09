import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { AppNavigator } from "./navigation/AppNavigator";
import { UserProvider } from "./contexts/UserContext";
import "./firebase";
import * as Font from "expo-font";
import { useEffect, useState } from "react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          black: require("./assets/fonts/Montserrat-Thin.ttf"),
          poppins_bold: require("./assets/fonts/Poppins-Bold.ttf"),
          bold: require("./assets/fonts/Poppins-Bold.ttf"),
          poppins_black: require("./assets/fonts/Poppins-Black.ttf"),
          regular: require("./assets/fonts/Poppins-Regular.ttf"),
          thin: require("./assets/fonts/Poppins-Thin.ttf"),
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    prepare();
  }, []);

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
    fontFamily: "bold",
  },
});
