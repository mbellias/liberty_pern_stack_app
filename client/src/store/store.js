import { configureStore } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import rootReducer from './root-reducer';
import saveToStorageMiddleware from './auth-middleware';
import { setAuthenticated, setUser } from './auth-slice';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveToStorageMiddleware),
});

const storedIsAuthenticated = Cookies.get('isAuthenticated');
const storedUser = Cookies.get('user');
let initialIsAuthenticated = false;
let initialUser = null;

try {
  initialIsAuthenticated = storedIsAuthenticated
    ? JSON.parse(storedIsAuthenticated)
    : false;

  store.dispatch(setAuthenticated(initialIsAuthenticated));

  initialUser = storedUser ? JSON.parse(storedUser) : null;

  if (initialUser) {
    store.dispatch(setUser(initialUser));
  }
} catch (error) {
  console.error('Error parsing user data:', error);
}

store.subscribe(() => {
  const isAuthenticated = store.getState().auth.isAuthenticated;
  Cookies.set('isAuthenticated', isAuthenticated.toString(), { expires: 7 });
});

export default store;
