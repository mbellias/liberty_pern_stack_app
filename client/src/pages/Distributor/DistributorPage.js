import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { logoutAsync, setUser, setAuthenticated } from '../../store/auth-slice';
import DistributorProfile from '../../components/Distributor/DistributorProfile';
import Card from '../../components/UI/Card';
import styles from './DistributorPage.module.css';

const DistributorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      dispatch(logoutAsync());
      dispatch(setUser(null));
      dispatch(setAuthenticated(false));

      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Card className={styles.card}>
      <DistributorProfile onLogout={handleLogout} />
      <Outlet />
    </Card>
  );
};

export default DistributorPage;
