import '@testing-library/jest-dom';
import { getByRole, getByText, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import { formatDate } from '@neslotech/ui-utils';

import { renderComponentWithBrowserRouter } from '../../test/util/render-util';

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
    test('default', () => {
      renderComponentWithBrowserRouter(<BookTable books={books} />);

      const bookTableEl = screen.getByText('Add Book');

      expect(bookTableEl).toBeInTheDocument();
    });

    test('shows book view when bookToView has value', () => {
      const mockSetter = jest.fn();

      renderComponentWithBrowserRouter(<BookTable books={books} />);

      const book = {
        id: 1,
        title: 'testTitle',
        author: 'testAuthor',
        duration: 123,
        publishedDate: formatDate(new Date(), 'fr-CA')
      };

      mockSetter.mockImplementationOnce(({ setBookToView }) => setBookToView(book));

      const titleEl = screen.getByRole('heading', { innerHTML: book.title });

      expect(titleEl).toBeInTheDocument();
    });
  });

  describe('Clicking', () => {
    test('delete button triggers handleBookDelete', () => {
      const handleBookDelete = jest.fn();

      renderComponentWithBrowserRouter(<BookTable books={books} deleteBook={handleBookDelete} />);

      const deleteButton = screen.getByText('delete.svg');
      expect(deleteButton).toBeInTheDocument();

      user.click(deleteButton);

      const confirmButton = screen.getByText('Confirm');
      expect(confirmButton).toBeInTheDocument();

      user.click(confirmButton);
      expect(handleBookDelete).toHaveBeenCalledTimes(1);
    });
  });
});
