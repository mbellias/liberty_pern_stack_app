import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setLoading, setError, clearCart } from './cart-slice';
import BASE_URL from '../config';

export const fetchGetCart = createAsyncThunk(
  'cart/getCart',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const response = await axios.get(`${BASE_URL}/api/cart`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const fetchAddToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ id, quantity }, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const response = await axios.post(
        `${BASE_URL}/api/cart/add`,
        {
          id,
          quantity,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const fetchRemoveFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const response = await axios.delete(`${BASE_URL}/api/cart/remove`, {
        data: { id },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const fetchClearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const response = await axios.delete(`${BASE_URL}/api/cart/clear`, {
        withCredentials: true,
      });

      dispatch(clearCart());

      return response.data;
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);
