import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors } from "../constants/colors";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function AddEvent() {
  const [titleText, setTitleText] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [numAttending, setnumAttending] = useState("");

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
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
    <View>
      <Text style={styles.header}>Add a Post</Text>

      <Text style={styles.text}>Event name:</Text>
      <TextInput
        autocapitalize="words"
        placeholder="e.g Trip to the Markets"
        value={titleText}
        onChangeText={(text) => {
          setTitleText(text);
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
      <Text style={styles.text}>Location</Text>
      <TextInput
        placeholder="Location"
        autoComplete="postal-address-extended"
        value={location}
        onChangeText={(text) => {
          setLocation(text);
        }}
      />

      <Text style={styles.text}>Max number of attendees:</Text>
      <TextInput
        placeholder="e.g. 12"
        keyboardType="numeric"
        value={numAttending.toString()}
        onChangeText={(numeric) => {
          setnumAttending(parseInt(numeric) || 0);
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
    </View>
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
  },
  header: {
    fontFamily: "poppins_bold",
    fontSize: 22,
    color: `${colors.orange}`,
    textAlign: "center",
    flexWrap: "wrap",
  },
});
