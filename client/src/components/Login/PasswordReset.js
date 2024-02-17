import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';
import useInput from '../../hooks/use-input';
import Card from '../UI/Card';
import BASE_URL from '../../config';
import styles from './PasswordReset.module.css';

const PasswordReset = () => {
  const [error, setError] = useState(null);
  const [emailIsValid, setEmailIsValid] = useState(false);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => validator.isEmail(value));

  let formIsValid = false;

  if (enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    if (!enteredEmailIsValid) {
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/password-reset/verify-email`,
        {
          email: enteredEmail,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (response.data) {
        setEmailIsValid(true);
      }

      resetEmailInput();
    } catch (error) {
      if (error.response.status === 404) {
        setError('Correo no encontrado.');
      }
    }
  };

  return (
    <>
      {emailIsValid ? (
        <Card className={styles['email-card']}>
          <h3 className={styles.submitted}>
            Se ha enviado un enlace a su dirección de correo que le permitirá
            ingresar una nueva contraseña. Si no está en la bandeja de entrada
            normal, revisa tu carpeta de spam o basura.
          </h3>
        </Card>
      ) : (
        <div className={styles.container}>
          <NavLink
            to="/login"
            className={styles.back}
          >
            <i className="material-icons">arrow_back_ios</i>
          </NavLink>
          <main className={styles.email}>
            <form
              className={styles.form}
              onSubmit={formSubmissionHandler}
            >
              <h4>
                Ingrese un correo válido y se le enviará un enlace para
                restablecer su contraseña.
              </h4>
              {error && <p className={styles.error}>{error}</p>}
              <div className={styles['user-info']}>
                <label>Correo:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={enteredEmail}
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHandler}
                  required
                />
              </div>
              <button
                className={styles['submit-button']}
                disabled={!formIsValid}
              >
                Entregar
              </button>
            </form>
          </main>
        </div>
      )}
    </>
  );
};

export default PasswordReset;
