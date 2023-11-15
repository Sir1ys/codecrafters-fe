import React, { useState, useReducer, useCallback } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Input } from "./Input";
import { Feather } from "@expo/vector-icons";
import { reducer } from "../utils/formReducer";
import { validateInput } from "../utils/validation";
import { updateUser } from "../utils/users_api";
import { colors } from "../constants/colors";

export default function UpdateAboutSection({ route, navigation }) {
  const { user, setUser } = route.params;
  const [pictureUrl, setPictureUrl] = useState(user.picture_url);
  const [personsName, setPersonsName] = useState(user.name);

  const initialState = {
    inputValidities: {
      picture: false,
      name: false,
    },
    formIsValid: false,
  };
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangeHandler = useCallback(
    (inputId, inputValue) => {
      if (inputId === "picture") {
        setPictureUrl(inputValue);
      }
      if (inputId === "name") {
        setPersonsName(inputValue);
      }
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result });
    },
    [dispatchFormState]
  );

  const handleUpdate = () => {
    updateUser(user.user_id, {
      user: {
        profile_pic: pictureUrl,
        username: user.username,
        name: personsName,
      },
    }).then((response) => {
      setUser(response);
      navigation.goBack();
    });
  };

  return (
    <View style={styles.container}>
      <Input
        id="name"
        label="Name"
        icon="user"
        iconPack={Feather}
        autoCapitalize="none"
        onInputChanged={inputChangeHandler}
        errorText={formState.inputValidities["name"]}
      />
      <Input
        id="picture"
        label="Picture Url"
        icon="image"
        iconPack={Feather}
        autoCapitalize="none"
        onInputChanged={inputChangeHandler}
        errorText={formState.inputValidities["picture"]}
      />
      <View style={styles.buttonsContainer}>
        <Button
          title="Cancel"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Button
          title="Update"
          onPress={handleUpdate}
          disabled={!formState.formIsValid}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15, gap: 15 },
  label: {
    fontSize: 20,
    fontWeight: "500",
    color: "#034694",
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 5,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 20,
    margin: 20,
  },
  textButton: {
    fontSize: 13,
    lineHeight: 15,
    fontFamily: "poppins_bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
