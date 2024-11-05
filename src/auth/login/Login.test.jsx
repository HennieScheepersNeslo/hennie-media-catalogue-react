import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import { renderComponentWithBrowserRouter } from '../../test/util/render-util';

import Login from './Login';

describe('Login', () => {
  describe('View', () => {
    test('default', () => {
      renderComponentWithBrowserRouter(<Login />);

      const loginEl = screen.getAllByText('Login')[0];
      expect(loginEl).toBeInTheDocument();
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
