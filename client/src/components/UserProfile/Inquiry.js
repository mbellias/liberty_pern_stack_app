import styles from './Inquiry.module.css';

const Inquiry = ({ inquiry }) => {
  return (
    <tr>
      <td data-label="ID">{inquiry.id}</td>
      <td data-label="Nombre">{inquiry.name}</td>
      <td data-label="Correo">{inquiry.email}</td>
      <td data-label="Teléfono">{inquiry.phone_number}</td>
      <td data-label="Productos">
        <ul>
          {inquiry.products.map((item, index) => (
            <li
              key={index}
              className={styles.inquiry}
            >
              <strong>{item}</strong>
            </li>
          ))}
        </ul>
      </td>
      <td data-label="Estado">{inquiry.status}</td>
    </tr>
  );
};

export default Inquiry;
