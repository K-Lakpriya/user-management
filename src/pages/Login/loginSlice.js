import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "../../app/axios";
import { message } from "antd";

const initialState = {
    isLoggedIn: false,
  loading: false,
};


export const loginAsync = createAsyncThunk(
  'auth/login',
  async (data) => {
    const response = await axios.post("auth/login", data ) ;
    return response.data;
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    userLogin: (state) => {

      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        if (action.payload.success){
          state.isLoggedIn = true;
          localStorage.setItem('session', JSON.stringify(action.payload))

        }
        else {
          message.error('Something went wrong');
        }
        state.loading = false;
      })
      .addCase(loginAsync.rejected, ((state) => {
        state.isLoggedIn = false;
        state.loading = false;
      }))
  },
});

export const { userLogin } = loginSlice.actions;

export default loginSlice.reducer;
