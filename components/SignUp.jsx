import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Pressable,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
      <Text style={{ fontSize: 32, fontWeight: "600" }}>Sign Up form</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter email"
        onChangeText={(text) => {
          setEmailSignUp(text);
        }}
        value={emailSignUp}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Enter password"
        onChangeText={(text) => {
          setPasswordSignUp(text);
        }}
        value={passwordSignUp}
      />
      <Button
        style={styles.button}
        title="Sign Up"
        color={"green"}
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
