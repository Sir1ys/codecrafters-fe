import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { UserContext } from "../contexts/UserContext";
import { colors } from "../constants/colors";
import { Feather } from "@expo/vector-icons";
import CustomButton from "./Button";
import {
  addUserInterest,
  getUserInterests,
  removeUserInterest,
} from "../utils/users_api";
import RNPickerSelect from "react-native-picker-select";
import { getAllInterests } from "../utils/interests_api";

export const Profile = ({ navigation }) => {
  const { userState, userAuth } = useContext(UserContext);
  const [user, setUser] = userState;
  const setUserAuthenticated = userAuth[1];
  const { name, profile_pic, username, user_id } = user;
  const [userInterests, setUserInterests] = useState([]);
  const [allInterests, setAllInterests] = useState([]);
  const [pickerValue, setPickerValue] = useState("");
  let newInterest = "";

  const newInterestList = allInterests.map((singleInterest) => {
    return {
      label: singleInterest.interest,
      value: singleInterest.interest_id,
      key: singleInterest.interest_id,
    };
  });
  const selectedInterests = userInterests.map((interestObj) => {
    return interestObj.interest;
  });

  useEffect(() => {
    getUserInterests(user_id)
      .then((interests) => {
        setUserInterests(interests);
      })
      .catch((err) => console.log(err));
    getAllInterests()
      .then((interests) => {
        setAllInterests(interests);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogOut = () => {
    setUser({});
    setUserAuthenticated(false);
  };

  const handleDeleteInterest = (interestId) => {
    removeUserInterest(user_id, interestId)
      .then(() => {
        return getUserInterests(user_id);
      })
      .then((interests) => {
        setUserInterests(interests);
      })
      .catch((err) => console.log(err));
  };

  const handleNewInterest = (interestId) => {
    newInterest = interestId;
  };

  const addNewInterest = (interestId) => {
    addUserInterest(user_id, interestId)
      .then(() => {
        setPickerValue("");
        return getUserInterests(user_id);
      })
      .then((interests) => {
        setUserInterests(interests);
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.aboutContainer}>
        <View style={styles.about}>
          <View>
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.username}>{name}</Text>
            </View>
            <View>
              <Text style={styles.label}>Username:</Text>
              <Text style={styles.username}>{username}</Text>
            </View>
          </View>
          <Image source={{ uri: profile_pic }} style={styles.avatar} />
        </View>

        <Feather
          style={styles.edit}
          name={"edit"}
          size={25}
          color="black"
          onPress={() => {
            navigation.navigate("UpdateAbout", { user, setUser });
          }}
        />
      </View>
      <View style={styles.interestContainer}>
        <Text style={styles.label}>Your interests:</Text>
        <View style={styles.interestList}>
          {userInterests.map((interest) => {
            return (
              <View key={interest.interest_id} style={styles.singleInterest}>
                <Text key={interest} style={styles.textInterest}>
                  #{interest.interest}
                </Text>
                <TouchableOpacity
                  onPress={() => handleDeleteInterest(interest.interest_id)}
                >
                  <Feather name="delete" size={24} color={colors.orange} />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
      <RNPickerSelect
        style={{
          placeholder: {
            color: "#D83F31",
          },
        }}
        placeholder={{ label: "Pick a new interest" }}
        onValueChange={(value) => handleNewInterest(value)}
        items={newInterestList.filter((interest) => {
          return !selectedInterests.includes(interest.label);
        })}
        value={pickerValue}
      />
      <TouchableOpacity onPress={() => addNewInterest(newInterest)}>
        <Feather name="plus-circle" size={24} color={colors.blue} />
      </TouchableOpacity>

      <CustomButton
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
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  aboutContainer: {
    width: "100%",
    padding: 20,
    flex: 1,
    alignItems: "center",
    borderBottomColor: colors.blue,
    borderBottomWidth: 3,
  },
  about: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  label: {
    fontSize: 20,
    fontWeight: "500",
    color: colors.orange,
    marginBottom: 10,
    fontFamily: "poppins",
  },
  avatar: {
    height: 150,
    width: 150,
    borderRadius: 50,
    marginBottom: 15,
  },
  username: {
    fontSize: 15,
    color: colors.blue,
    fontWeight: "600",
    fontFamily: "regular",
  },
  edit: {
    alignSelf: "flex-end",
    color: colors.blue,
    padding: 10,
  },
  interestContainer: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "flex-start",
    padding: 20,
    gap: 15,
  },
  interestList: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  textInterest: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.blue,
    padding: 10,
    fontFamily: "regular",
  },
  button: {
    backgroundColor: colors.blue,
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 20,
    margin: 20,
  },
  textButton: {
    fontSize: 13,
    lineHeight: 15,
    fontFamily: "poppins",
    letterSpacing: 0.25,
    color: "white",
  },
  singleInterest: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
