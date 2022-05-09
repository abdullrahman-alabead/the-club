import { createSlice } from "@reduxjs/toolkit";


export const postsSlice = createSlice({
  name: 'posts',
  initialState: null,
  reducers:{
    setPosts(state, action){
      return action.payload
    }
  }
})

export const postsActions = postsSlice.actions;