import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { colors } from "../constants/colors";

export const SubmitButton = (props) => {
  const enabledBgColor = props.color || colors.primary;
  const disabledBgColor = colors.lightGrey;
  const bgColor = props.disabled ? disabledBgColor : enabledBgColor;

  return (
    <TouchableOpacity
      onPress={props.disabled ? () => {} : props.onPress}
      style={{ ...styles.button, ...{ backgroundColor: bgColor } }}
    >
      <Text
        style={{
          color: props.disabled ? colors.grey : "white",
          fontFamily: "poppins_bold",
        }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    fontFamily: "poppins_bold",
  },
});
