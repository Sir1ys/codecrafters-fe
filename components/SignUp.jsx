import React, { useState, useContext } from "react";
import { View, Text } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Input } from "./Input";
import { SubmitButton } from "./SubmitButton";
import { Feather } from "@expo/vector-icons";
import { colors } from "../constants/colors";
import { UserContext } from "../contexts/UserContext";

export default function SignUp() {
  const [emailSignUp, setEmailSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [username, setUsername] = useState("");
  const { userState, userAuth } = useContext(UserContext);
  const setUser = userState[1];
  const setUserAuthenticated = userAuth[1];

  const handleSubmit = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, emailSignUp, passwordSignUp)
      .then(({ user }) => {
        const { email, uid } = user;
        const newUser = { email, uid };
        setUser(newUser);
        setUserAuthenticated(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <View id="signUpForm" style={{ display: "none" }}>
      <Text
        style={{
          fontSize: 32,
          fontWeight: "600",
          textAlign: "center",
          color: `${colors.blue}`,
        }}
      >
        Sign Up
      </Text>

      <Input
        label="Email"
        icon="mail"
        iconPack={Feather}
        state={emailSignUp}
        setState={setEmailSignUp}
      />
      <Input
        label="Username"
        icon="user"
        iconPack={Feather}
        state={username}
        setState={setUsername}
      />
      <Input
        label="Password"
        icon="lock"
        iconPack={Feather}
        state={passwordSignUp}
        setState={setPasswordSignUp}
      />

      <SubmitButton
        disabled={false}
        text="Sign Up"
        onPress={() => handleSubmit()}
      />
    </View>
  );
}
