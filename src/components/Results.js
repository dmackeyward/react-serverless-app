import { useEffect, useState } from 'react';
import useCompare from '../hooks/use-compare';
import styles from './Results.module.css';
import Loader from './Loader'
import Message from './Message'

const Results = () => {

    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [income, setIncome] = useState('');
    const [single, setSingle] = useState({});
    const [data, setData] = useState([]);
    const [singleLoading, setSingleLoading] = useState(false)
    const [othersLoading, setOthersLoading] = useState(false)
    const { getSingle, getAll, deleteCompare } = useCompare();
    const [success, setSuccess] = useState('')
    const [button, setButton] = useState(false)

    useEffect(() => {
        const fetchSingle = async () => {
            try {
                setSingleLoading(true);
                const result = await getSingle();
                setSingle(result);
            } catch (error) {
                console.error(error);
            } finally {
                setSingleLoading(false);
                setButton(true);
            }
        };

        fetchSingle();
    }, [getSingle]);

    useEffect(() => {
        if (Object.keys(single).length > 0 && single["0"]) {
            const { age, height, income } = single["0"];
            if (age !== undefined && height !== undefined && income !== undefined) {
                setAge(age);
                setHeight(height);
                setIncome(income);
            }
        }

    }, [single]);

    const viewOtherUsers = async () => {
        try {
            setOthersLoading(true);
            const result = await getAll();
            setData(result);
        } catch (error) {
            console.error(error);
        } finally {
            setOthersLoading(false);
        }
    };

    const deleteYourData = async () => {
        try {
            const result = await deleteCompare();
            console.log(result);
            setAge('');
            setHeight('');
            setIncome('');
            setSuccess('Data Deleted');
            setButton(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = () => {
        setSuccess(null);
    }

    const renderSuccess = () => success && <Message variant="success" children={success} onClose={handleClose} />;

    return (
        <div>
            {success && renderSuccess()}
            <div className={styles.resultsContainer}>
                <h2 className={styles.title}>Results</h2>
                {
                    singleLoading ?
                        <Loader /> :
                        (age !== '' || height !== '' || income !== '') ? (
                            <div className={styles.results}>
                                <span className={styles.span}>Your Age: <b>{age}</b></span>
                                <span className={styles.span}>Your Height (in cm): <b>{height}</b></span>
                                <span className={styles.span}>Your Income ($/month): <b>{income}</b></span>
                            </div>
                        ) :
                            <div className={styles.results}>
                                <span className={styles.span}>Please input your data</span>
                            </div>
                }

                <div className={styles.buttonContainer}>
                    <button disabled={!button} type="submit" className={styles.deleteButton} onClick={deleteYourData}>
                        Delete Your Data
                    </button>
                    <button type="submit" className={styles.viewOthersButton} onClick={viewOtherUsers}>
                        View Other Users
                    </button>
                </div>

                {
                    othersLoading ? (
                        <Loader />
                    ) : (
                        data.length > 0 && (
                            <div className={styles.results}>
                                <h2 className={styles.secondTitle}>Other Users Data</h2>
                                <ul className={styles.ul}>
                                    {data.map((user, index) => (
                                        <li key={index} className={styles.li}>
                                            <span className={styles.span}>Age: <b>{user.age}</b></span>
                                            <span className={styles.span}>Height: <b>{user.height}</b></span>
                                            <span className={styles.span}>Income: <b>{user.income}</b></span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
};

export default Results;
