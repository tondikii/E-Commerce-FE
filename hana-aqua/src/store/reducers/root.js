import {
  SET_LOGIN,
  // SET_LOADING,
  // SET_ERROR,
  // SET_PRODUCTS,
} from "../actionTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const userLogin = createAsyncThunk(
  SET_LOGIN,
  async (payload, thunkAPI) => {
    console.log({ payload });
    // await AsyncStorage.setItem("token", payload.token);
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
  },
  reducers: {
    setLogin(state, action) {
      state.login = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      console.log(state, action);
      {
        state.login = action.payload;
      }
    });
  },
});

export default rootSlice.reducer;

// const rootReducer =
//   ((state = initialState),
//   (action) => {
//     switch (action.type) {
//       case SET_LOGIN:
//         return {
//           ...state,
//           login: action.payload,
//         };
//       case SET_LOADING:
//         return {
//           ...state,
//           loading: action.payload,
//         };
//       case SET_ERROR:
//         return {
//           ...state,
//           error: action.payload,
//         };
//       case SET_PRODUCTS:
//         return {
//           ...state,
//           products: action.payload,
//         };
//         default:
//           return state;
//     }
//   });

// export default rootReducer;
