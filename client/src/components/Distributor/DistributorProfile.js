import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import styles from './DistributorProfile.module.css';

const DistributorProfile = ({ onLogout }) => {
  const [firstName, setFirstName] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    const userFromCookie = Cookies.get('user');
    if (userFromCookie) {
      const parsedUser = JSON.parse(userFromCookie);
      if (parsedUser && parsedUser.first_name) {
        setFirstName(parsedUser.first_name);
        setId(parsedUser.distributor_id);
      }
    }
  }, []);

  return (
    <>
      <div className={styles.row}>
        <p className={styles.firstName}>
          ¡Bienvenido, {firstName}!
          <br /> ID del Distribuidor: {id}
        </p>
        <button
          className={styles.logout}
          onClick={onLogout}
        >
          Cerrar Sesión
        </button>
      </div>
      <br />
    </>
  );
};

export default DistributorProfile;
