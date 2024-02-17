import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logoutAsync } from '../../store/auth-slice';
import Order from './Order';
import BASE_URL from '../../config';
import styles from './OrderHistory.module.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const user_id = user.user_id;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/get-orders`,
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
  }, [user_id, dispatch]);

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
          <h2 className={styles.title}>Historial de Pedidos</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>ID del Distribuidor</th>
                <th>Nombre</th>
                <th>Appellido</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Pedido</th>
                <th>Total</th>
                <th>Estado</th>
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
        <p className={styles.empty}>Sin historial de pedidos.</p>
      )}
    </>
  );
};

export default OrderHistory;
