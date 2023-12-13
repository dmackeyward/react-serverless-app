import React, { useState, useEffect } from 'react';
import styles from './Login.module.css';
import Message from './Message';
import useInput from '../hooks/use-input';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 
import { Link } from 'react-router-dom';

const Login = () => {

  const { login, isLoggedIn } = useAuth(); 
  const [error, setError] = useState('');
  const navigate = useNavigate();


  //redirect home if the user is already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn, navigate])
  

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailFieldReset,
  } = useInput((value) => value.trim() !== ''); 

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordFieldReset,
  } = useInput((value) => value.trim() !== ''); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await login(enteredEmail, enteredPassword); 

      emailFieldReset();
      passwordFieldReset();

      navigate('/');

    } catch (error) {
      console.log(error);
      setError('Invalid email or password.');
    }
  };

  const handleClose = () => {
    setError(null);
  }

  const emailClasses = emailHasError ? styles.invalid : styles.formGroup;
  const passwordClasses = passwordHasError ? styles.invalid : styles.formGroup;
  const renderError = () => error && <Message variant="error" children={error} onClose={handleClose} />;

  return (
    <div>
      {error && renderError()}
      <div className={styles.loginContainer}>
        <h2 className={styles.title}>Login</h2>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={emailClasses}>
            <label htmlFor="email" className={styles.label}>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={enteredEmail}
              onChange={emailChangeHandler}
              required
              className={styles.inputField}
              onBlur={emailBlurHandler}
            />
            {emailHasError && <p className={styles.errorText}>Please enter a valid email address.</p>}
          </div>
          <div className={passwordClasses}>
            <label htmlFor="password" className={styles.label}>Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={enteredPassword}
              onChange={passwordChangeHandler}
              required
              className={styles.inputField}
              onBlur={passwordBlurHandler}
            />
            {passwordHasError && <p className={styles.errorText}>Please enter a valid password.</p>}
          </div>

          <button disabled={!emailIsValid || !passwordIsValid} type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
        <span>Don't have an account yet? <Link to="/register">Register here</Link></span>
      </div>
    </div>
  );
};

export default Login;
