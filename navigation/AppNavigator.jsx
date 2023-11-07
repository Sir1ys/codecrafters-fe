import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./MainNavigator";
import LoginPage from "../components/LoginPage";

export const AppNavigator = () => {
  const { userAuth } = useContext(UserContext);
  const [userAuthenticated] = userAuth;

  return (
    <NavigationContainer>
      {userAuthenticated && <MainNavigator />}
      {!userAuthenticated && <LoginPage />}
    </NavigationContainer>
  );
};
