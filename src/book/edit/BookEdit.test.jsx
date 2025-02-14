import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';

import { renderComponentWithBrowserRouter } from '../../test/util/render-util';

import BookEdit from './BookEdit';

describe('Book Edit', () => {
  const fetchBook = jest.fn();

  describe('View', () => {
    test('default', () => {
      renderComponentWithBrowserRouter(<BookEdit id="1" fetchBook={fetchBook} />);

      const heading = screen.getByRole('heading', { innerHTML: 'Edit Book' });
      expect(heading).toBeInTheDocument();
      expect(fetchBook).toHaveBeenCalledTimes(1);
    });
  });

  describe('Typing', () => {
    const handleBookEdit = jest.fn();

    test('updates title', () => {
      renderComponentWithBrowserRouter(
        <BookEdit id="1" fetchBook={fetchBook} handleBookEdit={handleBookEdit} />
      );

      const titleInput = screen.getByLabelText('Title');

      userEvent.type(titleInput, 'test title');

      expect(titleInput).toHaveValue('test title');
    });

    test('updates author', () => {
      renderComponentWithBrowserRouter(
        <BookEdit id="1" fetchBook={fetchBook} handleBookEdit={handleBookEdit} />
      );

      const authorEl = screen.getByLabelText('Author');

      userEvent.type(authorEl, 'test author');

      expect(authorEl).toHaveValue('test author');
    });

    test('updates duration', () => {
      renderComponentWithBrowserRouter(
        <BookEdit id="1" fetchBook={fetchBook} handleBookEdit={handleBookEdit} />
      );

      const durationEL = screen.getByLabelText('Duration');

      userEvent.type(durationEL, '123');

      expect(durationEL).toHaveValue(123);
    });
  });

  describe('Clicking', () => {
    test('save button triggers handleBookEdit', () => {
      const handleBookEdit = jest.fn();

      renderComponentWithBrowserRouter(
        <BookEdit id="1" fetchBook={fetchBook} handleBookEdit={handleBookEdit} />
      );

      const saveButton = screen.getByRole('button', { innerHTML: 'Save' });
      expect(saveButton).toBeInTheDocument();

      user.click(saveButton);
      expect(handleBookEdit).toHaveBeenCalledTimes(1);
    });
  });
});
