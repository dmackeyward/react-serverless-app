import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {

    const { isLoggedIn, user } = useAuth();

    return (
        <div className={styles.homeContainer}>
            {isLoggedIn ? (
                <div>
                    <h1>Welcome {user}</h1>
                    <span>Please <Link to="/input">Input</Link> Your Data or Compare Your <Link to="/results">Results</Link></span>
                </div>


            ) : (
                <div>
                    <h1>Welcome Guest</h1>
                    <span>Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link></span>
                </div>
            )}
            {/* Other components/content for the Home page */}
        </div>
    );
};

export default Home;
