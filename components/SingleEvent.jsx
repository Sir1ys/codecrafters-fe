import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { fetchEventById } from "../api";

export default function SingleEvent(props) {
  const [event, setEvent] = useState({});
  const id = props.id;

  useEffect(() => {
    fetchEventById(id).then((data) => {
      setEvent(data);
    });
  }, [id]);

  return (
    <View>
      <Text>{event.short_description}</Text>
    </View>
  );
}
