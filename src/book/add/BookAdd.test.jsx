import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';

import { formatDate } from '@neslotech/ui-utils';

import { renderComponentWithBrowserRouter } from '../../test/util/render-util';

import BookAdd from './BookAdd';

describe('BookAdd', () => {
  describe('View', () => {
    test('default', () => {
      renderComponentWithBrowserRouter(<BookAdd />);

      const header = screen.getByRole('heading', { innerHTML: 'Add Book' });

      expect(header).toBeInTheDocument();
    });
  });

  describe('Typing', () => {
    const mockHandleBookAdd = jest.fn();

    test('updates title', () => {
      renderComponentWithBrowserRouter(<BookAdd handleBookAdd={mockHandleBookAdd} />);

      const titleInput = screen.getByLabelText(/title/i);

      userEvent.type(titleInput, 'test title');

      expect(titleInput).toHaveValue('test title');
    });

    test('updates author', () => {
      renderComponentWithBrowserRouter(<BookAdd handleBookAdd={mockHandleBookAdd} />);

      const authorEl = screen.getByLabelText('Author');

      userEvent.type(authorEl, 'test author');

      expect(authorEl).toHaveValue('test author');
    });

    test('updates duration', () => {
      renderComponentWithBrowserRouter(<BookAdd handleBookAdd={mockHandleBookAdd} />);

      const durationEL = screen.getByLabelText('Duration');

      userEvent.type(durationEL, '123');

      expect(durationEL).toHaveValue(123);
    });

    test('updates publsihedDate', () => {
      renderComponentWithBrowserRouter(<BookAdd handleBookAdd={mockHandleBookAdd} />);

      const publishedDateEl = screen.getByLabelText('Published Date');

      userEvent.type(publishedDateEl, '1999-01-01');

      expect(publishedDateEl).toHaveValue('1999-01-01');
    });
  });

  describe('Clicking', () => {
    test('add button triggers handleBookAdd', () => {
      const handleBookAdd = jest.fn();

      renderComponentWithBrowserRouter(<BookAdd handleBookAdd={handleBookAdd} />);

      const addButton = screen.getByRole('button', { innerHTML: 'Add' });
      expect(addButton).toBeInTheDocument();

      user.click(addButton);
      expect(handleBookAdd).toHaveBeenCalledTimes(1);
    });
  });
});
