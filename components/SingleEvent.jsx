import React, { useContext, useState } from "react";
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
import { attendEvent } from "../api";
import { UserContext } from "../contexts/UserContext";
import MapView, { Marker } from "react-native-maps";

export default function SingleEvent({ route }) {
  const { event } = route.params;
  const { userState } = useContext(UserContext);
  const [user, setUser] = userState;
  const [mapLat, setMapLat] = useState(event.latitude);
  const [mapLong, setMapLong] = useState(event.longitude);

  const locationData = [
    {
      latitude: event.latitude,
      longitude: event.longitude,
      weight: 1,
    },
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>{event.short_description}</Text>

        <Image src={event.event_picture} style={styles.eventImage} />
        <Text style={styles.text}>
          <Feather name="map-pin" size={18} color={colors.blue} padding={20} />
          {event.location}
        </Text>
        <Text style={styles.date}>
          {moment(event.date).format("dddd Do MMMM YYYY ")}
        </Text>
        <Text style={styles.date}>{moment(event.date).format("h:mm a")}</Text>
        <Text style={styles.body}>{event.description}</Text>

        <Text>Map:</Text>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button}>
            <Text
              style={styles.buttonText}
              onPress={attendEvent(event.event_id, user.user_id)}
            >
              Attend
            </Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Save for later</Text>
          </Pressable>
        </View>

        <MapView
          style={styles.map}
          initialRegion={{
            latitude: mapLat,
            longitude: mapLong,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {locationData.map((data, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: data.latitude,
                longitude: data.longitude,
              }}
              title={event.short_description}
              description={event.location}
            />
          ))}
        </MapView>
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
    justifyContent: "space-between",
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
  map: {
    width: 385,
    height: 330,
    alignSelf: "center",
    marginVertical: 10,
  },
});
