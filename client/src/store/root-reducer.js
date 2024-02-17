import { combineReducers } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import cartReducer from './cart-slice';
import productsReducer from './products-slice';
import authReducer, { setAuthenticated, setUser } from './auth-slice';

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
  auth: authReducer,
});

const storedIsAuthenticated = Cookies.get('isAuthenticated');
const storedUser = Cookies.get('user');
let initialIsAuthenticated = false;
let initialUser = null;

try {
  initialIsAuthenticated = storedIsAuthenticated
    ? JSON.parse(storedIsAuthenticated)
    : false;
} catch (error) {
  console.error('Error parsing isAuthenticated data:', error);
}

try {
  initialUser = storedUser ? JSON.parse(storedUser) : null;
} catch (error) {
  console.error('Error parsing user data:', error);
}

const preloadedState = {
  auth: {
    user: initialUser,
    isAuthenticated: initialIsAuthenticated,
  },
};

export { preloadedState, setAuthenticated, setUser };
export default rootReducer;
