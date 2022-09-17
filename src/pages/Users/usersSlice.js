import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../app/axios";
import { message } from "antd";

const initialState = {
  showModal: false,
  itemSelectedForEdit: undefined,
  createUserLoading: false,
  users: [],
  getUsersLoading: false,
  doUpdateUser: Date.now(),
  showUploadUsersModal: false,
  totalUsers: 0,
  currentPage: 1,
  totalPages: 1,
};

export const createUserAsync = createAsyncThunk(
  "users/create",
  async (data) => {
    const response = await axios.post("/users", data);
    return response.data;
  }
);

export const getUsersAsync = createAsyncThunk(
  "users/get",
  async ({ page = 1, search, role, department }) => {
    let query = `page=${page}`;
    if (search) query = `${query}&search=${search}`;
    if (role) query = `${query}&role=${role}`;
    if (department) query = `${query}&department=${department}`;
    const response = await axios.get(`/users?${query}`);
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "users/update",
  async (data) => {
    const response = await axios.patch("/users", data);
    return response.data;
  }
);

export const deleteUserAsync = createAsyncThunk(
  "users/delete",
  async (email) => {
    const response = await axios.post(`/users/delete`, { email });
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    showCreateUserModal: (state) => {
      state.showModal = true;
    },
    hideCreateUserModal: (state) => {
      state.itemSelectedForEdit = undefined;
      state.showModal = false;
    },
    selectItemForEdit: (state, action) => {
      state.itemSelectedForEdit = action.payload;
      state.showModal = true;
    },
    showUploadUsersModal: (state) => {
      state.showUploadUsersModal = true;
    },
    hideUploadUsersModal: (state) => {
      state.showUploadUsersModal = false;
    },
    uploadFile: (state, action) => {
      if (action.payload?.success) {
        state.doUpdateUser = Date.now();
      } else {
        message.error("Something went wrong");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.createUserLoading = true;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          message.info("User created successfully");
          state.showModal = false;
          state.doUpdateUser = Date.now();
        } else {
          message.error("Something went wrong");
        }
        state.createUserLoading = false;
      })
      .addCase(createUserAsync.rejected, (state) => {
        state.createUserLoading = false;
      })
      .addCase(getUsersAsync.pending, (state) => {
        state.getUsersLoading = true;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.users = action.payload.users.map((user, index) => {
            user.key = index;
            return user;
          });
          state.totalUsers = action.payload.total;
          state.totalPages = action.payload.totalPages;
          state.currentPage = action.payload.currentPage;
        } else {
          message.error("Get Users failed");
        }
        state.getUsersLoading = false;
      })
      .addCase(getUsersAsync.rejected, (state) => {
        state.getUsersLoading = false;
        message.error("Get Users failed");
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.createUserLoading = true;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          message.info("User updated successfully");
          state.itemSelectedForEdit = undefined;
          state.doUpdateUser = Date.now();
        } else {
          message.error("Update Users failed");
        }
        state.showModal = false;
      })
      .addCase(updateUserAsync.rejected, (state) => {
        state.createUserLoading = false;
        state.showModal = false;
        message.error("Update Users failed");
      })
      .addCase(deleteUserAsync.pending, (state) => {
        state.getUsersLoading = true;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          message.info("User deleted successfully");
          state.doUpdateUser = Date.now();
        } else {
          message.error(
            action?.payload?.message
              ? action.payload.message
              : "Delete Users failed"
          );
        }
        state.getUsersLoading = false;
      })
      .addCase(deleteUserAsync.rejected, (state) => {
        state.getUsersLoading = false;
        message.error("Delete Users failed");
      });
  },
});

export const {
  hideCreateUserModal,
  showCreateUserModal,
  selectItemForEdit,
  showUploadUsersModal,
  hideUploadUsersModal,
  uploadFile,
} = userSlice.actions;
export default userSlice.reducer;
