import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { UserContext } from "../contexts/UserContext";
import { getUserTrips, deleteTrip } from "../utils/users_api";
import { getFlagCountryByName } from "../utils/countries_api";
import { colors } from "../constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

export default function TripsPage({ navigation }) {
  const [trips, setTrips] = useState([]);
  const [flags, setFlags] = useState([]);
  const { userState } = useContext(UserContext);
  const user = userState[0];
  const isFocused = useIsFocused();

  const removeTrip = (trip_id) => {
    deleteTrip(user.user_id, trip_id).then(() => {
      setTrips(() => {
        const updatedTrips = [...trips];
        return updatedTrips.filter((trip) => trip.trip_id !== trip_id);
      });
    });
  };

  useEffect(() => {
    isFocused &&
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
  }, [isFocused]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Your Trips</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("AddTrip", { setTrips, setFlags })}
        >
          <Feather name="plus" size={24} color={colors.white} />
        </Pressable>
        {trips.map((trip, index) => {
          const { country, trip_id, location, start_date, end_date } = trip;
          return (
            <View style={styles.tripCard} key={trip_id}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("EventsFeed", {
                    tripInfo: { country, start_date, end_date },
                  });
                }}
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
              <Pressable
                style={styles.buttonRemove}
                onPress={() => {
                  removeTrip(trip_id);
                }}
              >
                <Text>
                  <AntDesign name="delete" size={24} color="black" />
                </Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </ScrollView>
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
    flexDirection: "column",
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
    alignSelf: 'flex-end'
  },
  flag: {
    width: 70,
    height: 50,
  },
  heading: {
    color: `${colors.grey}`,
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
  buttonRemove: {
    alignSelf: "flex-end",
  },
});
