import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Input } from "./Input";
import { SubmitButton } from "./SubmitButton";
import { Feather } from "@expo/vector-icons";
import { colors } from "../constants/colors";

export default function SignUp() {
  const [emailSignUp, setEmailSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");

  const handleSubmit = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, emailSignUp, passwordSignUp)
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
    signUpForm.style.display = "none";
    signInForm.style.display = "flex";
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
      <Pressable
        onPress={() => {
          toggleForm();
        }}
      >
        <Text>Already have an account? Click here.</Text>
      </Pressable>
    </View>
  );
}
