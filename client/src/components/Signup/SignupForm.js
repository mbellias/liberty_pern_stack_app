import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';
import useInput from '../../hooks/use-input';
import Card from '../UI/Card';
import BASE_URL from '../../config';
import styles from './SignupForm.module.css';

const SignupForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRole, setSelectedRole] = useState('Seleccionar');

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

  if (
    enteredNameIsValid &&
    enteredLastNameIsValid &&
    enteredTelephoneIsValid &&
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    enteredConfirmPasswordIsValid
  ) {
    formIsValid = true;
  }

  const roleChangeHandler = (event) => {
    setSelectedRole(event.target.value);
  };

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

    if (!enteredPasswordIsValid) {
      return;
    }

    if (!enteredConfirmPasswordIsValid) {
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/api/register`,
        {
          role: selectedRole,
          first_name: enteredName,
          last_name: enteredLastName,
          phone_number: enteredTelephone,
          email: enteredEmail,
          password: enteredConfirmPassword,
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
      resetLastNameInput();
      resetTelephoneInput();
      resetEmailInput();
      resetPasswordInput();
      resetConfirmPasswordInput();
    } catch (error) {
      setError(error.response.data);
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
          <h3>¡Gracias por registrarte!</h3>
          <p>
            Por favor revise su correo electrónico y haga clic en el enlace para
            verificar.Si no está en la bandeja de entrada normal, revisa tu
            carpeta de spam o basura.
          </p>
        </Card>
      ) : (
        <div className={styles.container}>
          <NavLink
            to="/login"
            className={styles.back}
          >
            <i className="material-icons">arrow_back_ios</i>
          </NavLink>
          <form
            className={styles.form}
            onSubmit={formSubmissionHandler}
          >
            {error && <p className={styles['error-text']}>{error.message}</p>}
            <h3>Inscribirse</h3>
            <h4>
              Regístrese para realizar el seguimiento de sus pedidos y
              consultas.
            </h4>
            <div className={styles['form-control']}>
              <label htmlFor="role">Tipo de Cuenta:</label>
              <select
                id="role"
                name="role"
                value={selectedRole}
                onChange={roleChangeHandler}
                required
              >
                <option value="seleccionar">Seleccionar</option>
                <option value="client">Cliente</option>
                <option value="distributor">Distribuidor</option>
              </select>
            </div>
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
              <button
                className={styles['submit-button']}
                disabled={!formIsValid}
              >
                Entregar
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default SignupForm;
