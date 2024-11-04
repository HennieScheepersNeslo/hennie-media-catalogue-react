import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Login from './Login';

describe('Login', () => {
  test('Displays login form', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );

    const loginEl = screen.getByLabelText('Username');

    expect(loginEl).toBeInTheDocument();
  });
});
