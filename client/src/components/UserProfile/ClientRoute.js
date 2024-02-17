import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ClientRoute = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  return isAuth && user.role === 'client' ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
    />
  );
};

export default ClientRoute;
