import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Pressable,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
      <Text style={{ fontSize: 32, fontWeight: "600" }}>Sign in form</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter email"
        onChangeText={(text) => {
          setEmailSignIn(text);
        }}
        value={emailSignIn}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Enter password"
        onChangeText={(text) => {
          setPasswordSignIn(text);
        }}
        value={passwordSignIn}
      />
      <Button
        style={styles.button}
        title="Sign In"
        color={"green"}
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
const styles = StyleSheet.create({
  textInput: {
    fontSize: 16,
    borderBottomWidth: 2,
    borderColor: "rgb(2, 83, 145)",
    margin: 10,
    color: "grey",
    width: 250,
  },
});
