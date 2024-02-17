import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '../UI/Card';
import BASE_URL from '../../config';
import styles from './VerifyEmail.module.css';

const VerifyEmail = () => {
  const { token } = useParams();
  const [verificationStatus, setVerificationStatus] = useState(null);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/verify-email/${token}`
        );

        setVerificationStatus(response.status);
        console.log('Email verified successfully', response.data);
      } catch (error) {
        if (error.response) {
          const status = error.response.status;
          setVerificationStatus(status);
          console.error(
            `Error verifying email - Status: ${status}`,
            error.response.data
          );
        } else if (error.request) {
          console.error(
            'Error verifying email - No response received',
            error.request
          );
        } else {
          console.error(
            'Error verifying email - Request setup error',
            error.message
          );
        }
      }
    };

    verifyEmail();
  }, [token]);

  let message;

  if (verificationStatus === 200) {
    message = <p>¡Gracias por verificar tu e-mail!</p>;
  } else {
    message = <p>Algo salió mal. Por favor, inténtelo de nuevo más tarde.</p>;
  }

  return (
    <Card className={styles.card}>
      <h4>{message}</h4>
    </Card>
  );
};

export default VerifyEmail;
