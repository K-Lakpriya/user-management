import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../pages/Users/usersSlice.js";
import loginReducer from "../pages/Login/loginSlice";


export const store = configureStore({
  reducer: {
    users: usersReducer,
    login: loginReducer,
  },
});
