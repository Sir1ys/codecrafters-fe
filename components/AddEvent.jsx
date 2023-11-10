import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import DatePicker from "react-native-date-picker";

export default function AddEvent() {
  const [titleText, setTitleText] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  return (
    <View>
      <Text>Add a Post</Text>
      <TextInput
        autocapitalize="words"
        placeholder="Event Title"
        value={titleText}
        onChangeText={(text) => {
          setTitleText(text);
        }}
      />

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={(text) => {
          setDescription(text);
        }}
      />
      <TextInput
        placeholder="Location"
        autoComplete="postal-address-extended"
        value={location}
        onChangeText={(text) => {
          setLocation(text);
        }}
      />
    </View>
  );
}
