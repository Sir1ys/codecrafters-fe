import React, { useContext } from "react";
import { View, Text } from "react-native";
import { SubmitButton } from "./SubmitButton";
import { UserContext } from "../contexts/UserContext";

export const Profile = () => {
  const { userState, userAuth } = useContext(UserContext);
  const setUser = userState[1];
  const setUserAuthenticated = userAuth[1];

  const handleLogOut = () => {
    setUser({});
    setUserAuthenticated(false);
  };

  return (
    <View>
      <Text>This is a Profile!!</Text>
      <SubmitButton
        disabled={false}
        text="Log out"
        onPress={() => handleLogOut()}
      />
    </View>
  );
};
