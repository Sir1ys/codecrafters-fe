import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export const Feed = (props) => {
  return (
    <View style={styles.container}>
      <Text>This is a home page</Text>
      <Button
        title="Go to card"
        onPress={() => {
          props.navigation.navigate("Card");
        }}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
