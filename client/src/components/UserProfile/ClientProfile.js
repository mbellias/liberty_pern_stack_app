import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import styles from './ClientProfile.module.css';

const ClientProfile = ({ onLogout }) => {
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
        <p className={styles.firstName}>¡Bienvenido, {firstName}!</p>
        <button
          className={styles.logout}
          onClick={onLogout}
        >
          Cerrar sesión
        </button>
      </div>
      <br />
      <nav>
        <Link to="/user-profile">Historia</Link>
        <Link to="/user-profile/inquiries">Consultas</Link>
        <a
          className={styles.email}
          href="mailto:info@libertynutritionsystem.com"
          target="_blank"
          rel="noreferrer"
        >
          Apoyo
        </a>
      </nav>
    </>
  );
};

export default ClientProfile;
