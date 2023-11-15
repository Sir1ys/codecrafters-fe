import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { deleteAttending, fetchAttending } from "../api";
import { UserContext } from "../contexts/UserContext";
import { colors } from "../constants/colors";
import { Feather } from "@expo/vector-icons";
import moment from "moment";

export default function Attending({ navigation }) {
  const { userState } = useContext(UserContext);
  const [user, setUser] = userState;
  const [eventsAttending, setEventsAttending] = useState([]);

  useEffect(() => {
    fetchAttending(user.user_id).then((result) => {
      setEventsAttending(result);
    });
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Events You're Attending</Text>
        </View>
        <View>
          {eventsAttending.map((event) => (
            <View style={styles.cardContainer} key={event.event_id}>
              <View style={styles.card}>
                <Text style={styles.title}>{event.short_description}</Text>
                <Image
                  source={{ uri: event.event_picture }}
                  style={styles.eventImage}
                />
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
                      deleteAttending(event.event_id, user.user_id).then(() => {
                        setEventsAttending((prevEvents) => {
                          return prevEvents.filter(
                            (oldEvent) => oldEvent.event_id !== event.event_id
                          );
                        });
                      });
                    }}
                    style={styles.cancelButton}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "white",
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
    marginRight: 10,
    marginLeft: 10,
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
  text: {
    fontFamily: "regular",
    color: `${colors.black}`,
    flexWrap: "wrap",
    fontSize: 12,
    fontStyle: "italic",
    marginBottom: 5,
  },
  header: {
    fontFamily: "poppins",
    fontSize: 22,
    color: `${colors.orange}`,
    textAlign: "center",
    width: 410,
    flexWrap: "wrap",
  },
  date: {
    fontFamily: "poppins",
    color: `${colors.orange}`,
    fontSize: 12,
  },
  body: {
    fontFamily: "regular",
    color: `${colors.black}`,
    flexWrap: "wrap",
    fontSize: 13,
    fontStyle: "normal",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 13,
    lineHeight: 15,
    fontFamily: "poppins",
    letterSpacing: 0.25,
    color: "white",
  },
  eventImage: {
    width: 350,
    height: 150,
    alignSelf: "center",
    marginVertical: 10,
  },
  title: {
    fontFamily: "poppins",
    fontSize: 15,
    alignSelf: "center",
    textAlign: "center",
  },
  cardContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderRadius: 5,
    marginVertical: 10,
    padding: 20,
    width: "90%",
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
});
