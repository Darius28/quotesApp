import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./auth-slice";
import QuoteReducer from "./quote-slice";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    quote: QuoteReducer,
  },
});

export default store;
