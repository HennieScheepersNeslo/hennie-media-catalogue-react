import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { formatDate } from '@neslotech/ui-utils';

import BookTable from './BookTable';

const books = [
  {
    id: 1,
    title: 'A Book',
    author: 'A. Person',
    duration: 110,
    publishedDate: formatDate(new Date(), 'fr-CA')
  }
];

describe('Book Table', () => {
  describe('View', () => {
    test('table renders', () => {
      render(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<BookTable books={books} />} />
          </Routes>
        </BrowserRouter>
      );

      const bookTableEl = screen.getByText('Add Book');

      expect(bookTableEl).toBeInTheDocument();
    });
  });

  describe('Clicking', () => {
    test('delete button fires deleteBooks function', () => {
      const handleBookDelete = jest.fn();

      render(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<BookTable books={books} deleteBook={handleBookDelete} />} />
          </Routes>
        </BrowserRouter>
      );

      const deleteButton = screen.getByText('delete.svg');
      expect(deleteButton).toBeInTheDocument();

      user.click(deleteButton);
      const confirmButton = screen.getByText('Confirm');

      user.click(confirmButton);
      expect(handleBookDelete).toHaveBeenCalledTimes(1);
    });
  });
});
