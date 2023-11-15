import React, { useState, useContext, useCallback, useReducer } from "react";
import { View, Text, Image } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Input } from "./Input";
import { SubmitButton } from "./SubmitButton";
import { Feather } from "@expo/vector-icons";
import { colors } from "../constants/colors";
import { UserContext } from "../contexts/UserContext";
import { validateInput } from "../utils/validation";
import { reducer } from "../utils/formReducer";
import { createUser } from "../utils/users_api";
import { dateFromTimestamp } from "../utils/dates";

export default function SignUp() {
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [emailSignUp, setEmailSignUp] = useState("");
  const [usernameSignUp, setUsernameSignUp] = useState("");
  const { userState, userAuth } = useContext(UserContext);
  const setUser = userState[1];
  const setUserAuthenticated = userAuth[1];

  const initialState = {
    inputValidities: {
      email: false,
      password: false,
      username: false,
    },
    formIsValid: false,
  };

  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangeHandler = useCallback(
    (inputId, inputValue) => {
      if (inputId === "email") {
        setEmailSignUp(inputValue);
      }
      if (inputId === "password") {
        setPasswordSignUp(inputValue);
      }
      if (inputId === "username") {
        setUsernameSignUp(inputValue);
      }
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result });
    },
    [dispatchFormState]
  );

  const handleSubmit = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, emailSignUp, passwordSignUp)
      .then(({ user }) => {
        const { email, uid } = user;
        const createdAt = user.metadata.createdAt;
        return createUser({
          user: {
            email,
            user_id: uid,
            created_at: dateFromTimestamp(createdAt),
            name: usernameSignUp,
            username: usernameSignUp,
            profile_pic: "https://i.stack.imgur.com/34AD2.jpg",
          },
        });
      })
      .then((newUser) => {
        setUser(newUser);
        setUserAuthenticated(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <View id="signUpForm">
      <Image
        source={require("../assets/Logo.png")}
        style={{ alignSelf: "center" }}
      />
      <Text
        style={{
          fontSize: 32,
          fontWeight: "600",
          textAlign: "center",
          color: `${colors.red}`,
          fontFamily: "poppins",
        }}
      >
        Sign Up
      </Text>

      <Input
        id="email"
        style={{
          fontFamily: "regular",
        }}
        label="Email"
        icon="mail"
        iconPack={Feather}
        autoCapitalize="none"
        onInputChanged={inputChangeHandler}
        errorText={formState.inputValidities["email"]}
      />
      <Input
        id="username"
        label="Username"
        icon="user"
        iconPack={Feather}
        autoCapitalize="none"
        onInputChanged={inputChangeHandler}
        errorText={formState.inputValidities["username"]}
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
        text="Sign Up"
        onPress={() => handleSubmit()}
      />
    </View>
  );
}
