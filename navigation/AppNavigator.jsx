import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./MainNavigator";
import SignIn from "../components/SignIn";

export const AppNavigator = () => {
  const isAuth = true;

  return (
    <NavigationContainer>
      {isAuth && <MainNavigator />}
      {!isAuth && <SignIn />}
    </NavigationContainer>
  );
};
