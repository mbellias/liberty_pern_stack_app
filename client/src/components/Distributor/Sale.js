import styles from './Sale.module.css';

const Sale = ({ order, orderItems }) => {
  const parsedOrderItems = orderItems.map((item) => item);

  return (
    <tr>
      <td data-label="ID">{order.id}</td>
      <td data-label="Nombre">{order.first_name}</td>
      <td data-label="Apellido">{order.last_name}</td>
      <td data-label="Correo">{order.email}</td>
      <td data-label="Teléfono">{order.phone_number}</td>
      <td data-label="Pedido">
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
      <td data-label="Estado">{order.status}</td>
    </tr>
  );
};

export default Sale;
