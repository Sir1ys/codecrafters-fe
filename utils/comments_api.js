import axios from "axios";

const commentsApi = axios.create({
  baseURL: "https://codecrafters-9qyn.onrender.com/api/events",
});

export const getCommentsByEventId = (eventId) => {
  return commentsApi.get(`/${eventId}/comments`).then((response) => {
    return response.data.comments;
  });
};

export const postCommentsByEventId = (eventId, comment) => {
  return commentsApi.post(`/${eventId}/comments`, comment).then((response) => {
    return response.data.comment
  });
};

export const deleteCommentsByEventId = (eventId, commentId) => {
  return commentsApi.delete(`/${eventId}/comments/${commentId}`);
};
