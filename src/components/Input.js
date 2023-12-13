import React, { useEffect, useState } from 'react';
import styles from './Input.module.css';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import useCompare from '../hooks/use-compare'
import Message from ".//Message"

const Input = () => {

    const { isLoggedIn } = useAuth();
    const { postCompare, handleInputChange, age, height, income } = useCompare();
    const navigate = useNavigate();
    const [success, setSuccess] = useState('')

    //redirect home if the user is already logged in
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
        }
    }, [isLoggedIn, navigate])

    const handleSubmit = () => {
        setSuccess('Success! Please visit the Results section to see how you compare to other users');
    }

    const handleClose = () => {
        setSuccess(null);
    }

    let formIsValid = false

    if (age !== "" && height !== "" && income !== "") {
        formIsValid = true;
    }

    const renderSuccess = () => success && <Message variant="success" children={success} onClose={handleClose} />;

    return (
        <div>
            {success && renderSuccess()}
            <div className={styles.compareContainer}>
                <h2 className={styles.title}>Compare Yourself</h2>
                <form onSubmit={postCompare} className={styles.compareForm}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            Age:
                            <input type="number" value={age} onChange={(e) => handleInputChange('age', e.target.value)} className={styles.inputField} />
                        </label>
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            Height (in cm):
                            <input type="number" value={height} onChange={(e) => handleInputChange('height', e.target.value)} className={styles.inputField} />
                        </label>
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            Income ($/month):
                            <input type="number" value={income} onChange={(e) => handleInputChange('income', e.target.value)} className={styles.inputField} />
                        </label>
                    </div>
                    <button type="submit" disabled={!formIsValid} className={styles.submitButton} onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Input;
