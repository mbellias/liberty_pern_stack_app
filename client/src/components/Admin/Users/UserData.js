import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logoutAsync } from '../../../store/auth-slice';
import BASE_URL from '../../../config';
import styles from './UserData.module.css';

const UserData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/get-all-users`,
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

        setUsers(response.data);
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

    fetchUsers();
  }, [user, dispatch]);

  if (loading) {
    return <p className={styles.loading}>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      {users.length > 0 ? (
        <>
          <h2 className={styles.title}>User Data</h2>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Email Verified</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.user_id}>
                  <td data-label="User ID">{user.user_id}</td>
                  <td data-label="First Name">{user.first_name}</td>
                  <td data-label="Last Name">{user.last_name}</td>
                  <td data-label="Email">{user.email}</td>
                  <td data-label="Phone Number">{user.phone_number}</td>
                  <td data-label="Email Verified">
                    {user.is_verified ? 'True' : 'False'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p className={styles.empty}>No order history.</p>
      )}
    </>
  );
};

export default UserData;
