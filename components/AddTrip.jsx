import React, { useState, useContext, useEffect } from "react";
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
import { fetchLatLong, postTrip } from "../api";
import { UserContext } from "../contexts/UserContext";

export default function AddTrip({ navigation, route }) {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const { userState } = useContext(UserContext);
  const [user, setUser] = userState;
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);

  const toggleFromDatePicker = () => {
    setShowFromDatePicker(!showFromDatePicker);
  };

  const toggleToDatePicker = () => {
    setShowToDatePicker(!showToDatePicker);
  };

  const onFromDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    setShowFromDatePicker(Platform.OS === "ios");
    setFromDate(currentDate);
  };

  const onToDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || toDate;
    setShowToDatePicker(Platform.OS === "ios");
    setToDate(currentDate);
  };

  const formatFromDate = (fromDate) => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return fromDate.toLocaleDateString("en-US", options);
  };

  const formatToDate = (toDate) => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return toDate.toLocaleDateString("en-US", options);
  };

  const handleSubmit = () => {
    return fetchLatLong(city)
      .then((coordinates) => {
        return postTrip(
          user.user_id,
          fromDate,
          toDate,
          country,
          city,
          coordinates[0],
          coordinates[1]
        );
      })
      .then(() => {
        navigation.navigate("Home");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add a Trip</Text>

      <Text style={styles.title}>Country</Text>
      <TextInput
        autocapitalize="words"
        placeholder="e.g Spain"
        value={country}
        onChangeText={(text) => {
          setCountry(text);
        }}
      />

      <Text style={styles.title}>City:</Text>
      <TextInput
        placeholder="e.g Barcelona"
        value={city}
        onChangeText={(text) => {
          setCity(text);
        }}
      />

      <View>
        <Text style={styles.title}> From:</Text>
        {!showFromDatePicker && (
          <Pressable onPress={toggleFromDatePicker}>
            <TextInput
              style={styles.text}
              placeholder="Saturday Jan 01 2023"
              value={formatFromDate(fromDate)}
              editable={false}
            />
          </Pressable>
        )}

        {showFromDatePicker && (
          <DateTimePicker
            mode="date"
            display="calendar"
            value={fromDate}
            onChange={onFromDateChange}
          />
        )}
        <Text style={styles.title}> To:</Text>
        {!showToDatePicker && (
          <Pressable onPress={toggleToDatePicker}>
            <TextInput
              style={styles.text}
              placeholder="Saturday Jan 07 2023"
              value={formatToDate(toDate)}
              editable={false}
            />
          </Pressable>
        )}
        {showToDatePicker && (
          <DateTimePicker
            mode="date"
            display="calendar"
            value={toDate}
            onChange={onToDateChange}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </View>
    </View>
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
    color: colors.orange,
    textAlign: "center",
    flexWrap: "wrap",
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
    fontFamily: "poppins_bold",
    letterSpacing: 0.25,
    color: "white",
  },
  title: {
    fontFamily: "poppins_bold",
    color: colors.lightBlack,
    fontSize: 15,
  },
  buttonContainer: {
    width: "100%", // Set the width of the container to 100%
    alignItems: "center", // Center the content horizontally
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
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 1,
    shadowRadius: 13,
    elevation: 24,
  },
});
