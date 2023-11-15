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
import { Feather, FontAwesome } from "@expo/vector-icons";
import {
  attendEvent,
  fetchAttending,
  saveEvent,
  fetchSavedEvents,
} from "../api";
import { UserContext } from "../contexts/UserContext";
import { getUserTrips } from "../utils/users_api";
import MapView, { Marker } from "react-native-maps";
import { HeaderBackButton } from "@react-navigation/elements";

export default function SingleEvent({ navigation, route }) {
  const { event, goHome } = route.params;
  const { userState } = useContext(UserContext);
  const [user, setUser] = userState;
  const [isAttendDisabled, setIsAttendDisabled] = useState(false);
  const [isSavedDisabled, setIsSavedDisabled] = useState(false);
  const [mapLat, setMapLat] = useState(event.latitude);
  const [mapLong, setMapLong] = useState(event.longitude);

  const handleAttend = () => {
    attendEvent(event.event_id, user.user_id).then((result) => {
      if (result.status === 201) {
        navigation.goBack();
      }
    });
  };

  const handleSave = () => {
    saveEvent(event.event_id, user.user_id).then((result) => {
      if (result.status === 201) {
        navigation.goBack();
      }
    });
  };

  useEffect(() => {
    if (goHome) {
      navigation.setOptions({
        headerShown: true,
        headerLeft: (props) => (
          <HeaderBackButton
            {...props}
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
        ),
      });
    }
    fetchAttending(user.user_id).then((result) => {
      result.map((fetchedEvent) => {
        if (fetchedEvent.event_id === event.event_id) {
          setIsAttendDisabled(true);
        }
      });
    });
  }, []);

  useEffect(() => {
    fetchSavedEvents(user.user_id).then((result) => {
      result.data.eventsSaved.map((fetchedEvent) => {
        if (fetchedEvent.event_id === event.event_id) {
          setIsSavedDisabled(true);
        }
      });
    });
  }, []);

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
          <Pressable
            style={isAttendDisabled ? styles.disabled : styles.button}
            disabled={isAttendDisabled}
          >
            <Text style={styles.buttonText} onPress={handleAttend}>
              Attend
            </Text>
          </Pressable>
          <Pressable
            onPress={handleSave}
            style={isSavedDisabled ? styles.disabled : styles.button}
            disabled={isSavedDisabled}
          >
            <Text style={styles.buttonText}>Save for later</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate("EventComments", {
                user,
                eventId: event.event_id,
              });
            }}
          >
            <FontAwesome name="comment" size={24} color="white" />
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
  disabled: {
    color: colors.grey,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 29,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: colors.lightGrey,
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
    color: colors.black,
    flexWrap: "wrap",
    fontSize: 12,
    fontStyle: "italic",
    marginBottom: 5,
  },
  header: {
    fontFamily: "poppins",
    fontSize: 22,
    color: colors.orange,
    textAlign: "center",
    width: 410,
    flexWrap: "wrap",
  },
  date: {
    fontFamily: "poppins",
    color: colors.orange,
    fontSize: 12,
  },
  body: {
    fontFamily: "regular",
    color: colors.black,
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
  map: {
    width: 385,
    height: 330,
    alignSelf: "center",
    marginVertical: 10,
  },
});
