import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import BookAdd from './BookAdd';

describe('BookAdd', () => {
  describe('View', () => {
    test('default', () => {
      render(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<BookAdd />} />
          </Routes>
        </BrowserRouter>
      );

      const header = screen.getByRole('heading', { innerHTML: 'Add Book' });

      expect(header).toBeInTheDocument();
    });
  });

  describe('Clicking', () => {
    test('add button triggers handleBookAdd', () => {
      const handleBookAdd = jest.fn();

      render(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<BookAdd handleBookAdd={handleBookAdd} />} />
          </Routes>
        </BrowserRouter>
      );

      const addButton = screen.getByRole('button', { innerHTML: 'Add' });
      expect(addButton).toBeInTheDocument();

      user.click(addButton);
      expect(handleBookAdd).toHaveBeenCalledTimes(1);
    });
  });
});
