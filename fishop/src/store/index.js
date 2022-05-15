import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/root";
// import thunk from "redux-thunk";
// import logger from "./middlewares/logger";

const store = configureStore({
  reducer: {
    rootReducer
  },
  // middleware: [thunk, logger]
});

export default store;