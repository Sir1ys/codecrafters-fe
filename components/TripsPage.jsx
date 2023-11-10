import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image } from "react-native";
import { UserContext } from "../contexts/UserContext";
import { getUserTrips } from "../utils/users_api";
import { getFlagCountryByName } from "../utils/countries_api";

export default function TripsPage() {
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
    <View>
      <Text>TripsPage</Text>
      {trips.map((trip, index) => {
        const { country, trip_id } = trip;
        return (
          <View key={trip_id}>
            <Text>{country}</Text>
            <Image source={{uri: flags[index]}} style={{width: 50, height: 50}}/>
          </View>
        );
      })}
    </View>
  );
}
