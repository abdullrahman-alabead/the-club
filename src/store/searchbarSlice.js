import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  searchText: null,
  searchResults: [],
  selectedUsers: []
}

export const searchbarSlice = createSlice({
  name:'searchbar',
  initialState,
  reducers: {
    updateSearch(state, action){
      state.searchText = action.payload == '' ? null : action.payload;
    },
    updateSelectedUsers(state, action){
      state.selectedUsers.push(action.payload)
    }
  }
})

export const searchbarActions = searchbarSlice.actions;