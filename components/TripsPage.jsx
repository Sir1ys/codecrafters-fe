import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { UserContext } from "../contexts/UserContext";
import { getUserTrips } from "../utils/users_api";
import { getFlagCountryByName } from "../utils/countries_api";
import { colors } from "../constants/colors";
import { dateFromTimestamp, friendlyDate } from "../utils/dates";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function TripsPage({ navigation }) {
  const [trips, setTrips] = useState([]);
  const [flags, setFlags] = useState([]);
  const { userState } = useContext(UserContext);
  const user = userState[0];

  useEffect(() => {
    getUserTrips(user.user_id)
      .then((tripsData) => {
        setTrips(tripsData);
        return tripsData;
      })
      .then((tripsData) => {
        const promiseArray = tripsData.map((trip) => {
          return getFlagCountryByName(trip.country);
        });
        return Promise.all(promiseArray);
      })
      .then((flagData) => {
        setFlags(flagData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Trips</Text>
      {trips.map((trip, index) => {
        const { country, trip_id, location, start_date, end_date } = trip;
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EventsFeed", {});
            }}
            style={styles.tripCard}
            key={trip_id}
          >
            <Image source={{ uri: flags[index] }} style={styles.flag} />
            <View style={styles.tripInfo}>
              <Text>
                <Text style={styles.heading}>Country:</Text> {country}
              </Text>
              <Text>
                <Text style={styles.heading}>City:</Text> {location}
              </Text>
              <Text>
                <Text style={styles.heading}>Start:</Text>{" "}
                {start_date.split("T")[0]}
              </Text>
              <Text>
                <Text style={styles.heading}>End:</Text>{" "}
                {end_date.split("T")[0]}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontFamily: "poppins_bold",
    fontSize: 22,
    color: `${colors.orange}`,
    paddingTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: `${colors.white}`,
  },
  tripCard: {
    flexDirection: "row",
    width: "80%",
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
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  tripInfo: {
    paddingLeft: 10,
    fontFamily: "poppins_bold",
  },
  flag: {
    width: 70,
    height: 50,
  },
  heading: {
    color: `${colors.grey}`,
  },
});
