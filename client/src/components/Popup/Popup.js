import { useState } from 'react';
import Cookies from 'js-cookie';
import useInput from '../../hooks/use-input';
import validator from 'validator';
import axios from 'axios';
import BASE_URL from '../../config';
import styles from './Popup.module.css';

const Popup = ({ onClose }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const setCookie = () => {
    Cookies.set('formSubmitted', true, { expires: 365 });
  };

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

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const categoryChangeHandler = (event) => {
    const categoryName = event.target.value;
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((category) => category !== categoryName)
      );
    } else {
      setSelectedCategories((prevCategories) => [
        ...prevCategories,
        categoryName,
      ]);
    }
  };

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    if (!enteredNameIsValid) {
      return;
    }

    if (!enteredEmailIsValid) {
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/api/submit-survey`,
        {
          name: enteredName,
          email: enteredEmail,
          categories: selectedCategories,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      setFormSubmitted(true);
      resetNameInput();
      resetEmailInput();
      setCookie();
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
          <h3>¡Gracias por tomar nuestra encuesta!</h3>
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
            ¡Responda una breve encuesta para ganar un regalo gratis!
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
            <div className={emailInputClasses}>
              <label htmlFor="email">Correo:</label>
              <input
                type="email"
                id="email"
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
            <fieldset className={styles.survey}>
              <legend className={styles['survey-title']}>
                ¿En qué productos estás interesado?
              </legend>
              <label className={styles.category}>
                <input
                  type="checkbox"
                  name="products"
                  value="Water filters"
                  onChange={categoryChangeHandler}
                  checked={selectedCategories.includes('Water filters')}
                />
                Filtros de Agua
              </label>
              <br />
              <label className={styles.category}>
                <input
                  type="checkbox"
                  name="products"
                  value="Cookware sets"
                  onChange={categoryChangeHandler}
                  checked={selectedCategories.includes('Cookware sets')}
                />
                Juegos de Utensilios de Cocina
              </label>
              <br />
              <label className={styles.category}>
                <input
                  type="checkbox"
                  name="products"
                  value="Accessories"
                  onChange={categoryChangeHandler}
                  checked={selectedCategories.includes('Accessories')}
                />
                Accesorios
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

export default Popup;
