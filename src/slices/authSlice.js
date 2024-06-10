import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: ' auth',
  initialState: {
    idToken: localStorage.getItem('idToken'),
    loggedUser: JSON.parse(localStorage.getItem('loggedUser')),
    isLoggedIn: !!localStorage.getItem('idToken'),
  },
  reducers: {
    onLogin(state, action) {
      const idToken = action.payload.idToken;
      const loggedUser = {
        name: action.payload.displayName,
        email: action.payload.email,
      };

      state.idToken = idToken;
      localStorage.setItem('idToken', idToken);

      state.loggedUser = loggedUser;
      localStorage.setItem('loggedUser', JSON.stringify(loggedUser));

      state.isLoggedIn = true;
    },
    onLogout(state, action) {},
  },
});

export const { onLogin, onLogout } = authSlice.actions;
export default authSlice.reducer;
