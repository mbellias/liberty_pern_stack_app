import styles from './Order.module.css';

const Order = ({ order, orderItems }) => {
  const parsedOrderItems = orderItems.map((item) => item);

  return (
    <tr>
      <td data-label="ID">{order.id}</td>
      <td data-label="User ID">
        {order.user_id ? order.user_id : 'None, not registered.'}
      </td>
      <td data-label="Distributor ID">{order.distributor_id}</td>
      <td data-label="First Name">{order.first_name}</td>
      <td data-label="Last Name">{order.last_name}</td>
      <td data-label="Email">{order.email}</td>
      <td data-label="Phone Number">{order.phone_number}</td>
      <td data-label="Order">
        <ul>
          {parsedOrderItems.map((item, index) => (
            <li
              key={index}
              className={styles.order}
            >
              <strong>{item.name}</strong>
              <br />x{item.quantity} <br />${item.price} <br />
              Total: ${item.totalPrice}
            </li>
          ))}
        </ul>
      </td>
      <td data-label="Total">${order.total}</td>
      <td data-label="Status">{order.status}</td>
    </tr>
  );
};

export default Order;
