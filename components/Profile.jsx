import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { UserContext } from "../contexts/UserContext";
import { colors } from "../constants/colors";
import { Feather } from "@expo/vector-icons";
import Button from "./Button";

export const Profile = () => {
  const userExample = {
    user_id: "1",
    username: "butter_bridge",
    name: "Jonny",
    profile_pic:
      "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
    created_at: 1669852800000,
  };
  const userInterests = ["swimming", "running", "swimming", "swimming"];

  const { userState, userAuth } = useContext(UserContext);
  const [user, setUser] = userState;
  const setUserAuthenticated = userAuth[1];

  const handleLogOut = () => {
    setUser({});
    setUserAuthenticated(false);
  };

  const handleEdit = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.about}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View>
            <View style={{ marginBottom: 15 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "500",
                  color: "#034694",
                  marginBottom: 10,
                }}
              >
                Name:
              </Text>
              <Text style={styles.username}>{userExample.name}</Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "500",
                  color: "#034694",
                  marginBottom: 10,
                }}
              >
                Username:
              </Text>
              <Text style={styles.username}>{userExample.username}</Text>
            </View>
          </View>
          <Image
            source={{
              uri: "https://www.usatoday.com/gcdn/presto/2023/02/12/USAT/4252b022-bc71-444a-a788-dadaf02571de-5910.JPG?crop=7375,4917,x0,y0&width=700&height=467&format=pjpg&auto=webp",
            }}
            style={styles.avatar}
          />
        </View>

        <Feather
          style={styles.edit}
          name={"edit"}
          size={25}
          color="black"
          onPress={() => {
            handleEdit();
          }}
        />
      </View>

      <View style={styles.interestContainer}>
        <Text style={{ fontSize: 20, fontWeight: "600" }}>Your interests:</Text>
        <View style={styles.interestList}>
          {userInterests.map((interest) => {
            return (
              <Text style={[styles.textInterest, styles.boxShadow]}>
                #{interest}
              </Text>
            );
          })}
        </View>
      </View>

      <Button
        text={"Sign out"}
        styles={{ button: styles.button, text: styles.textButton }}
        handleCLick={handleLogOut}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  about: {
    width: "100%",
    padding: 20,
    display: "flex",
    alignItems: "center",
    borderBottomColor: colors.blue,
    borderBottomWidth: 3,
  },
  avatar: {
    height: 150,
    width: 150,
    borderRadius: "50%",
    marginBottom: 15,
  },
  username: {
    fontSize: 15,
    color: colors.blue,
    fontWeight: "600",
  },
  edit: {
    alignSelf: "flex-end",
    color: colors.blue,
    padding: 10,
  },
  interestContainer: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-start",
    padding: 20,
    gap: 15,
  },
  interestList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  textInterest: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.lightGrey,
    padding: 10,
  },
  boxShadow: {
    shadowColor: "#171717",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  button: {
    backgroundColor: colors.blue,
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 20,
    margin: 20,
  },
  textButton: {
    color: "white",
  },
});
