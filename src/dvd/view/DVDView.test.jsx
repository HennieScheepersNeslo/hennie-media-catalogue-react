import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import { formatDate } from '@neslotech/ui-utils';

import DVDView from './DVDView';

describe('DVD View', () => {
  const dvd = {
    id: 1,
    title: 'A DVD',
    director: 'A. Person',
    duration: 110,
    leadActor: 'An Actor',
    leadActress: 'An Actress',
    releaseDate: formatDate(new Date(), 'fr-CA')
  };

  describe('View', () => {
    test('default', () => {
      render(<DVDView dvd={dvd} />);

      const heading = screen.getByRole('heading', { innerHTML: 'A DVD' });

      expect(heading).toBeInTheDocument();
    });
  });

  describe('Clicking', () => {
    test('close button trigger handleViewClose', () => {
      const mockHandleViewClose = jest.fn();

      render(<DVDView dvd={dvd} handleViewClose={mockHandleViewClose} />);

      const closeButton = screen.getByRole('button');
      expect(closeButton).toBeInTheDocument();

      user.click(closeButton);
      expect(mockHandleViewClose).toHaveBeenCalledTimes(1);
    });
  });
});
