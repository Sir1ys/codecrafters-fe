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
  const [location, setLocation] = useState("Set location ...");
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
      <View>
        <Text style={styles.header}>Add a Post</Text>
        <Text style={styles.text}>Location</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Location", {
              setLocation,
              setLatitude,
              setLongitude,
            });
          }}
        >
          <Text>{location}</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Event name:</Text>
        <TextInput
          autocapitalize="words"
          placeholder="e.g Trip to the Markets"
          value={titleText}
          onChangeText={(text) => {
            setTitleText(text);
          }}
        />

        <Text style={styles.text}>Event Image</Text>
        <TextInput
          placeholder="Insert Image Url "
          value={eventPicture}
          onChangeText={(text) => {
            setEventPicture(text);
          }}
        />

        <Text style={styles.text}>Description:</Text>
        <TextInput
          placeholder="e.g 'join us for a trip to the markets  "
          value={description}
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
        <View>
          <Text style={styles.text}> Event Date:</Text>
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

          <Text style={styles.text}> Event Time: </Text>
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
              mode="time"
              display="spinner"
              value={time}
              onChange={onTimeChange}
            />
          )}
        </View>
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
        >
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "regular",
    color: `${colors.black}`,
    flexWrap: "wrap",
    fontSize: 20,
    fontStyle: "italic",
    marginBottom: 5,
    paddingTop: 10,
    paddingBottom: 10,
  },
  header: {
    fontFamily: "poppins_bold",
    fontSize: 22,
    color: `${colors.orange}`,
    textAlign: "center",
    flexWrap: "wrap",
    padding: 5,
  },
});
