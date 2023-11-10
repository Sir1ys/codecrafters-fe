import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function Button({styles, text, handleCLick}) {
  return (
    <TouchableOpacity
      onPress={handleCLick}
      style={styles.button}
    >
      <Text style={styles.text}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
