import { createSlice } from "@reduxjs/toolkit";
import { Data } from "../../pages/Data";

interface CrudState {
  users: {id:string,name:string,age:string}[];
  user: {id:string,name:string,age:string}[],
  success: boolean
}

const initialState:CrudState = {
  users: Data,
  user: [], 
  success: false,
};

export const crudSlice = createSlice({
  name: "crud",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users = [...state.users, action.payload];
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => {
        return user.id !== action.payload;
      });
    },
    getUser: (state, action) => {
      state.user = state.users.filter((user) => user.id === action.payload);
    },
    updateUser: (state, action) => {
      const { id } = action.payload;
      state.success = true;
      state.users = state.users.map((user) => {
        return user.id === id ? (user = action.payload) : user;
      });
    },
    resetUser: (state) => {
      state.user = [];
      state.success = false;
    },
  },
});

export const { addUser, deleteUser, getUser, resetUser, updateUser } =
  crudSlice.actions;

export default crudSlice.reducer;
