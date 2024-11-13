import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import { formatDate } from '@neslotech/ui-utils';

import CDView from './CDView';

describe('CD View', () => {
  const cd = {
    id: 1,
    title: 'A CD',
    artist: 'A. Person',
    duration: 110,
    releaseDate: formatDate(new Date(), 'fr-CA')
  };

  describe('View', () => {
    test('default', () => {
      render(<CDView cd={cd} />);

      const heading = screen.getByRole('heading', { innerHTML: 'A CD' });

      expect(heading).toBeInTheDocument();
    });
  });

  describe('Clicking', () => {
    test('close button trigger handleViewClose', () => {
      const mockHandleViewClose = jest.fn();

      render(<CDView cd={cd} handleViewClose={mockHandleViewClose} />);

      const closeButton = screen.getByRole('button');
      expect(closeButton).toBeInTheDocument();

      user.click(closeButton);
      expect(mockHandleViewClose).toHaveBeenCalledTimes(1);
    });
  });
});
