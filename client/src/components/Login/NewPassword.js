import { useState } from 'react';
import { useParams } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';
import useInput from '../../hooks/use-input';
import Card from '../UI/Card';
import BASE_URL from '../../config';
import styles from './NewPassword.module.css';

const NewPassword = () => {
  const { token } = useParams();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => validator.isStrongPassword(value));

  const {
    value: enteredConfirmPassword,
    isValid: enteredConfirmPasswordIsValid,
    hasError: confirmPasswordInputHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    valueBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPasswordInput,
  } = useInput((value) => validator.equals(value, enteredPassword));

  let formIsValid = false;

  if (enteredPasswordIsValid && enteredConfirmPasswordIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    if (!enteredPasswordIsValid) {
      return;
    }

    if (!enteredConfirmPasswordIsValid) {
      return;
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/api/password-reset/update-password`,
        {
          token,
          newPassword: enteredConfirmPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      if (response.data) {
        setFormSubmitted(true);
      }

      resetPasswordInput();
      resetConfirmPasswordInput();
    } catch (error) {
      console.error('Error submitting form:', error);

      if (error.response && error.response.status === 400) {
        setError(
          'El enlace para restablecer la contraseña expiró. Solicite que se le envíe un nuevo enlace a su correo electrónico.'
        );
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  const passwordInputClasses = passwordInputHasError
    ? `${styles['form-control']} ${styles.invalid}`
    : `${styles['form-control']}`;

  const confirmPasswordInputClasses = confirmPasswordInputHasError
    ? `${styles['form-control']} ${styles.invalid}`
    : `${styles['form-control']}`;

  return (
    <>
      {formSubmitted ? (
        <Card className={styles.card}>
          <h3 className={styles.submitted}>
            ¡Tu contraseña ha sido restablecida!
          </h3>
        </Card>
      ) : (
        <form
          className={styles.form}
          onSubmit={formSubmissionHandler}
        >
          {error && <p className={styles['error-text']}>{error}</p>}
          <h4>Por favor ingrese una nueva contraseña.</h4>
          <div className={passwordInputClasses}>
            <label htmlFor="password">Contraseña:</label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              value={enteredPassword}
              required
            />
            {passwordInputHasError && (
              <>
                <ul className={styles['error-text']}>
                  <p>Su contraseña debe incluir: </p>
                  <li>Longitud mínima: 8</li>
                  <li>Minúsculas mínimas: 1</li>
                  <li>Mayúsculas mínimas: 1</li>
                  <li>Números mínimos: 1</li>
                  <li>Símbolos mínimos: 1 (@, $, %, etc.)</li>
                </ul>
              </>
            )}
          </div>
          <div className={confirmPasswordInputClasses}>
            <label htmlFor="password">Confirmar Contraseña:</label>
            <input
              id="confirm-password"
              type="password"
              name="confirm-password"
              onChange={confirmPasswordChangeHandler}
              onBlur={confirmPasswordBlurHandler}
              value={enteredConfirmPassword}
              required
            />
            {confirmPasswordInputHasError && (
              <p className={styles['error-text']}>
                Por favor ingrese su contraseña nuevamente para confirmar.
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

export default NewPassword;
