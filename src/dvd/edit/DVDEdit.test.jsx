import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';

import { renderComponentWithBrowserRouter } from '../../test/util/render-util';

import DVDEdit from './DVDEdit';

describe('DVD Edit', () => {
  const fetchDVD = jest.fn();

  describe('View', () => {
    test('default', () => {
      renderComponentWithBrowserRouter(<DVDEdit id="1" fetchDVD={fetchDVD} />);

      const heading = screen.getByRole('heading', { innerHTML: 'Edit DVD' });
      expect(heading).toBeInTheDocument();
      expect(fetchDVD).toHaveBeenCalledTimes(1);
    });
  });

  describe('Typing', () => {
    const mockHandleDVDEdit = jest.fn();

    test('updates title', () => {
      renderComponentWithBrowserRouter(
        <DVDEdit id="1" fetchDVD={fetchDVD} handleDVDEdit={mockHandleDVDEdit} />
      );

      const titleInput = screen.getByLabelText('Title');

      userEvent.type(titleInput, 'test title');

      expect(titleInput).toHaveValue('test title');
    });

    test('updates director', () => {
      renderComponentWithBrowserRouter(
        <DVDEdit id="1" fetchDVD={fetchDVD} handleDVDEdit={mockHandleDVDEdit} />
      );

      const directorEl = screen.getByLabelText('Director');

      userEvent.type(directorEl, 'test director');

      expect(directorEl).toHaveValue('test director');
    });

    test('updates duration', () => {
      renderComponentWithBrowserRouter(
        <DVDEdit id="1" fetchDVD={fetchDVD} handleDVDEdit={mockHandleDVDEdit} />
      );

      const durationEL = screen.getByLabelText('Duration');

      userEvent.type(durationEL, '123');

      expect(durationEL).toHaveValue(123);
    });
  });

  describe('Clicking', () => {
    test('save button triggers handleBookEdit', () => {
      const mockHandleDVDEdit = jest.fn();

      renderComponentWithBrowserRouter(
        <DVDEdit id="1" fetchDVD={fetchDVD} handleDVDEdit={mockHandleDVDEdit} />
      );

      const saveButton = screen.getByRole('button', { innerHTML: 'Save' });
      expect(saveButton).toBeInTheDocument();

      user.click(saveButton);
      expect(mockHandleDVDEdit).toHaveBeenCalledTimes(1);
    });
  });
});
