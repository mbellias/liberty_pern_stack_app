import Cookies from 'js-cookie';
import { setUser, setAuthenticated } from './auth-slice';

let isUpdatingStorage = false;

const saveToStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (
    action.type === 'auth/login/fulfilled' ||
    action.type === 'auth/logout/fulfilled' ||
    store.getState().auth.isAuthenticated
  ) {
    const { user, isAuthenticated } = store.getState().auth;

    if (!isUpdatingStorage) {
      isUpdatingStorage = true;

      store.dispatch(setUser(user));
      store.dispatch(setAuthenticated(isAuthenticated));

      Cookies.set('user', JSON.stringify(user), { expires: 7 });
      Cookies.set('isAuthenticated', isAuthenticated.toString(), {
        expires: 7,
      });

      isUpdatingStorage = false;
    }
  }

  return result;
};

export default saveToStorageMiddleware;
