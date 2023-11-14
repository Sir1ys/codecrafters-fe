import { attendEvent } from "../api";
import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import moment from "moment";
import { colors } from "../constants/colors";
import { Feather } from "@expo/vector-icons";
import { fetchSavedEvents } from "../api";
import { UserContext } from "../contexts/UserContext";

export default function SavedEvents({navigation} ) {
    const [fetchedSavedEvents, setFetchedSavedEvents] = useState([]);
    const { userState } = useContext(UserContext);
    const [user, setUser] = userState;

    const handleAttend= () => {
        attendEvent(event.event_id, user.user_id)
      }

      useEffect(() => {
        fetchSavedEvents(user.user_id).then((result) => {
          setFetchedSavedEvents(result.data.eventsSaved);
      })},[])
    return (
        <ScrollView>
          <View style={styles.container}>
            <View>
              <Text style={styles.header}>Saved Events</Text>
            </View>
            <View style={styles.container}>
              {fetchedSavedEvents.map((event) => {
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
                        <Text style={styles.buttonText} onPress={() =>
                      navigation.navigate("SingleEvent", {
                        event: event,
                      })
                    }>See Event</Text>
                      </Pressable>
                      <Pressable>
                      <Text
              style={styles.buttonText}
              onPress={handleAttend}
            >
              Attend
            </Text>
                      </Pressable>
                    </View>
                  </View>
                );
              })}
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
      text: {
        fontFamily: "regular",
        color: `${colors.black}`,
        flexWrap: "wrap",
        fontSize: 12,
        fontStyle: "italic",
        marginBottom: 5,
      },
      header: {
        fontFamily: "poppins_bold",
        fontSize: 22,
        color: `${colors.orange}`,
        textAlign: "center",
        width: 410,
        flexWrap: "wrap",
      },
      date: {
        fontFamily: "poppins_bold",
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
        justifyContent: "center",
        marginTop: 10,
      },
      buttonText: {
        fontSize: 13,
        lineHeight: 15,
        fontWeight: "poppins_bold",
        letterSpacing: 0.25,
        color: "white",
      },
      eventImage: {
        width: 350,
        height: 150,
        alignSelf: "center",
        marginVertical: 10,
      },
    });
    