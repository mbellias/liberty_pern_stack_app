import { useState } from 'react';
import { useSelector } from 'react-redux';
import useInput from '../../hooks/use-input';
import validator from 'validator';
import axios from 'axios';
import BASE_URL from '../../config';
import styles from './Inquiry.module.css';

const Inquiry = ({ onClose }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => validator.isEmail(value));

  const {
    value: enteredTelephone,
    isValid: enteredTelephoneIsValid,
    hasError: telephoneInputHasError,
    valueChangeHandler: telephoneChangeHandler,
    valueBlurHandler: telephoneBlurHandler,
    reset: resetTelephoneInput,
  } = useInput((value) => validator.isNumeric(value) && value.length === 10);

  let formIsValid =
    enteredNameIsValid && (enteredEmailIsValid || enteredTelephoneIsValid);

  const productChangeHandler = (event) => {
    const productName = event.target.value;
    if (selectedProducts.includes(productName)) {
      setSelectedProducts((prevProducts) =>
        prevProducts.filter((product) => product !== productName)
      );
    } else {
      setSelectedProducts((prevProducts) => [...prevProducts, productName]);
    }
  };

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    let userId = null;

    if (
      !enteredNameIsValid &&
      !(enteredEmailIsValid || enteredTelephoneIsValid)
    ) {
      return;
    }

    if (user) {
      userId = user.user_id;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/submit-inquiry`,
        {
          name: enteredName,
          user_id: userId,
          email: enteredEmail,
          phone_number: enteredTelephone,
          products: selectedProducts,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      console.log(response.data);

      setFormSubmitted(true);
      resetNameInput();
      resetEmailInput();
      resetTelephoneInput();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const nameInputClasses = nameInputHasError
    ? `${styles['form-control']} ${styles.invalid}`
    : `${styles['form-control']}`;

  const emailInputClasses = emailInputHasError
    ? `${styles['form-control']} ${styles.invalid}`
    : `${styles['form-control']}`;

  const telephoneInputClasses = telephoneInputHasError
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
          <h3>¡Un representante se comunicará con usted en breve!</h3>
        </>
      ) : (
        <>
          <span
            onClick={onClose}
            className={styles['close-button']}
          >
            <i className="material-icons">close</i>
          </span>
          <h2 className={styles.title}>
            ¡Dinos qué producto te interesa y te ayudaremos!
          </h2>
          <form
            className={styles.form}
            onSubmit={formSubmissionHandler}
          >
            <div className={nameInputClasses}>
              <label htmlFor="name">Nombre:</label>
              <input
                type="name"
                id="name"
                name="name"
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
            <h5>Puedes introducir tu correo o teléfono.</h5>
            <div className={emailInputClasses}>
              <label htmlFor="email">Correo:</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                value={enteredEmail}
              />
              {emailInputHasError && (
                <p className={styles['error-text']}>
                  Por favor introduzca una dirección de correo válida.
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
              />
              {telephoneInputHasError && (
                <p className={styles['error-text']}>
                  Por favor ingrese un número de teléfono válido. Sin guiones
                  '-'.
                </p>
              )}
            </div>
            <fieldset className={styles.survey}>
              <legend className={styles['survey-title']}>
                ¿En qué productos estás interesado?
              </legend>
              <label className={styles.category}>
                <input
                  type="checkbox"
                  name="products"
                  value="Filtro de Agua S/S"
                  onChange={productChangeHandler}
                  checked={selectedProducts.includes('Filtro de Agua S/S')}
                />
                Filtro de Agua S/S
              </label>
              <br />
              <label className={styles.category}>
                <input
                  type="checkbox"
                  name="products"
                  value="Filtro de Agua C/T 2000"
                  onChange={productChangeHandler}
                  checked={selectedProducts.includes('Filtro de Agua C/T 2000')}
                />
                Filtro de Agua C/T 2000
              </label>
              <br />
              <label className={styles.category}>
                <input
                  type="checkbox"
                  name="products"
                  value="13-Pcs Juego de Utensilios de Cocina"
                  onChange={productChangeHandler}
                  checked={selectedProducts.includes(
                    '13-Pcs Juego de Utensilios de Cocina'
                  )}
                />
                13-Pcs Juego de Utensilios de Cocina
              </label>
              <br />
              <label className={styles.category}>
                <input
                  type="checkbox"
                  name="products"
                  value="17-Pcs Juego de Utensilios de Cocina"
                  onChange={productChangeHandler}
                  checked={selectedProducts.includes(
                    '17-Pcs Juego de Utensilios de Cocina'
                  )}
                />
                17-Pcs Juego de Utensilios de Cocina
              </label>
              <br />
              <label className={styles.category}>
                <input
                  type="checkbox"
                  name="products"
                  value="22-Pcs Juego de Utensilios de Cocina"
                  onChange={productChangeHandler}
                  checked={selectedProducts.includes(
                    '22-Pcs Juego de Utensilios de Cocina'
                  )}
                />
                22-Pcs Juego de Utensilios de Cocina
              </label>
              <br />
              <label className={styles.category}>
                <input
                  type="checkbox"
                  name="products"
                  value="Pavera de 22 lbs."
                  onChange={productChangeHandler}
                  checked={selectedProducts.includes('Pavera de 22 lbs.')}
                />
                Pavera de 22 lbs.
              </label>
              <br />
              <label className={styles.category}>
                <input
                  type="checkbox"
                  name="products"
                  value="Bone China 20-pc Dining Set"
                  onChange={productChangeHandler}
                  checked={selectedProducts.includes(
                    'Bone China 20-pc Dining Set'
                  )}
                />
                Bone China 20-pc Dining Set
              </label>
              <br />
              <label className={styles.category}>
                <input
                  type="checkbox"
                  name="products"
                  value="Bone China 5-pc Serving Set"
                  onChange={productChangeHandler}
                  checked={selectedProducts.includes(
                    'Bone China 5-pc Serving Set'
                  )}
                />
                Bone China 5-pc Serving Set
              </label>
              <br />
              <label className={styles.category}>
                <input
                  type="checkbox"
                  name="products"
                  value="Bone China Single-Pc"
                  onChange={productChangeHandler}
                  checked={selectedProducts.includes('Bone China Single-Pc')}
                />
                Bone China Single-Pc
              </label>
              <br />
              <label className={styles.category}>
                <input
                  type="checkbox"
                  name="products"
                  value="20-Pc Cutlery Set"
                  onChange={productChangeHandler}
                  checked={selectedProducts.includes('20-Pc Cutlery Set')}
                />
                20-Pc Cutlery Set
              </label>
            </fieldset>
            <button
              className={styles.button}
              type="submit"
              disabled={!formIsValid}
            >
              Entregar
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Inquiry;
