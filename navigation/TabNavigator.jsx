import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { Feed } from "../components/Feed";
import { Profile } from "../components/Profile";
import { colors } from "../constants/colors";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Messages"
        component={Feed}
        options={{
          headerMode: "none",
          tabBarLabel: "Messages",
          tabBarIcon: ({ color, size }) => {
            return (
              <Feather name="message-circle" size={24} color={colors.orange} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Feed}
        options={{
          tabBarLabel: "Feed",
          tabBarIcon: ({ color, size }) => {
            return <Feather name="menu" size={24} color={colors.orange} />;
          },
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
        }}
      />
    </Tab.Navigator>
  );
};
