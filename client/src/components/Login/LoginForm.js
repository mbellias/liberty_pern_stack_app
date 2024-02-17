import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync, setUser, setError } from '../../store/auth-slice';
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';
import Cookies from 'js-cookie';
import useInput from '../../hooks/use-input';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => validator.isEmail(value));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => validator.isStrongPassword(value));

  const rememberMeCheckboxRef = useRef();

  let formIsValid = false;

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    if (!enteredEmailIsValid || !enteredPasswordIsValid) {
      return;
    }

    try {
      const response = await dispatch(
        loginAsync({ email: enteredEmail, password: enteredPassword })
      );

      if (response.payload && response.payload.user) {
        dispatch(setUser(response.payload.user));
        dispatch(setError(null));
        resetEmailInput();
        resetPasswordInput();
        navigate('/');
      }

      if (rememberMeCheckboxRef.current.checked) {
        Cookies.set('rememberedEmail', enteredEmail, { expires: 7 });
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        dispatch(setError('Please verify your email before logging in.'));
      } else {
        console.error('Error submitting form:', err);
      }
    }
  };

  useEffect(() => {
    const rememberedEmail = Cookies.get('rememberedEmail');
    if (rememberedEmail) {
      emailChangeHandler({ target: { value: rememberedEmail } });
    }
  }, [emailChangeHandler]);

  return (
    <main className={styles.login}>
      <form
        className={styles.form}
        onSubmit={formSubmissionHandler}
      >
        <h4>Inicie sesión en su cuenta.</h4>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles['user-info']}>
          <input
            type="email"
            id="email"
            name="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            placeholder="Correo"
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            placeholder="Contraseña"
            required
          />
        </div>
        <button
          className={styles['login-button']}
          disabled={!formIsValid}
        >
          Iniciar Sesión
        </button>
        <div className={styles.suggestions}>
          <div className={styles.remember}>
            <input
              type="checkbox"
              defaultChecked={rememberMeCheckboxRef.current?.checked}
              ref={rememberMeCheckboxRef}
            />
            <span>Acuérdate de Mí</span>
          </div>
          <div className={styles.forgot}>
            <Link
              to="/password-reset"
              className={styles.forgot}
            >
              ¿Has olvidado tu contraseña?
            </Link>
          </div>
        </div>
        <br />
        <Link
          to="/signup"
          className={styles.signup}
        >
          Inscribirse
        </Link>
      </form>
    </main>
  );
};

export default LoginForm;
