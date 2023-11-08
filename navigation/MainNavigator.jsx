import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { TabNavigator } from "./TabNavigator";
import { Card } from "../components/Card";
import { Image, StyleSheet } from "react-native";

const Stack = createStackNavigator();

export const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{
          headerMode: "screen",
          title: (
            <Image
              style={styles.tinyLogo}
              source={require("../assets/tinyLogo.png")}
            />
          ),
          headerStyle: {
            backgroundColor: "#EE9322",
            height: 100,
            paddingBottom: 30,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Card"
        component={Card}
        options={{
          gestureEnabled: true,
          headerTitle: "Card Test",
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 100,
    height: 50,
  },
});
