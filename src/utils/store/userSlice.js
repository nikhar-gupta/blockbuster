import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: JSON.parse(localStorage.getItem("user")),
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: (state) => {
      localStorage.removeItem("user");
      return "";
    },
  },
});
export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
