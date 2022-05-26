import { USER_LOGIN, USER_LOGOUT } from "../actionTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import apiInstance from "../../configs/api";

export const userLogin = createAsyncThunk(
  USER_LOGIN,
  async (payload, thunkAPI) => {
    localStorage.access_token = payload.access_token;
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
      });
  },
});

export const { setLogin, setLoading, setError, setProducts, setProduct } =
  rootSlice.actions;

export default rootSlice.reducer;
