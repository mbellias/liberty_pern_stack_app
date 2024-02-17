import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { logoutAsync, setUser, setAuthenticated } from '../../store/auth-slice';
import ClientProfile from '../../components/UserProfile/ClientProfile';
import Card from '../../components/UI/Card';
import styles from './ClientPage.module.css';

const ClientPage = () => {
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
      <ClientProfile onLogout={handleLogout} />
      <Outlet />
    </Card>
  );
};

export default ClientPage;
