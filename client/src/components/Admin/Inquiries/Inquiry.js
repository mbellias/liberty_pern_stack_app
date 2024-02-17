import styles from './Inquiry.module.css';

const Inquiry = ({ inquiry }) => {
  return (
    <tr>
      <td data-label="ID">{inquiry.id}</td>
      <td data-label="User ID">
        {inquiry.user_id ? inquiry.user_id : 'None, not registered.'}
      </td>
      <td data-label="Name">{inquiry.name}</td>
      <td data-label="Email">{inquiry.email}</td>
      <td data-label="Phone Number">{inquiry.phone_number}</td>
      <td data-label="Products">
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
      <td data-label="Status">{inquiry.status}</td>
    </tr>
  );
};

export default Inquiry;
