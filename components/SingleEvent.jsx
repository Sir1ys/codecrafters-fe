import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import moment from "moment";

export default function SingleEvent({ route }) {
  const { event } = route.params;

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "700" }}>{event.short_description}</Text>
      <Image source={event.event_img} />
      <Text>{moment(event.date).format("DD/MM/YYYY, hh:mm")}</Text>
      <Text>{event.description}</Text>
      <Text>{event.location}</Text>
      <Text>Map:</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
