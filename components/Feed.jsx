import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { fetchEvents } from "../api";
import moment from "moment";
import { colors } from "../constants/colors";
import { Feather } from "@expo/vector-icons";

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
        <View>
          <Text style={styles.header}>Your Feed</Text>
          <Pressable style={styles.button}>
            <Feather name="plus" size={24} color="black" />
          </Pressable>
        </View>
        <View style={styles.container}>
          {eventList.map((event) => {
            return (
              <View
                style={[styles.event, styles.shadowProp]}
                key={event.event_id}
              >
                <Text style={styles.title}>{event.short_description}</Text>
                <Image src={event.event_picture} style={styles.eventImage} />
                <Text style={styles.text}>
                  <Feather
                    name="map-pin"
                    size={18}
                    color={colors.blue}
                    padding={20}
                  />
                  {event.location}
                </Text>
                <Text style={styles.text}>{event.country}</Text>
                <Text style={styles.date}>
                  {moment(event.date).format("dddd Do MMMM YYYY ")}
                </Text>
                <Text style={styles.date}>
                  {moment(event.date).format("h:mm a")}
                </Text>
                <Text style={styles.body}>{event.description}</Text>
                <View style={styles.buttonContainer}>
                  <Pressable style={styles.button}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
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
    backgroundColor: `${colors.white}`,
  },
  event: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginVertical: 10,
    padding: 20,
    backgroundColor: `${colors.white}`,
    shadowColor: "#219C90",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 1,
    shadowRadius: 13,
    elevation: 24,
  },

  shadowProp: {
    shadowColor: "#219C90",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 13,
    shadowRadius: 23,
    elevation: 30,
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
  header: {
    fontFamily: "poppins_bold",
    fontSize: 22,
    color: `${colors.orange}`,
    paddingTop: 10,
  },
  buttonText: {
    fontSize: 13,
    lineHeight: 15,
    fontWeight: "poppins_bold",
    letterSpacing: 0.25,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  title: {
    fontFamily: "poppins_bold",
    color: `${colors.lightBlack}`,
    fontSize: 15,
    alignSelf: "center",
    textAlign: "center",
  },
  text: {
    fontFamily: "regular",
    color: `${colors.black}`,
    flexWrap: "wrap",
    fontSize: 12,
    fontStyle: "italic",
    marginBottom: 5,
  },
  body: {
    fontFamily: "regular",
    color: `${colors.black}`,
    flexWrap: "wrap",
    fontSize: 12,
    fontStyle: "normal",
  },
  date: {
    fontFamily: "poppins_bold",
    color: `${colors.orange}`,
    fontSize: 12,
  },
  eventImage: {
    width: 250,
    height: 150,
    alignSelf: "center",
    marginVertical: 10,
  },
});
