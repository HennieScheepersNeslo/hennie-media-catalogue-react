import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Login from './Login';

describe('Login', () => {
  describe('View', () => {
    test('default', () => {
      render(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </BrowserRouter>
      );

      const loginEl = screen.getAllByText('Login')[0];
      expect(loginEl).toBeInTheDocument();
    });
  });

  describe('Clicking', () => {
    test('login button triggers handleLogin', () => {
      const handleLogin = jest.fn();

      render(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login login={handleLogin} />} />
          </Routes>
        </BrowserRouter>
      );

      const loginButton = screen.getByRole('button', { innerHTML: 'Login' });
      expect(loginButton).toBeInTheDocument();

      user.click(loginButton);

      expect(handleLogin).toHaveBeenCalledTimes(1);
    });
  });
});
