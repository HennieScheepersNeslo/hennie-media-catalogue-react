import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import { formatDate } from '@neslotech/ui-utils';

import BookView from './BookView';

const book = {
  id: 1,
  title: 'A book about things',
  author: 'A. Person',
  duration: 123,
  publishedDate: formatDate(new Date(), 'fr-CA')
};

describe('Book View', () => {
  describe('View', () => {
    test('default', () => {
      render(<BookView book={book} />);

      const heading = screen.getByRole('heading', { innerHTML: 'A book about things' });

      expect(heading).toBeInTheDocument();
    });
  });

  describe('Clicking', () => {
    test('close button trigger handleViewClose', () => {
      const handleViewClose = jest.fn();

      render(<BookView book={book} handleViewClose={handleViewClose} />);

      const closeButton = screen.getByRole('button');
      expect(closeButton).toBeInTheDocument();

      user.click(closeButton);
      expect(handleViewClose).toHaveBeenCalledTimes(1);
    });
  });
});
