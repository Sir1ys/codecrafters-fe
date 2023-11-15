import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { colors } from "../constants/colors";
import { Feather } from "@expo/vector-icons";
import { deleteCreatedEvent, fetchEvents } from "../api";
import { UserContext } from "../contexts/UserContext";
import moment from "moment";

export default function MyEvents({ navigation }) {
  const [events, setEvents] = useState([]);
  const { userState } = useContext(UserContext);
  const [user, setUser] = userState;

  useEffect(() => {
    fetchEvents().then((result) => {
      const mappedUserEvents = result.events.filter((event) => {
        return event.creator_id === user.user_id;
      });
      setEvents(mappedUserEvents);
    });
  }, [events]);

  return (
    <ScrollView>
      <Text style={styles.header}>My Events</Text>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("SavedEvents")}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Text style={styles.buttonText}>Saved Events </Text>
            <Feather name="bookmark" size={18} color="white" />
          </View>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Attending")}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Text style={styles.buttonText}>Attending</Text>
            <Feather name="check" size={18} color="white" />
          </View>
        </Pressable>
      </View>
      <View>
        {events.length === 0 ? (
          <Text style={styles.header}>You have no events</Text>
        ) : (
          events.map((event) => {
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
                  <Pressable
                    style={styles.button}
                    onPress={() =>
                      navigation.navigate("SingleEvent", {
                        event: event,
                      })
                    }
                  >
                    <Text style={styles.buttonText}>See Event</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      deleteCreatedEvent(event.event_id, user.user_id);
                    }}
                    style={styles.cancelButton}
                  >
                    <Text style={styles.buttonText}>Delete Event</Text>
                  </Pressable>
                </View>
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
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
    fontFamily: "poppins",
    letterSpacing: 0.25,
    color: "white",
  },
  header: {
    fontFamily: "poppins",
    fontSize: 22,
    color: `${colors.orange}`,
    paddingTop: 10,
    textAlign: "center",
  },
  eventImage: {
    width: 350,
    height: 150,
    alignSelf: "center",
    marginVertical: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: `${colors.white}`,
  },
  text: {
    fontFamily: "regular",
    flexWrap: "wrap",
    fontSize: 12,
    fontStyle: "italic",
    marginBottom: 5,
  },
  date: {
    fontFamily: "poppins",
    color: `${colors.orange}`,
    fontSize: 12,
  },
  body: {
    fontFamily: "regular",
    // color: `${colors.black}`,
    flexWrap: "wrap",
    fontSize: 13,
    fontStyle: "normal",
  },
  event: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderRadius: 5,
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
  title: {
    fontFamily: "poppins",
    color: `${colors.lightBlack}`,
    fontSize: 15,
    alignSelf: "center",
    textAlign: "center",
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
  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 29,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: colors.orange,
    borderWidth: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    paddingBottom: 10,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
  },
});
