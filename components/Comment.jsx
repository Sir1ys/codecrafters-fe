import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { getUserById } from "../utils/users_api";
import { colors } from "../constants/colors";

export default function Comment({ comment, removeComment, user }) {
  const [updatedComment, setUpdatedComment] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserById(comment.user_id).then((response) => {
      setUpdatedComment(() => {
        const commentInfo = { ...comment };
        commentInfo.userInfo = response;
        return commentInfo;
      });
      setLoading(false);
    });
  }, []);

  return (
    <View style={styles.commentBox}>
      {loading === false ? (
        <>
          <View style={styles.profile}>
            <Image
              source={{ uri: updatedComment.userInfo.profile_pic }}
              style={styles.avatar}
            />
            <Text style={styles.usernameText}>
              {updatedComment.userInfo.username}
            </Text>
          </View>
          <Text style={styles.body}>{updatedComment.body}</Text>
          {user.user_id === updatedComment.user_id ? (
            <Pressable
              style={styles.buttonRemove}
              onPress={() => {
                removeComment(updatedComment.comment_id);
              }}
            >
              <Text>
                <AntDesign name="delete" size={24} color={colors.orange} />
              </Text>
            </Pressable>
          ) : null}
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  commentBox: {
    borderColor: colors.primary,
    backgroundColor: "white",
    marginBottom: 10,
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  profile: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 5,
    borderColor: colors.orange,
    borderWidth: 2,
  },
  buttonRemove: {
    alignSelf: "flex-end",
  },
  usernameText: {
    fontFamily: "poppins",
    fontSize: 12,
    color: colors.orange,
  },
  body: {
    fontFamily: "regular",
    color: colors.black,
    flexWrap: "wrap",
    fontSize: 12,
    fontStyle: "normal",
  },
});
