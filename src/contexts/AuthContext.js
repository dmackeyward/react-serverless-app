import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { getCurrentUser, signIn, signOut, signUp, fetchAuthSession } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import config from '../aws-exports';
Amplify.configure(config);


// Create the context
const AuthContext = createContext();

// Custom hook to use the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');

  // Function for logging out of AWS Amplify
  const logout = useCallback(async () => {
    try {
      await signOut({ global: true });
      console.log("Signed out");
      setIsLoggedIn(false);
      setUser('');
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }, []);


  // Function to check if there is a current user logged in
  const checkAuthStatus = useCallback(async () => {

    try {
      const currentUser = await getCurrentUser();
      //console.log("current user: ", currentUser);

      if (currentUser && currentUser.signInDetails) {
        setUser(currentUser.signInDetails.loginId);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUser('');
        logout();
      }
    } catch (err) {
      setIsLoggedIn(false);
      setUser('');
    }
  }, [logout]); // Assuming logout is defined elsewhere


  useEffect(() => {
    checkAuthStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);


  // Function for logging into AWS Amplify
  const login = async (enteredEmail, enteredPassword) => {
    await signIn({
      username: enteredEmail,
      password: enteredPassword
    });
    setIsLoggedIn(true);
  };


  // Function for registering on AWS Amplify
  const register = async (enteredEmail, enteredPassword) => {
    await signUp({
      username: enteredEmail,
      password: enteredPassword,
      attributes: {
        email: enteredEmail,
      },
    });
  };


  // Function for getting session details from AWS Amplify
  const currentSession = async () => {
    try {
      const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};  
      return { accessToken, idToken };
    } catch (err) {
      console.log(err);
      return { accessToken: null, idToken: null }; // or handle the error accordingly
    }
  }
  



  // Provide the authentication state and functions to child components
  const contextValue = {
    isLoggedIn,
    user,
    login,
    logout,
    register,
    getSession: currentSession,
  };


  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
