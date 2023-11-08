import React, { useState, useContext, useReducer, useCallback } from "react";
import { View, Text } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Feather } from "@expo/vector-icons";
import { Input } from "./Input";
import { SubmitButton } from "./SubmitButton";
import { colors } from "../constants/colors";
import { UserContext } from "../contexts/UserContext";
import { reducer } from "../utils/formReducer";
import { validateInput } from "../utils/validation";

export default function SignIn() {
  const [emailSignIn, setEmailSignIn] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");
  const { userState, userAuth } = useContext(UserContext);
  const setUser = userState[1];
  const setUserAuthenticated = userAuth[1];

  const initialState = {
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  };

  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangeHandler = useCallback(
    (inputId, inputValue) => {
      if (inputId === "email") {
        setEmailSignIn(inputValue);
      }
      if (inputId === "password") {
        setPasswordSignIn(inputValue);
      }
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result });
    },
    [dispatchFormState]
  );

  const handleSubmit = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, emailSignIn, passwordSignIn)
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
        id="email"
        label="Email"
        icon="mail"
        iconPack={Feather}
        autoCapitalize="none"
        onInputChanged={inputChangeHandler}
        errorText={formState.inputValidities["email"]}
      />
      <Input
        id="password"
        label="Password"
        icon="lock"
        iconPack={Feather}
        secureTextEntry
        autoCapitalize="none"
        onInputChanged={inputChangeHandler}
        errorText={formState.inputValidities["password"]}
      />
      <SubmitButton
        disabled={!formState.formIsValid}
        text="Sign In"
        onPress={() => handleSubmit()}
      />
    </View>
  );
}
