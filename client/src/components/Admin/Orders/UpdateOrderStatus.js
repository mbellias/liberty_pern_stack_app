import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logoutAsync } from '../../../store/auth-slice';
import validator from 'validator';
import useInput from '../../../hooks/use-input';
import BASE_URL from '../../../config';
import styles from './UpdateOrderStatus.module.css';

const UpdateOrderStatus = () => {
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const {
    value: enteredId,
    isValid: enteredIdIsValid,
    valueChangeHandler: idChangeHandler,
    valueBlurHandler: idBlurHandler,
    reset: resetIdInput,
  } = useInput((value) => validator.isNumeric(value));

  const statusChangeHandler = (event) => {
    const selectedStatus = event.target.value;
    setStatus(selectedStatus);
  };

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    if (!enteredIdIsValid) {
      return <p>Enter a valid ID.</p>;
    }

    try {
      await axios.put(
        `${BASE_URL}/api/update-order-status`,
        {
          role: user.role,
          id: enteredId,
          status,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      setSubmitted(true);
      resetIdInput();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logoutAsync());
      } else {
        setError(error.message);
      }
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <main>
      <form
        onSubmit={formSubmissionHandler}
        className={styles.statusForm}
      >
        <h4>Update Order Status:</h4>
        {submitted && <p className={styles.statusUpdated}>Status updated</p>}
        <div className={styles.orderId}>
          <label>Order ID:</label>
          <input
            type="id"
            id="id"
            name="id"
            value={enteredId}
            onChange={idChangeHandler}
            onBlur={idBlurHandler}
            required
          />
        </div>
        <fieldset>
          <legend>Select order status:</legend>
          <label className={styles.status}>
            <input
              type="radio"
              name="status"
              value="Cancelado"
              checked={status === 'Cancelado'}
              onChange={statusChangeHandler}
            />
            Cancelado
          </label>
          <br />
          <label className={styles.status}>
            <input
              type="radio"
              name="status"
              value="Cumplido"
              checked={status === 'Cumplido'}
              onChange={statusChangeHandler}
            />
            Cumplido
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default UpdateOrderStatus;
