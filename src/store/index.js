import { configureStore } from "@reduxjs/toolkit";
import { newPostSlice } from "./newPostSlice";
import { postsSlice } from "./PostsSlice";
import { searchbarSlice } from "./searchbarSlice";
import { usersSlice } from "./usersSlice";

export const store = configureStore({
  reducer: {
    newPost: newPostSlice.reducer,
    posts: postsSlice.reducer,
    searchBar: searchbarSlice.reducer,
    users: usersSlice.reducer
  }
})