import { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

const useCompare = () => {
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [income, setIncome] = useState('');
    const { getSession } = useAuth();

    const handleInputChange = (field, value) => {
        switch (field) {
            case 'age':
                setAge(value);
                break;
            case 'height':
                setHeight(value);
                break;
            case 'income':
                setIncome(value);
                break;
            default:
                break;
        }
    };

    const postCompare = async (e) => {
        e.preventDefault();

        const { idToken } = await getSession();
       
        if (!idToken) {
            console.error('ID token not available');
            return;
        } 
        
        const idTokenValue = idToken?.toString?.();
        const ageNum = parseInt(age); 
        const heightNum = parseFloat(height); 
        const incomeNum = parseInt(income); 

        try {
            const response = await fetch('https://cin4vzba0b.execute-api.ap-southeast-2.amazonaws.com/dev/compare-yourself', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': idTokenValue
                },
                body: JSON.stringify({
                    age: ageNum,
                    height: heightNum,
                    income: incomeNum
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            console.log('POST call succeeded');

        } catch (error) {
            console.error('There was a problem with the POST operation:', error);
        }
    };

    const getSingle = useCallback(async () => {
        
        const { accessToken, idToken } = await getSession();
       
        if (!idToken) {
            console.error('ID token not available');
            return;
        } 
        
        const idTokenValue = idToken?.toString?.();
        const accessTokenValue = accessToken?.toString?.();

        const queryParam = '?accessToken=' + accessTokenValue
        let urlParam = 'single'

        try {

            const response = await fetch('https://cin4vzba0b.execute-api.ap-southeast-2.amazonaws.com/dev/compare-yourself/' + urlParam + queryParam, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': idTokenValue
                },
            });

            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }

            const result = await response.json();
            return result

          } catch (error) {

            console.log(error)

          }

    }, [getSession]);


    const getAll = useCallback(async () => {

        const { accessToken, idToken } = await getSession();
       
        if (!idToken) {
            console.error('ID token not available');
            return;
        } 
        
        const idTokenValue = idToken?.toString?.();
        const accessTokenValue = accessToken?.toString?.();

        const queryParam = '?accessToken=' + accessTokenValue
        let urlParam = 'all'

        try {

            const response = await fetch('https://cin4vzba0b.execute-api.ap-southeast-2.amazonaws.com/dev/compare-yourself/' + urlParam + queryParam, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': idTokenValue
                },
            });

            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }

            const result = await response.json();
            return result

          } catch (error) {

            console.log(error)

          }
    }, [getSession]);

    const deleteCompare = async () => {

        const { idToken } = await getSession();
       
        if (!idToken) {
            console.error('ID token not available');
            return;
        } 
        
        const idTokenValue = idToken?.toString?.();
        const queryParam = '?accessToken=XXX'

        try {

            const response = await fetch('https://cin4vzba0b.execute-api.ap-southeast-2.amazonaws.com/dev/compare-yourself' + queryParam, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': idTokenValue
                },
            });

            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }

            console.log('DELETE call succeeded');

          } catch (error) {

            console.log(error)

          }
    }

    return { getAll, getSingle, postCompare, deleteCompare, handleInputChange, age, height, income };
};

export default useCompare;
