import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './auth-service';
import Cookies from 'js-cookie';

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      Cookies.set('user', JSON.stringify(response.user), { expires: 7 });
      return { user: response.user };
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong.');
    }
  }
);

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  await authService.logout();

  Cookies.remove('user');
  Cookies.set('isAuthenticated', false);
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { setAuthenticated, setUser, setError } = authSlice.actions;
export default authSlice.reducer;
