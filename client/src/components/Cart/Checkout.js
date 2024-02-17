import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import axios from 'axios';
import { fetchClearCart } from '../../store/cart-actions';
import useInput from '../../hooks/use-input';
import BASE_URL from '../../config';
import styles from './Checkout.module.css';

const Checkout = ({ onClose }) => {
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotal = cartItems
    ? cartItems.reduce((total, item) => total + item.totalPrice, 0)
    : 0;

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangeHandler,
    valueBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredTelephone,
    isValid: enteredTelephoneIsValid,
    hasError: telephoneInputHasError,
    valueChangeHandler: telephoneChangeHandler,
    valueBlurHandler: telephoneBlurHandler,
    reset: resetTelephoneInput,
  } = useInput((value) => validator.isNumeric(value) && value.length === 10);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => validator.isEmail(value));

  const {
    value: enteredSalesId,
    isValid: enteredSalesIdIsValid,
    hasError: salesIdInputHasError,
    valueChangeHandler: salesIdChangeHandler,
    valueBlurHandler: salesIdBlurHandler,
    reset: resetSalesIdInput,
  } = useInput((value) => value.trim() !== '');

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredLastNameIsValid &&
    enteredTelephoneIsValid &&
    enteredEmailIsValid &&
    enteredSalesIdIsValid
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    let userId = null;

    if (!enteredNameIsValid) {
      return;
    }

    if (!enteredLastNameIsValid) {
      return;
    }

    if (!enteredTelephoneIsValid) {
      return;
    }

    if (!enteredEmailIsValid) {
      return;
    }

    if (!enteredSalesIdIsValid) {
      return;
    }

    if (user) {
      userId = user.user_id;
    }

    try {
      await axios.post(
        `${BASE_URL}/api/submit-order`,
        {
          user_id: userId,
          first_name: enteredName,
          last_name: enteredLastName,
          phone_number: enteredTelephone,
          email: enteredEmail,
          distributor_id: enteredSalesId,
          cartItems,
          cartTotal,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      setFormSubmitted(true);
      dispatch(fetchClearCart());
      resetNameInput();
      resetLastNameInput();
      resetTelephoneInput();
      resetEmailInput();
      resetSalesIdInput();
    } catch (error) {
      console.error('Error submitting form:', error);

      if (error.response && error.response.status === 400) {
        setError('Correo ya en uso.');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  const nameInputClasses = nameInputHasError
    ? `${styles['form-control']} ${styles.invalid}`
    : `${styles['form-control']}`;

  const lastNameInputClasses = lastNameInputHasError
    ? `${styles['form-control']} ${styles.invalid}`
    : `${styles['form-control']}`;

  const telephoneInputClasses = telephoneInputHasError
    ? `${styles['form-control']} ${styles.invalid}`
    : `${styles['form-control']}`;

  const emailInputClasses = emailInputHasError
    ? `${styles['form-control']} ${styles.invalid}`
    : `${styles['form-control']}`;

  const salesIdInputClasses = salesIdInputHasError
    ? `${styles['form-control']} ${styles.invalid}`
    : `${styles['form-control']}`;

  const containerClasses = formSubmitted
    ? `${styles.submitted}`
    : `${styles.container}`;

  return (
    <div className={containerClasses}>
      {formSubmitted ? (
        <>
          <span
            onClick={onClose}
            className={styles['close-button']}
          >
            <i className="material-icons">close</i>
          </span>
          <h3>
            ¡Gracias por enviar su pedido y un representante se comunicará con
            usted para cumplirlo!
          </h3>
        </>
      ) : (
        <>
          <span
            onClick={onClose}
            className={styles['close-button']}
          >
            <i className="material-icons">close</i>
          </span>
          <h2 className={styles.title}>Resumen del Pedido</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <div>
                  <strong>{item.name}</strong>
                </div>
                <div>Cantidad: {item.quantity}</div>
                <div>Total: ${item.totalPrice.toFixed(2)}</div>
              </li>
            ))}
          </ul>
          <h4>Total: ${cartTotal.toFixed(2)}</h4>
          <form
            className={styles.form}
            onSubmit={formSubmissionHandler}
          >
            {error && <p className={styles['error-text']}>{error}</p>}
            <h4>
              Por favor ingrese su información y un representante se comunicará
              con usted para realizar su pedido.
            </h4>
            <div className={nameInputClasses}>
              <label htmlFor="firstName">Nombre:</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
                value={enteredName}
                required
              />
              {nameInputHasError && (
                <p className={styles['error-text']}>
                  El nombre no debe estar vacío.
                </p>
              )}
            </div>
            <div className={lastNameInputClasses}>
              <label htmlFor="lastName">Apellido:</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                onChange={lastNameChangeHandler}
                onBlur={lastNameBlurHandler}
                value={enteredLastName}
                required
              />
              {lastNameInputHasError && (
                <p className={styles['error-text']}>
                  {' '}
                  El apellido no debe estar vacío.
                </p>
              )}
            </div>
            <div className={telephoneInputClasses}>
              <label htmlFor="phoneNumber">Teléfono:</label>
              <input
                id="phoneNumber"
                type="tel"
                name="phoneNumber"
                onChange={telephoneChangeHandler}
                onBlur={telephoneBlurHandler}
                value={enteredTelephone}
                required
              />
              {telephoneInputHasError && (
                <p className={styles['error-text']}>
                  Por favor ingrese un número de teléfono válido. Sin guiones
                  '-'.
                </p>
              )}
            </div>
            <div className={emailInputClasses}>
              <label htmlFor="email">Correo:</label>
              <input
                id="email"
                type="email"
                name="email"
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                value={enteredEmail}
                required
              />
              {emailInputHasError && (
                <p className={styles['error-text']}>
                  Por favor introduzca una dirección de correo válida.
                </p>
              )}
            </div>
            <div className={salesIdInputClasses}>
              <label htmlFor="salesId">ID del Distribuidor:</label>
              <input
                id="salesId"
                type="salesId"
                name="salesId"
                onChange={salesIdChangeHandler}
                onBlur={salesIdBlurHandler}
                value={enteredSalesId}
                required
              />
              {salesIdInputHasError && (
                <p className={styles['error-text']}>
                  Ingrese un número de identificación de distribuidor válido
                  proporcionado por su distribuidor. Si no está seguro de qué es
                  esto, ¡contáctenos!
                </p>
              )}
            </div>
            <div className={styles['button-container']}>
              <button
                className={styles.button}
                disabled={!formIsValid}
              >
                Entregar
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Checkout;
