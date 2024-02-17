import { useState } from 'react';
import axios from 'axios';
import validator from 'validator';
import useInput from '../../hooks/use-input';
import Card from '../UI/Card';
import BASE_URL from '../../config';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

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
    value: enteredMessage,
    isValid: enteredMessageIsValid,
    hasError: messageInputHasError,
    valueChangeHandler: messageChangeHandler,
    valueBlurHandler: messageBlurHandler,
    reset: resetMessageInput,
  } = useInput((value) => value.length <= 300 && value.length > 3);

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredLastNameIsValid &&
    enteredTelephoneIsValid &&
    enteredEmailIsValid &&
    enteredMessageIsValid
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

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

    if (!enteredMessageIsValid) {
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/submit-contact-form`,
        {
          firstName: enteredName,
          lastName: enteredLastName,
          phoneNumber: enteredTelephone,
          email: enteredEmail,
          message: enteredMessage,
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
      resetLastNameInput();
      resetTelephoneInput();
      resetEmailInput();
      resetMessageInput();
    } catch (error) {
      console.error('Error submitting form:', error);
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

  const messageInputClasses = messageInputHasError
    ? `${styles['form-control']} ${styles.invalid}`
    : `${styles['form-control']}`;

  return (
    <>
      {formSubmitted ? (
        <Card className={styles.card}>
          <h3 className={styles.submitted}>
            ¡Gracias! Un representante se comunicará con usted en breve.
          </h3>
        </Card>
      ) : (
        <form
          className={styles.form}
          onSubmit={formSubmissionHandler}
        >
          <h3>¿Tengo una pregunta?</h3>
          <div className={styles['form-row']}>
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
          </div>

          <div className={styles['form-row']}>
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
          </div>
          <div className={messageInputClasses}>
            <label htmlFor="message">Mensaje:</label>
            <textarea
              id="message"
              type="message"
              name="message"
              rows="5"
              onChange={messageChangeHandler}
              onBlur={messageBlurHandler}
              value={enteredMessage}
              required
            />
            {messageInputHasError && (
              <p className={styles['error-text']}>
                La longitud del mensaje debe tener entre 5 y 300 caracteres.
              </p>
            )}
          </div>
          <div className={styles['button-container']}>
            <button disabled={!formIsValid}>Entregar</button>
          </div>
        </form>
      )}
    </>
  );
};

export default ContactForm;
