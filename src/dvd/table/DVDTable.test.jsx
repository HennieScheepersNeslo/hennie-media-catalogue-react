import '@testing-library/jest-dom';
import { getByRole, getByText, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';

import { formatDate } from '@neslotech/ui-utils';

import { renderComponentWithBrowserRouter } from '../../test/util/render-util';

import DVDTable from './DVDTable';

const dvds = [
  {
    id: 1,
    title: 'A DVD',
    director: 'A. Person',
    duration: 110,
    leadActor: 'An Actor',
    leadActress: 'An Actress',
    releaseDate: formatDate(new Date(), 'fr-CA')
  }
];

describe('CD Table', () => {
  describe('View', () => {
    test('default', () => {
      renderComponentWithBrowserRouter(<DVDTable dvds={dvds} />);

      const dvdTableEL = screen.getByText('Add DVD');

      expect(dvdTableEL).toBeInTheDocument();
    });

    test('shows cd view when cdToView has value', () => {
      const mockSetter = jest.fn();

      renderComponentWithBrowserRouter(<DVDTable dvds={dvds} />);

      mockSetter.mockImplementationOnce(({ setDVDToView }) => setDVDToView(dvds[0]));

      const titleEl = screen.getByRole('heading', { innerHTML: dvds[0].title });

      expect(titleEl).toBeInTheDocument();
    });
  });

  describe('Clicking', () => {
    test('delete button triggers handleBookDelete', () => {
      const mockHandleDVDDelete = jest.fn();

      renderComponentWithBrowserRouter(<DVDTable dvds={dvds} deleteDVD={mockHandleDVDDelete} />);

      const deleteButton = screen.getByText('delete.svg');
      expect(deleteButton).toBeInTheDocument();

      user.click(deleteButton);

      const confirmButton = screen.getByText('Confirm');
      expect(confirmButton).toBeInTheDocument();

      userEvent.click(confirmButton);
      expect(mockHandleDVDDelete).toHaveBeenCalledTimes(1);
    });
  });
});
