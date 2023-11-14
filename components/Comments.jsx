import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable, TextInput } from "react-native";
import {
  getCommentsByEventId,
  postCommentsByEventId,
  deleteCommentsByEventId,
} from "../utils/comments_api";
import { colors } from "../constants/colors";
import Comment from "./Comment";

export default function Comments({ route }) {
  const { user, eventId } = route.params;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    getCommentsByEventId(eventId).then((data) => {
      setComments(data);
      return data;
    });
  }, []);

  const inputChange = (newText) => {
    setComment(newText);
  };

  const createComment = () => {
    const newComment = {
      body: comment,
      user_id: user.user_id,
      event_id: eventId,
      created_at: new Date(),
    };

    postCommentsByEventId(eventId, newComment)
      .then((response) => {
        const newComments = [...comments];
        newComments.unshift(response);
        setComments(newComments);
      })
      .catch((err) => console.log(err));

    setComment("");
  };

  const removeComment = (commentId) => {
    deleteCommentsByEventId(eventId, commentId).then(() => {
      setComments(() => {   
        const updatedComments = [...comments];
        return updatedComments.filter(
          (comment) => comment.comment_id !== commentId
        );
      });
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Comments</Text>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={(newText) => inputChange(newText)}
          value={comment}
          placeholder="Add a comment..."
        />
        <Pressable style={styles.buttonCreate} onPress={createComment}>
          <Text>Comment</Text>
        </Pressable>
      </View>
      {comments.map((commentExample) => {
        return (
          <Comment
            key={commentExample.comment_id}
            comment={commentExample}
            removeComment={removeComment}
            user={user}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "600",
    fontSize: 20,
  },
  input: {
    borderBottomWidth: 5,
    borderBottomColor: colors.lightGrey,
    marginBottom: 10,
  },
  buttonCreate: {
    alignSelf: "flex-end",
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.lightGrey,
    borderRadius: 5,
  },
});
