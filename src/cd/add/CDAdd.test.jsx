import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderComponentWithBrowserRouter } from '../../test/util/render-util';

import CDAdd from './CDAdd';

describe('CD Add', () => {
  describe('View', () => {
    test('default', () => {
      renderComponentWithBrowserRouter(<CDAdd />);

      const header = screen.getByRole('heading', { innerHTML: 'Add CD' });

      expect(header).toBeInTheDocument();
    });
  });

  describe('Typing', () => {
    const mockHandleCDAdd = jest.fn();

    test('updates title', () => {
      renderComponentWithBrowserRouter(<CDAdd handleCDAdd={mockHandleCDAdd} />);

      const titleInput = screen.getByLabelText(/title/i);

      userEvent.type(titleInput, 'test title');

      expect(titleInput).toHaveValue('test title');
    });

    test('updates artist', () => {
      renderComponentWithBrowserRouter(<CDAdd handleCDAdd={mockHandleCDAdd} />);

      const authorEl = screen.getByLabelText('Artist');

      userEvent.type(authorEl, 'test artist');

      expect(authorEl).toHaveValue('test artist');
    });

    test('updates duration', () => {
      renderComponentWithBrowserRouter(<CDAdd handleCDAdd={mockHandleCDAdd} />);

      const durationEL = screen.getByLabelText('Duration');

      userEvent.type(durationEL, '123');

      expect(durationEL).toHaveValue(123);
    });

    test('updates releaseDate', () => {
      renderComponentWithBrowserRouter(<CDAdd handleCDAdd={mockHandleCDAdd} />);

      const publishedDateEl = screen.getByLabelText('Release Date');

      userEvent.type(publishedDateEl, '1999-01-01');

      expect(publishedDateEl).toHaveValue('1999-01-01');
    });
  });

  describe('Clicking', () => {
    test('add button triggers handleCDAdd', () => {
      const mockHandleCDAdd = jest.fn();

      renderComponentWithBrowserRouter(<CDAdd handleCDAdd={mockHandleCDAdd} />);

      const addButton = screen.getByRole('button', { innerHTML: 'Add' });
      expect(addButton).toBeInTheDocument();

      userEvent.click(addButton);

      expect(mockHandleCDAdd).toHaveBeenCalledTimes(1);
    });
  });
});
