import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';

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
