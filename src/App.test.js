import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Register from '../src/components/Register'

describe('App Component', () => {


  test('renders homepage by default', () => {
    render(<App />);
    const homePageElement = screen.getByText('HOMEPAGE');
    expect(homePageElement).toBeInTheDocument();
  });


  test('renders elements from Navbar', () => {
    render(<App />);
    const navbarBrand = screen.getByText('Compare Yourself!'); 
    expect(navbarBrand).toBeInTheDocument();
  });


  test('displays Register component when navigating to /register', () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </MemoryRouter>
    );
  
    const registerPageElement = screen.getByText('Register');
    expect(registerPageElement).toBeInTheDocument();
  });


  test('logs out and changes isAuthenticated state', () => {
    render(<App />);

    expect(screen.getByText('Logout')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Logout')); 
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });


});
