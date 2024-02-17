import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logoutAsync } from '../../store/auth-slice';
import Inquiry from './Inquiry';
import BASE_URL from '../../config';
import styles from './InquiryHistory.module.css';

const InquiryHistory = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const user_id = user.user_id;

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/get-inquiries`,
          {
            user_id,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );

        setInquiries(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          dispatch(logoutAsync());
        } else {
          setError(error.message);
        }
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [user_id, dispatch]);

  if (loading) {
    return <p className={styles.loading}>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {inquiries.length > 0 ? (
        <>
          <h2 className={styles.title}>Historial de Consultas</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Productos</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry) => (
                <Inquiry
                  key={inquiry.id}
                  inquiry={inquiry}
                />
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p className={styles.empty}>Sin historial de consultas.</p>
      )}
    </div>
  );
};

export default InquiryHistory;
