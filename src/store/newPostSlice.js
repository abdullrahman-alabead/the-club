import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebaseConfig";
import { nanoid } from "nanoid";

export const newPostSlice = createSlice({
  name: "newPost",
  initialState: {
    text: "",
    userName: '',
    userPic: '',
    sendTime:'',
    id: '',
  },
  reducers: {
    updatePostText(state, action) {
      state.text = action.payload;
    },
  },
});

export const newPostActions = newPostSlice.actions;
