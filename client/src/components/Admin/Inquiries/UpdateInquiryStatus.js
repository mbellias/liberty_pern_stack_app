import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logoutAsync } from '../../../store/auth-slice';
import validator from 'validator';
import useInput from '../../../hooks/use-input';
import BASE_URL from '../../../config';
import styles from './UpdateInquiryStatus.module.css';

const UpdateInquiryStatus = () => {
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
        `${BASE_URL}/api/update-inquiry-status`,
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
        <h4>Update Inquiry Status:</h4>
        <div className={styles.inquiryId}>
          <label>Inquiry ID:</label>
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
          <legend>Change inquiry status:</legend>
          <label className={styles.status}>
            <input
              type="checkbox"
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

      {submitted && <p className={styles.statusUpdated}>Status updated</p>}
    </main>
  );
};

export default UpdateInquiryStatus;
