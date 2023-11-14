import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors } from "../constants/colors";
import { UserContext } from "../contexts/UserContext";
import { postEvent } from "../utils/events_api";

export default function AddEvent({ navigation }) {
  const { userState } = useContext(UserContext);
  const [user, setUser] = userState;
  const { user_id } = user;
  const [titleText, setTitleText] = useState("");
  const [location, setLocation] = useState("Click to add location");
  const [description, setDescription] = useState("");
  const [eventPicture, setEventPicture] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === "ios");
    setTime(currentTime);
  };

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (time) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return time.toLocaleTimeString("en-US", options);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Add Event</Text>
        <Text style={styles.title}>Location</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Location", {
              setLocation,
              setLatitude,
              setLongitude,
            });
          }}
          style={styles.locationContainer}
        >
          <Text style={styles.locationText}>{location}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Event name:</Text>
        <TextInput
          style={styles.text}
          autocapitalize="words"
          placeholder="e.g Trip to the Markets"
          value={titleText}
          onChangeText={(text) => {
            setTitleText(text);
          }}
        />
        <Text style={styles.title}>Event Image</Text>
        <TextInput
          style={styles.text}
          placeholder="Insert Image Url "
          value={eventPicture}
          onChangeText={(text) => {
            setEventPicture(text);
          }}
        />
        <Text style={styles.title}>Description:</Text>
        <TextInput
          style={styles.text}
          placeholder="e.g 'join us for a trip to the markets  "
          value={description}
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
        <View>
          <Text style={styles.title}> Event Date:</Text>
          {!showDatePicker && (
            <Pressable onPress={toggleDatePicker}>
              <TextInput
                style={styles.text}
                placeholder="Saturday Jan 01 2023"
                value={formatDate(date)}
                editable={false}
              />
            </Pressable>
          )}

          {showDatePicker && (
            <DateTimePicker
              mode="date"
              display="calendar"
              value={date}
              onChange={onDateChange}
            />
          )}

          <Text style={styles.title}> Event Time: </Text>
          {!showTimePicker && (
            <Pressable onPress={toggleTimePicker}>
              <TextInput
                style={styles.text}
                placeholder="12:00 PM"
                value={formatTime(time)}
                editable={false}
              />
            </Pressable>
          )}

          {showTimePicker && (
            <DateTimePicker
              style={styles.text}
              mode="time"
              display="spinner"
              value={time}
              onChange={onTimeChange}
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              postEvent({
                creator_id: user_id,
                date,
                short_description: titleText,
                description: description,
                location,
                latitude,
                longitude,
                event_picture: eventPicture,
              }).then((event) => {
                console.log(event);
                navigation
                  .navigate("SingleEvent", { event })
                  .catch((err) => console.log(err));
              });
            }}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "regular",
    color: colors.black,
    flexWrap: "wrap",
    fontSize: 15,
    fontStyle: "italic",
    marginBottom: 5,
  },
  header: {
    fontFamily: "poppins_bold",
    fontSize: 22,
    color: `${colors.orange}`,
    textAlign: "center",
    flexWrap: "wrap",
    padding: 5,
  },
  title: {
    fontFamily: "poppins_bold",
    color: `${colors.lightBlack}`,
    fontSize: 15,
    alignSelf: "center",
    textAlign: "center",
  },
  container: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginVertical: 10,
    padding: 20,
    backgroundColor: `${colors.white}`,
    shadowColor: "#219C90",
  },
  title: { fontFamily: "poppins_bold", color: colors.lightBlack, fontSize: 15 },

  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
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
  submitButtonText: {
    fontSize: 13,
    lineHeight: 15,
    fontWeight: "poppins_bold",
    letterSpacing: 0.25,
    color: "white",
  },

  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  locationContainer: {
    backgroundColor: colors.primary,
    padding: 2,
    borderRadius: 8,
    marginTop: 5,
    alignItems: "center",
  },
  locationText: {
    fontFamily: "regular",
    color: colors.white,
    fontSize: 12,
    textAlign: "center",
  },
});
