import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./MainNavigator";
import SignIn from "../components/SignIn";

export const AppNavigator = () => {
  const { userAuth } = useContext(UserContext);
  const [userAuthenticated] = userAuth;

  return (
    <NavigationContainer>
      {userAuthenticated && <MainNavigator />}
      {!userAuthenticated && <SignIn />}
    </NavigationContainer>
  );
};
