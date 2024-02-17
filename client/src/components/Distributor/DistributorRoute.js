import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DistributorRoute = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  return isAuth && user.role === 'distributor' ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
    />
  );
};

export default DistributorRoute;
