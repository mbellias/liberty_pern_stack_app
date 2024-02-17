import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logoutAsync } from '../../../store/auth-slice';
import Inquiry from './Inquiry';
import UpdateInquiryStatus from './UpdateInquiryStatus';
import BASE_URL from '../../../config';
import styles from './InquiryData.module.css';

const InquiryData = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/get-all-inquiries`,
          {
            role: user.role,
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
  }, [user, dispatch]);

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
          <UpdateInquiryStatus />
          <h2 className={styles.title}>Inquiry Data</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Products</th>
                <th>Status</th>
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
        <p className={styles.empty}>No order history.</p>
      )}
    </div>
  );
};

export default InquiryData;
