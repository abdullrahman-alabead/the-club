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
    id: ''
  },
  reducers: {
    updatePostText(state, action) {
      state.text = action.payload.text;
      state.sendTime = action.payload.time
      state.userName = auth.currentUser.displayName
      state.userPic = auth.currentUser.photoURL
    },
  },
});

export const newPostActions = newPostSlice.actions;
