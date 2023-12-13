import { render, screen, fireEvent } from '@testing-library/react';
import Register from './Register';

describe('Register Component', () => {

    test('renders Register form', () => {
        render(<Register />);
        const registerTitle = screen.getByText('Register');
        expect(registerTitle).toBeInTheDocument();

        const emailInput = screen.getByLabelText('Email:');
        expect(emailInput).toBeInTheDocument();

        const passwordInput = screen.getByLabelText('Password:');
        expect(passwordInput).toBeInTheDocument();

        const confirmPasswordInput = screen.getByLabelText('Confirm Password:');
        expect(confirmPasswordInput).toBeInTheDocument();

        const submitButton = screen.getByText('Submit');
        expect(submitButton).toBeInTheDocument();
    });


    test('validates email input', () => {
        render(<Register />);
        const emailInput = screen.getByLabelText('Email:');
        fireEvent.change(emailInput, { target: { value: 'invalidEmail' } });
        fireEvent.blur(emailInput);
        const errorText = screen.getByText('Please enter a valid email address.');
        expect(errorText).toBeInTheDocument();
    });


    test('validates password input', () => {
        render(<Register />);
        const passwordInput = screen.getByLabelText('Password:');
        fireEvent.change(passwordInput, { target: { value: 'invalidPass' } });
        fireEvent.blur(passwordInput);
        const errorText = screen.getByText('Please enter a valid password.');
        expect(errorText).toBeInTheDocument();
    });


    test('validates confirmation of password input', () => {
        render(<Register />);
        const passwordInput = screen.getByLabelText('Password:');
        const confirmPasswordInput = screen.getByLabelText('Confirm Password:');
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } });
        fireEvent.blur(confirmPasswordInput);
        const errorText = screen.getByText('Please enter a valid password.');
        expect(errorText).toBeInTheDocument();
    });

});
