import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Feather } from "@expo/vector-icons";
import { Input } from "./Input";
import { SubmitButton } from "./SubmitButton";
import { colors } from "../constants/colors";

export default function SignIn() {
  const [emailSignIn, setEmailSignIn] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");

  const handleSubmit = (e) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, emailSignIn, passwordSignIn)
      .then(({ user }) => {
        const { email, uid } = user;
        const newUser = { email, uid };
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const toggleForm = () => {
    const signUpForm = document.getElementById("signUpForm");
    const signInForm = document.getElementById("signInForm");
    signUpForm.style.display = "flex";
    signInForm.style.display = "none";
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
        Login
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
      <Pressable
        onPress={() => {
          toggleForm();
        }}
      >
        <Text>Don't have an account? Click here.</Text>
      </Pressable>
    </View>
  );
}
