import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import styles from './AdminProfile.module.css';

const AdminProfile = ({ onLogout }) => {
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const userFromCookie = Cookies.get('user');
    if (userFromCookie) {
      const parsedUser = JSON.parse(userFromCookie);
      if (parsedUser && parsedUser.first_name) {
        setFirstName(parsedUser.first_name);
      }
    }
  }, []);

  return (
    <>
      <div className={styles.row}>
        <p className={styles.firstName}>Admin: {firstName}</p>
        <button
          className={styles.logout}
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
      <br />
      <h4>Select a data table:</h4>
      <nav>
        <Link to="/admin-profile">Orders</Link>
        <Link to="/admin-profile/all-inquiries">Inquiries</Link>
        <Link to="/admin-profile/all-users">Users</Link>
        <Link to="/admin-profile/all-surveys">Surveys</Link>
        <Link to="/admin-profile/all-products">Products</Link>
      </nav>
    </>
  );
};

export default AdminProfile;
