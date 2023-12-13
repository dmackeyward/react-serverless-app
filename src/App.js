import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Input from './components/Input';
import Results from './components/Results';
import { AuthProvider } from './contexts/AuthContext'; 

const App = () => {

  return (
    <Router>
      <AuthProvider>
        <div>
          <Navbar /> 
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/input" element={<Input />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
