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
            <Text>{updatedComment.userInfo.username}</Text>
          </View>
          <Text>{updatedComment.body}</Text>
          {user.user_id === updatedComment.user_id ? (
            <Pressable
              style={styles.buttonRemove}
              onPress={() => {
                removeComment(updatedComment.comment_id);
              }}
            >
              <Text>
                <AntDesign name="delete" size={24} color="black" />
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
    backgroundColor: colors.lightGrey,
    marginBottom: 10,
    padding: 20,
    borderRadius: 10,
  },
  profile: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: { height: 25, width: 25, borderRadius: 5},
  buttonRemove: {
    alignSelf: "flex-end",
  },
});
