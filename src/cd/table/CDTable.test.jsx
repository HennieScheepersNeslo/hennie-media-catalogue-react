import '@testing-library/jest-dom';
import { getByRole, getByText, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';

import { formatDate } from '@neslotech/ui-utils';

import { renderComponentWithBrowserRouter } from '../../test/util/render-util';

import CDTable from './CDTable';

const cds = [
  {
    id: 1,
    title: 'A CD',
    artist: 'A. Person',
    duration: 110,
    releaseDate: formatDate(new Date(), 'fr-CA')
  }
];

describe('CD Table', () => {
  describe('View', () => {
    test('default', () => {
      renderComponentWithBrowserRouter(<CDTable cds={cds} />);

      const cdTableEl = screen.getByText('Add CD');

      expect(cdTableEl).toBeInTheDocument();
    });

    test('shows cd view when cdToView has value', () => {
      const mockSetter = jest.fn();

      renderComponentWithBrowserRouter(<CDTable cds={cds} />);

      mockSetter.mockImplementationOnce(({ setCDToView }) => setCDToView(cds[0]));

      const titleEl = screen.getByRole('heading', { innerHTML: cds.title });

      screen.debug();

      expect(titleEl).toBeInTheDocument();
    });
  });

  describe('Clicking', () => {
    test('delete button triggers handleBookDelete', () => {
      const mockHandleCDDelete = jest.fn();

      renderComponentWithBrowserRouter(<CDTable cds={cds} deleteCD={mockHandleCDDelete} />);

      const deleteButton = screen.getByText('delete.svg');
      expect(deleteButton).toBeInTheDocument();

      user.click(deleteButton);

      const confirmButton = screen.getByText('Confirm');
      expect(confirmButton).toBeInTheDocument();

      userEvent.click(confirmButton);
      expect(mockHandleCDDelete).toHaveBeenCalledTimes(1);
    });
  });
});
