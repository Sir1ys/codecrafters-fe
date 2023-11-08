import React, { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function LoginPage() {
  const [signIn, setSignIn] = useState(false);
  return (
    <View>
      {signIn ? <SignIn /> : <SignUp />}
      <TouchableOpacity
        style={styles.switcher}
        onPress={() => {
          setSignIn((prevState) => {
            return !prevState;
          });
        }}
      >
        <Text>
          {signIn ? (
            <Text>Don't have an account? Sign up!</Text>
          ) : (
            <Text>Already have an account? Sign in!</Text>
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  switcher: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    fontFamily: "regular",
  },
});
