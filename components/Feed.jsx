import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { fetchEvents } from "../api";
import moment from "moment";

import SingleEvent from "./SingleEvent";

export const Feed = ({ navigation }) => {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    fetchEvents().then(({ events }) => {
      setEventList(events);
    });
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Feed</Text>
        <View style={styles.container}>
          {eventList.map((event) => {
            return (
              <View style={[styles.event, styles.shadowProp]}>
                <Text style={{ textAlign: "center", fontWeight: "700" }}>
                  {event.short_description}
                </Text>
                <Text>{event.location}</Text>
                <Text>{event.country}</Text>
                <Text>{moment(event.date).format("DD/MM/YYYY")}</Text>
                <Text>{event.description}</Text>
                <Button title="Save"></Button>
                <Button
                  title="see event"
                  onPress={() => navigation.navigate("SingleEvent", "event")}
                />
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  event: {
    borderWidth: 3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginVertical: 10,
    padding: 20,
  },
  shadowProp: {
    shadowColor: "#000000",
    shadowOffset: { width: -10, height: 20 },
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});
