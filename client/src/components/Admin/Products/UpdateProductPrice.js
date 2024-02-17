import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logoutAsync } from '../../../store/auth-slice';
import validator from 'validator';
import useInput from '../../../hooks/use-input';
import BASE_URL from '../../../config';
import styles from './UpdateProductPrice.module.css';

const UpdateProductPrice = () => {
  const [submitted, setSubmitted] = useState(false);
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

  const {
    value: enteredPrice,
    isValid: enteredPriceIsValid,
    valueChangeHandler: priceChangeHandler,
    valueBlurHandler: priceBlurHandler,
    reset: resetPriceInput,
  } = useInput((value) => validator.isNumeric(value));

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    if (!enteredIdIsValid) {
      return <p>Enter a valid ID.</p>;
    }

    if (!enteredPriceIsValid) {
      return <p>Enter a valid price.</p>;
    }

    try {
      await axios.put(
        `${BASE_URL}/api/update-product-price`,
        {
          role: user.role,
          id: enteredId,
          price: enteredPrice,
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
      resetPriceInput();
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
        className={styles.productPrice}
      >
        <h4>Update Product Price:</h4>
        {submitted && <p className={styles.priceUpdated}>Price updated</p>}
        <div className={styles.priceInput}>
          <label>Product ID:</label>
          <input
            type="id"
            id="id"
            name="id"
            value={enteredId}
            onChange={idChangeHandler}
            onBlur={idBlurHandler}
            required
          />
          <label>Enter new price:</label>
          <input
            type="price"
            id="price"
            name="price"
            value={enteredPrice}
            onChange={priceChangeHandler}
            onBlur={priceBlurHandler}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default UpdateProductPrice;
