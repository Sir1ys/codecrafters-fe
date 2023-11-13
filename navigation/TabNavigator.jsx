import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Feed } from "../components/Feed";
import { Profile } from "../components/Profile";
import { colors } from "../constants/colors";
import TripsPage from "../components/TripsPage";
import MyEvents from "../components/MyEvents";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Trips"
        component={TripsPage}
        options={{
          headerMode: "none",
          tabBarLabel: "Trips",
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialIcons
                name="airplanemode-active"
                size={24}
                color={colors.orange}
              />
            );
          },
          tabBarInactiveTintColor: colors.lightGrey,
          tabBarActiveTintColor: colors.blue,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => {
            return <Feather name="user" size={24} color={colors.orange} />;
          },
          tabBarInactiveTintColor: colors.lightGrey,
          tabBarActiveTintColor: colors.blue,
        }}
      />
      <Tab.Screen
        name="My Events"
        component={MyEvents}
        options={{
          tabBarLabel: "My Events",
          tabBarIcon: ({ color, size }) => {
            return <Feather name="calendar" size={24} color={colors.orange} />;
          },
          tabBarInactiveTintColor: colors.lightGrey,
          tabBarActiveTintColor: colors.blue,
        }}
      />
    </Tab.Navigator>
  );
};
