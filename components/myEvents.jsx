import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import { Feather } from "@expo/vector-icons";

export default function MyEvents() {
  return (
    <View>
      <Text style={styles.header}>My Events</Text>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Text style={styles.buttonText}>Save </Text>
            <Feather name="bookmark" size={18} color="white" />
          </View>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() =>
            navigation.navigate("SingleEvent", {
              event: event,
            })
          }
        >
          <Text style={styles.buttonText}> See Event</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 29,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    paddingBottom: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 13,
    lineHeight: 15,
    fontWeight: "poppins_bold",
    letterSpacing: 0.25,
    color: "white",
  },
  header: {
    fontFamily: "poppins_bold",
    fontSize: 22,
    color: `${colors.orange}`,
    paddingTop: 10,
    textAlign: "center",
  },
});
