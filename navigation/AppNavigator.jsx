import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./MainNavigator";
import LoginPage from "../components/LoginPage";

export const AppNavigator = () => {
  const isAuth = false;

  return (
    <NavigationContainer>
      {isAuth && <MainNavigator />}
      {!isAuth && <LoginPage />}
    </NavigationContainer>
  );
};
