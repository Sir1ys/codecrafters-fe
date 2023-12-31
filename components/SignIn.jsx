import React, { useState, useContext, useReducer, useCallback } from "react";
import { View, Text, Image } from "react-native";
import { getAuth, getApp, signInWithEmailAndPassword } from "firebase/auth";
import { Feather } from "@expo/vector-icons";
import { Input } from "./Input";
import { SubmitButton } from "./SubmitButton";
import { colors } from "../constants/colors";
import { UserContext } from "../contexts/UserContext";
import { reducer } from "../utils/formReducer";
import { validateInput } from "../utils/validation";
import { getUserById } from "../utils/users_api";
import {app} from "../firebase";

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
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, emailSignIn, passwordSignIn)
      .then(({ user }) => {
        const { uid } = user;
        return getUserById(uid);
      })
      .then((signedInUser) => {
        setUser(signedInUser);
        setUserAuthenticated(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const demoSignIn = () => {
    setUser({
      user_id: "1",
      username: "butter_bridge",
      name: "Jonny",
      profile_pic:
        "https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg",
      created_at: "2022-12-01T00:00:00.000Z",
      email: "fakeemail1@gmrail.com",
    });
    setUserAuthenticated(true);
  };

  return (
    <View id="signInForm">
      <Image
        source={require("../assets/Logo.png")}
        style={{ alignSelf: "center" }}
      />
      <Text
        style={{
          fontSize: 32,
          fontWeight: "600",
          textAlign: "center",
          color: colors.orange,
          fontFamily: "poppins",
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
        style={{ color: colors.orange }}
      />
      <SubmitButton
        disabled={false}
        text="Demo Sign in"
        onPress={() => demoSignIn()}
      />
    </View>
  );
}
