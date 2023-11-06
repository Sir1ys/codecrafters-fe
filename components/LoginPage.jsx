import React from "react";
import { View } from "react-native";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function LoginPage() {
  return (
    <View>
      <SignIn />
      <SignUp />
    </View>
  );
}
