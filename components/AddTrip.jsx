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
import { getFlagCountryByName } from "../utils/countries_api";
import { useIsFocused } from "@react-navigation/native";

export default function AddTrip({ navigation, route }) {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const { userState } = useContext(UserContext);
  const [user, setUser] = userState;
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { setTrips } = route.params;
  const { setFlags } = route.params;

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const onFromDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    setShowDatePicker(Platform.OS === "ios");
    setFromDate(currentDate);
  };

  const onToDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || toDate;
    setShowDatePicker(Platform.OS === "ios");
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
      .then((trip) => {
        const newFlag = getFlagCountryByName(trip.data.trip.country)
        return Promise.all([  setTrips((previousTrips) => {
          return [...previousTrips, trip.data.trip]
        }),
        setFlags((previousFlags) => {
          return [...previousFlags, newFlag]
        })])
      })
      .then(() => {
        navigation.navigate("Home");
      })
  };

  return (
    <View>
      <Text style={styles.header}>Add a Trip</Text>

      <Text style={styles.text}>Country</Text>
      <TextInput
        autocapitalize="words"
        placeholder="e.g Spain"
        value={country}
        onChangeText={(text) => {
          setCountry(text);
        }}
      />

      <Text style={styles.text}>City:</Text>
      <TextInput
        placeholder="e.g Barcelona"
        value={city}
        onChangeText={(text) => {
          setCity(text);
        }}
      />

      <View>
        <Text style={styles.text}> From:</Text>
        {!showDatePicker && (
          <Pressable onPress={toggleDatePicker}>
            <TextInput
              style={styles.text}
              placeholder="Saturday Jan 01 2023"
              value={formatFromDate(fromDate)}
              editable={false}
            />
          </Pressable>
        )}

        {showDatePicker && (
          <DateTimePicker
            mode="date"
            display="calendar"
            value={fromDate}
            onChange={onFromDateChange}
          />
        )}
        <Text style={styles.text}> To:</Text>
        {!showDatePicker && (
          <Pressable onPress={toggleDatePicker}>
            <TextInput
              style={styles.text}
              placeholder="Saturday Jan 07 2023"
              value={formatToDate(toDate)}
              editable={false}
            />
          </Pressable>
        )}
        {showDatePicker && (
          <DateTimePicker
            mode="date"
            display="calendar"
            value={toDate}
            onChange={onToDateChange}
          />
        )}
      </View>
      <Pressable>
        <Text onPress={handleSubmit}>Submit</Text>
      </Pressable>
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
