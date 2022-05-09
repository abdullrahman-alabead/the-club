import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocs } from "firebase/firestore";


export const getUsers = createAsyncThunk('users/getUsers', (ref) => {
  return(
    getDocs(ref)
    .then(data => data.docs)
    .catch(err => alert(err.message))
  )
})

export const usersSlice = createSlice({
  name:"users",
  initialState: {users: null},
  reducers:{},
  extraReducers:{
    [getUsers.pending]: (state) => {},
    [getUsers.fulfilled]: (state, action) => {
      state.users = action.payload
    },
    [getUsers.rejected]: (state) => {}
  }
})