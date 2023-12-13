import React, { useState, useEffect } from 'react';
import styles from './Register.module.css';
import Message from ".//Message"
import useInput from "../hooks/use-input"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 
import { Link } from 'react-router-dom';

//frontend regex
const isEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
};

const isPassword = (value) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?/~]).{8,}$/;
    return passwordRegex.test(value);
};

const Register = () => {

    const { register, isLoggedIn } = useAuth(); 
    const navigate = useNavigate();
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')


    //redirect home if the user is already logged in
    useEffect(() => {
        if (isLoggedIn) {
          navigate('/')
        }
      }, [isLoggedIn, navigate])


    //frontend validation
    const {
        value: enteredEmail,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: emailFieldReset,
    } = useInput(isEmail)


    const {
        value: enteredPassword,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: passwordFieldReset,
    } = useInput(isPassword)


    const {
        value: enteredConfirmPassword,
        isValid: confirmPasswordIsValid,
        hasError: confirmPasswordHasError,
        valueChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler: confirmPasswordBlurHandler,
        reset: confirmPasswordFieldReset,
    } = useInput(isPassword)


    let formIsValid = false

    if (emailIsValid && passwordIsValid && confirmPasswordIsValid) {
        formIsValid = true;
    }


    //handles closing the error or success message
    const handleClose = () => {
        setError(null);
        setSuccess(null);
    }


    //handling form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (enteredPassword.trim() !== enteredConfirmPassword.trim()) {
            setError('Passwords do not match!');
            return;
        }

        try {
            await register(enteredEmail, enteredPassword); 
            setSuccess("Registration Successful, Please check your email to verify your account")

            // Reset form fields after successful registration
            emailFieldReset()
            passwordFieldReset()
            confirmPasswordFieldReset()

        } catch (error) {
            console.log(error)
            setError("Something went wrong!");
        }
    };

    const emailClasses = emailHasError ? styles.invalid : styles.formGroup;
    const passwordClasses = passwordHasError ? styles.invalid : styles.formGroup;
    const confirmPasswordClasses = confirmPasswordHasError ? styles.invalid : styles.formGroup;
    const renderError = () => error && <Message variant="error" children={error} onClose={handleClose} />;
    const renderSuccess = () => success && <Message variant="success" children={success} onClose={handleClose} />;

    return (
        <div>
            {error && renderError()}
            {success && renderSuccess()}
            <div className={styles.registerContainer}>
                <h2 className={styles.title}>Register</h2>
                <form onSubmit={handleSubmit} className={styles.registerForm}>
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
                    <div className={confirmPasswordClasses}>
                        <label htmlFor="passwordConfirm" className={styles.label}>Confirm Password:</label>
                        <input
                            type="password"
                            id="passwordConfirm"
                            name="passwordConfirm"
                            value={enteredConfirmPassword}
                            onChange={confirmPasswordChangeHandler}
                            required
                            className={styles.inputField}
                            onBlur={confirmPasswordBlurHandler}
                        />
                        {confirmPasswordHasError && <p className={styles.errorText}>Please enter a valid password.</p>}
                    </div>
                    <button disabled={!formIsValid} type="submit" className={styles.submitButton}>Submit</button>
                </form>
                <span>Already have an account? <Link to="/login">Login here</Link></span>
            </div>
        </div>
    );
};

export default Register;
