import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { colors } from "../constants/colors";

export default function Location({ navigation, route }) {
  const { setLocation, setLatitude, setLongitude } = route.params;
  return (
    <View style={{ ...StyleSheet.absoluteFillObject, ...styles.googleAuto }}>
      <GooglePlacesAutocomplete
        placeholder="Type a location..."
        query={{ key: process.env.GOOGLE_MAPS_API_KEY }}
        fetchDetails={true}
        onPress={(data, details = null) => {
          setLatitude(details.geometry.location.lat);
          setLongitude(details.geometry.location.lng);
          setLocation(data.description);
          navigation.goBack();
        }}
        onFail={(error) => console.log(error)}
        onNotFound={() => console.log("no results")}
      />
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
  googleAuto: {
    zIndex: 1,
  },
});
