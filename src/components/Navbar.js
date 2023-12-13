import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css'; // Import CSS module
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {


  const { isLoggedIn, logout } = useAuth();


  const renderAuthenticatedLinks = () => (
    <>
      <li className={styles.navbar__item}>
        <NavLink to="/input" className={styles.navbar__link} >Input</NavLink>
      </li>
      <li className={styles.navbar__item}>
        <NavLink to="/results" className={styles.navbar__link} >Results</NavLink>
      </li>
      <li className={styles.navbar__item}>
        <NavLink to="/" onClick={logout} className={styles.navbar__link} >Logout</NavLink>
      </li>
    </>
  );


  const renderUnauthenticatedLinks = () => (
    <>
      <li className={styles.navbar__item}>
        <NavLink to="/login" className={styles.navbar__link} >Login</NavLink>
      </li>
      <li className={styles.navbar__item}>
        <NavLink to="/register" className={styles.navbar__link} >Register</NavLink>
      </li>
    </>
  );
  

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__container}>
        <div className={styles.navbar__header}>
          <NavLink className={styles.navbar__brand} to="/">Compare Yourself!</NavLink>
        </div>
        <ul className={styles.navbar__list}>
          {isLoggedIn ? renderAuthenticatedLinks() : renderUnauthenticatedLinks()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
