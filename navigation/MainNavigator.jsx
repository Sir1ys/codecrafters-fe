import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { TabNavigator } from "./TabNavigator";
import { Card } from "../components/Card";
import { Image, StyleSheet, View } from "react-native";
import UpdateAboutSection from "../components/UpdateAboutSection";
import SingleEvent from "../components/SingleEvent";
import { Feed } from "../components/Feed";
import AddEvent from "../components/AddEvent";
import Attending from "../components/Attending";
import Location from "../components/Location";
import AddTrip from "../components/AddTrip";
import SavedEvents from "../components/SavedEvents";
import { useState } from "react";
import Comments from "../components/Comments";

const Stack = createStackNavigator();

export const MainNavigator = () => {
  const [eventsAttending, setEventsAttending] = useState([]);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{
          headerMode: "screen",
          title: (
            <View style={styles.logoContainer}>
              <Image
                style={styles.tinyLogo}
                source={require("../assets/tinyLogo.png")}
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: "#EE9322",
            height: 100,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
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
          title: (
            <View style={styles.logoContainer}>
              <Image
                style={styles.tinyLogo}
                source={require("../assets/tinyLogo.png")}
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: "#EE9322",
            height: 100,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="AddEvent"
        component={AddEvent}
        options={{
          gestureEnabled: true,
          headerMode: "screen",
          title: (
            <View style={styles.logoContainer}>
              <Image
                style={styles.tinyLogo}
                source={require("../assets/tinyLogo.png")}
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: "#EE9322",
            height: 100,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="AddTrip"
        component={AddTrip}
        options={{
          gestureEnabled: true,
          headerMode: "screen",
          title: (
            <View style={styles.logoContainer}>
              <Image
                style={styles.tinyLogo}
                source={require("../assets/tinyLogo.png")}
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: "#EE9322",
            height: 100,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Attending"
        component={Attending}
        options={{
          gestureEnabled: true,
          headerMode: "screen",
          title: (
            <View style={styles.logoContainer}>
              <Image
                style={styles.tinyLogo}
                source={require("../assets/tinyLogo.png")}
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: "#EE9322",
            height: 100,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="SavedEvents"
        component={SavedEvents}
        options={{
          gestureEnabled: true,
          headerMode: "screen",
          title: (
            <View style={styles.logoContainer}>
              <Image
                style={styles.tinyLogo}
                source={require("../assets/tinyLogo.png")}
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: "#EE9322",
            height: 100,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="UpdateAbout"
        component={UpdateAboutSection}
        options={{ gestureEnabled: true, headerTitle: "Update Profile" }}
      />
      <Stack.Screen
        name="EventsFeed"
        component={Feed}
        options={{
          gestureEnabled: true,
          headerMode: "screen",
          title: (
            <View style={styles.logoContainer}>
              <Image
                style={styles.tinyLogo}
                source={require("../assets/tinyLogo.png")}
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: "#EE9322",
            height: 100,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Location"
        component={Location}
        options={{
          gestureEnabled: true,
          headerMode: "screen",
          title: (
            <View style={styles.logoContainer}>
              <Image
                style={styles.tinyLogo}
                source={require("../assets/tinyLogo.png")}
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: "#EE9322",
            height: 100,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="EventComments"
        component={Comments}
        options={{ gestureEnabled: true, headerTitle: "Local Events" }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  tinyLogo: {
    width: 120,
    height: 50,
  },
});
