import { USER_LOGIN, USER_LOGOUT } from "../actionTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const userLogin = createAsyncThunk(
  USER_LOGIN,
  async (payload, thunkAPI) => {
    localStorage.access_token = payload.access_token;
    localStorage.fullName = payload.fullName;
    localStorage.phoneNumber = payload.phoneNumber;
    return true;
  }
);

export const userLogout = createAsyncThunk(
  USER_LOGOUT,
  async (payload, thunkAPI) => {
    localStorage.clear();
    return payload;
  }
);

const rootSlice = createSlice({
  name: "root",
  initialState: {
    login: false,
    loading: false,
    error: null,
    products: [],
    product: null,
    table: {
      page: 1,
      limit: 4,
      count: 0,
    },
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setProducts(state, action) {
      state.products = action.payload;
    },
    setProduct(state, action) {
      state.product = action.payload;
    },
    setTablePage(state, action) {
      state.table.page = action.payload;
    },
    setTableLimit(state, action) {
      state.table.limit = action.payload;
    },
    setTableCount(state, action) {
      state.table.count = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.login = action.payload;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.login = false;
        state.loading = false;
        state.error = null;
        state.products = [];
        state.product = null;
        state.table = {
          page: 1,
          limit: 4,
          count: 0,
        };
      });
  },
});

export const {
  setLogin,
  setLoading,
  setError,
  setProducts,
  setProduct,
  setTableLimit,
  setTablePage,
  setTableCount,
} = rootSlice.actions;

export default rootSlice.reducer;
