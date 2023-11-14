import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { colors } from "../constants/colors";

export default function Location() {
  return (
    // <View style={StyleSheet.absoluteFillObject}>
    <View>
      <Text style={styles.text}>Location</Text>
      <GooglePlacesAutocomplete
        placeholder="Type a location..."
        query={{ key: process.env.GOOGLE_MAPS_API_KEY }}
        fetchDetails={true}
        onPress={(data, details = null) => {
          console.log(data);
          console.log(details);
          console.log(data.description);
          console.log(details.geometry);
          setLocation(data.description);
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
});
