import React, { useState, useContext } from "react";
import { View, Text } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Feather } from "@expo/vector-icons";
import { Input } from "./Input";
import { SubmitButton } from "./SubmitButton";
import { colors } from "../constants/colors";
import { UserContext } from "../contexts/UserContext";

export default function SignIn() {
  const [emailSignIn, setEmailSignIn] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");
  const { userState, userAuth } = useContext(UserContext);
  const setUser = userState[1];
  const setUserAuthenticated = userAuth[1];

  const handleSubmit = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, emailSignIn, passwordSignIn)
      .then(({ user }) => {
        const { email, uid } = user;
        const newUser = { email, uid };
        setUser(newUser)
        setUserAuthenticated(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <View id="signInForm">
      <Text
        style={{
          fontSize: 32,
          fontWeight: "600",
          textAlign: "center",
          color: `${colors.blue}`,
        }}
      >
        Sign In
      </Text>
      <Input
        label="Email"
        icon="mail"
        iconPack={Feather}
        state={emailSignIn}
        setState={setEmailSignIn}
      />
      <Input
        label="Password"
        icon="lock"
        iconPack={Feather}
        state={passwordSignIn}
        setState={setPasswordSignIn}
      />
      <SubmitButton
        disabled={false}
        text="Sign In"
        onPress={() => handleSubmit()}
      />
    </View>
  );
}
