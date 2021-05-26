import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
const autoId = localStorage.getItem("autoId");
const quoteId = localStorage.getItem("quoteId");

const initialAuthSlice = {
  token,
  isLoginState: false,
  userId,
  autoId,
  quoteId,
  apiError: "",
  showAlert: "",
  showAlertType: ""
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialAuthSlice,
  reducers: {
    loginHandler(state, action) {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.id);
    },
    logoutHandler(state) {
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("autoId");
      localStorage.removeItem("quoteId");
    },
    addAutoId(state, action) {
      state.autoId = action.payload;
      localStorage.setItem("autoId", action.payload);
    },
    addQuoteId(state, action) {
      state.quoteId = action.payload;
      localStorage.setItem("quoteId", action.payload);
    },
    toggleHandler(state) {
      state.isLoginState = !state.isLoginState;
    },
    setAuthApiError(state, action) {
      state.apiError = action.payload;
    },
    showAlertHandler(state, action) {
      state.showAlert = action.payload.message;
      state.showAlertType = action.payload.status
    },
  },
});

export const AuthActions = AuthSlice.actions;

export default AuthSlice.reducer;
