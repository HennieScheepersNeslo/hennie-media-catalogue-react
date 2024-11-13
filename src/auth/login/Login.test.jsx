import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';

import { renderComponentWithBrowserRouter } from '../../test/util/render-util';

import Login from './Login';

describe('Login', () => {
  describe('View', () => {
    test('default', () => {
      renderComponentWithBrowserRouter(<Login />);

      const loginEl = screen.getAllByText('Login')[0];
      expect(loginEl).toBeInTheDocument();
    });

    test('does not show "Invalid Credentials" by defafult', () => {
      renderComponentWithBrowserRouter(<Login />);

      const invalidCredentialsEl = screen.queryByText(/invalid credentials/i);

      expect(invalidCredentialsEl).not.toBeInTheDocument();
    });

    test('does show "Invalid Credentials" when token is invalid', () => {
      const mockLogin = jest.fn();

      mockLogin.mockImplementationOnce(({ setIsValidToken }) => setIsValidToken(false));

      renderComponentWithBrowserRouter(<Login login={mockLogin} />);

      const usernameInput = screen.getByLabelText('Username');
      const passwordInput = screen.getByLabelText('Password');
      const loginBtn = screen.getByRole('button', { innerHTML: 'Login' });

      userEvent.type(usernameInput, 'invalid user');
      userEvent.type(passwordInput, 'invalid password');

      user.click(loginBtn);

      const invalidCredentialsEl = screen.getByText(/invalid credentials/i);

      expect(invalidCredentialsEl).toBeInTheDocument();
    });
  });

  describe('Clicking', () => {
    test('login button triggers handleLogin', () => {
      const handleLogin = jest.fn();

      renderComponentWithBrowserRouter(<Login login={handleLogin} />);

      const loginButton = screen.getByRole('button', { innerHTML: 'Login' });
      expect(loginButton).toBeInTheDocument();

      user.click(loginButton);

      expect(handleLogin).toHaveBeenCalledTimes(1);
    });
  });
});
