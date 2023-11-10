import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { TabNavigator } from "./TabNavigator";
import { Card } from "../components/Card";
import { Image, StyleSheet } from "react-native";
import UpdateAboutSection from "../components/UpdateAboutSection";
import SingleEvent from "../components/SingleEvent";
import AddEvent from "../components/AddEvent";

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
      <Stack.Screen
        name="SingleEvent"
        component={SingleEvent}
        options={{
          gestureEnabled: true,
          headerMode: "screen",
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#EE9322",
            height: 100,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="AddEvent"
        component={AddEvent}
        options={{
          gestureEnabled: true,
          headerMode: "screen",
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#EE9322",
            height: 100,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="UpdateAbout"
        component={UpdateAboutSection}
        options={{ gestureEnabled: true, headerTitle: "Update Profile" }}
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
