import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderComponentWithBrowserRouter } from '../../test/util/render-util';

import Register from './Register';

describe('Register', () => {
  describe('View', () => {
    test('default', () => {
      renderComponentWithBrowserRouter(<Register />);

      const registerHeader = screen.getByRole('heading', { innerHTML: 'Register' });

      expect(registerHeader).toBeInTheDocument();
    });

    test('does not show "Passwords do not match." by default', () => {
      renderComponentWithBrowserRouter(<Register />);

      const passwordsDoNotMatchEl = screen.queryByText('Passwords do not match.');

      expect(passwordsDoNotMatchEl).not.toBeInTheDocument();
    });

    test('shows "Passwords do not match." when isMatchingPasswords is false', () => {
      const mockRegisterNewUser = jest.fn();

      renderComponentWithBrowserRouter(<Register registerNewUser={mockRegisterNewUser} />);

      const usernameEl = screen.getByLabelText('Username');
      const passwordEl = screen.getByLabelText('Password');
      const confirmPasswordEl = screen.getByLabelText('Confirm Password');
      const registerBtn = screen.getByRole('button', { innerHTML: 'Register' });

      userEvent.type(usernameEl, 'user');
      userEvent.type(passwordEl, '1234');
      userEvent.type(confirmPasswordEl, '4567');

      userEvent.click(registerBtn);

      const passwordsDoNotMatchEl = screen.getByText('Passwords do not match.');

      expect(passwordsDoNotMatchEl).toBeInTheDocument();
    });
  });

  describe('Clicking', () => {
    test('register button calls registerNewUser', () => {
      const mockRegisterNewUser = jest.fn();

      renderComponentWithBrowserRouter(<Register registerNewUser={mockRegisterNewUser} />);

      const registerBtn = screen.getByRole('button', { innerHTML: 'Register' });

      userEvent.click(registerBtn);

      expect(mockRegisterNewUser).toHaveBeenCalledTimes(1);
    });
  });
});
