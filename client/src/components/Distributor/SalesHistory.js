import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logoutAsync } from '../../store/auth-slice';
import Sale from './Sale';
import BASE_URL from '../../config';
import styles from './SalesHistory.module.css';

const SalesHistory = () => {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const distributor_id = user.distributor_id;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/get-distributor-orders`,
          {
            distributor_id,
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
  }, [distributor_id, dispatch]);

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
          <h2 className={styles.title}>Historial de Ventas</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
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
                <Sale
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

export default SalesHistory;
