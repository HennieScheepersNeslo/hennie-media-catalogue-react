import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderComponentWithBrowserRouter } from '../../test/util/render-util';

import DVDAdd from './DVDAdd';

describe('CD Add', () => {
  describe('View', () => {
    test('default', () => {
      renderComponentWithBrowserRouter(<DVDAdd />);

      const header = screen.getByRole('heading', { innerHTML: 'Add DVD' });

      expect(header).toBeInTheDocument();
    });
  });

  describe('Typing', () => {
    const mockHandleDVDAdd = jest.fn();

    test('updates title', () => {
      renderComponentWithBrowserRouter(<DVDAdd handleDVDAdd={mockHandleDVDAdd} />);

      const titleInput = screen.getByLabelText(/title/i);

      userEvent.type(titleInput, 'test title');

      expect(titleInput).toHaveValue('test title');
    });

    test('updates artist', () => {
      renderComponentWithBrowserRouter(<DVDAdd handleDVDAdd={mockHandleDVDAdd} />);

      const directorEl = screen.getByLabelText('Director');

      userEvent.type(directorEl, 'test director');

      expect(directorEl).toHaveValue('test director');
    });

    test('updates duration', () => {
      renderComponentWithBrowserRouter(<DVDAdd handleDVDAdd={mockHandleDVDAdd} />);

      const durationEL = screen.getByLabelText('Duration');

      userEvent.type(durationEL, '123');

      expect(durationEL).toHaveValue(123);
    });

    test('updates releaseDate', () => {
      renderComponentWithBrowserRouter(<DVDAdd handleDVDAdd={mockHandleDVDAdd} />);

      const releaseDateEl = screen.getByLabelText('Release Date');

      userEvent.type(releaseDateEl, '1999-01-01');

      expect(releaseDateEl).toHaveValue('1999-01-01');
    });

    test('updates leadActor', () => {
      renderComponentWithBrowserRouter(<DVDAdd handleDVDAdd={mockHandleDVDAdd} />);

      const leadActorEl = screen.getByLabelText('Lead Actor');

      userEvent.type(leadActorEl, 'test actor');

      expect(leadActorEl).toHaveValue('test actor');
    });

    test('updates leadActress', () => {
      renderComponentWithBrowserRouter(<DVDAdd handleDVDAdd={mockHandleDVDAdd} />);

      const leadActressEl = screen.getByLabelText('Lead Actress');

      userEvent.type(leadActressEl, 'test actress');

      expect(leadActressEl).toHaveValue('test actress');
    });
  });

  describe('Clicking', () => {
    test('add button triggers handleDVDAdd', () => {
      const mockHandleDVDAdd = jest.fn();

      renderComponentWithBrowserRouter(<DVDAdd handleDVDAdd={mockHandleDVDAdd} />);

      const addButton = screen.getByRole('button', { innerHTML: 'Add' });
      expect(addButton).toBeInTheDocument();

      userEvent.click(addButton);

      expect(mockHandleDVDAdd).toHaveBeenCalledTimes(1);
    });
  });
});
