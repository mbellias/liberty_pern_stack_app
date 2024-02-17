import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logoutAsync } from '../../../store/auth-slice';
import Order from './Order';
import UpdateOrderStatus from './UpdateOrderStatus';
import BASE_URL from '../../../config';
import styles from './OrderData.module.css';

const OrderData = () => {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/get-all-orders`,
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

        const { orders, orderArrays } = response.data;

        setOrders(orders);
        setOrderItems(orderArrays);
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

    fetchOrders();
  }, [user, dispatch]);

  if (loading) {
    return <p className={styles.loading}>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      {orders.length > 0 ? (
        <>
          <UpdateOrderStatus />
          <h2 className={styles.title}>Order Data</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Distributor ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Order</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <Order
                  key={order.id}
                  order={order}
                  orderItems={orderItems[index]}
                />
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

export default OrderData;
