import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logoutAsync } from '../../../store/auth-slice';
import BASE_URL from '../../../config';
import styles from './SurveyData.module.css';

const SurveyData = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/get-all-surveys`,
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

        setSurveys(response.data);
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

    fetchSurveys();
  }, [user, dispatch]);

  if (loading) {
    return <p className={styles.loading}>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      {surveys.length > 0 ? (
        <>
          <h2 className={styles.title}>Survey Data</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Categories</th>
              </tr>
            </thead>
            <tbody>
              {surveys.map((survey) => (
                <tr key={survey.id}>
                  <td data-label="ID">{survey.id}</td>
                  <td data-label="Name">{survey.name}</td>
                  <td data-label="Email">{survey.email}</td>
                  <td data-label="Categories">
                    <ul>
                      {survey.categories.map((category, index) => (
                        <li key={index}>{category}</li>
                      ))}
                    </ul>
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

export default SurveyData;
