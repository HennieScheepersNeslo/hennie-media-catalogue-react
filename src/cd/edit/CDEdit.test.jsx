import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';

import { renderComponentWithBrowserRouter } from '../../test/util/render-util';

import CDEdit from './CDEdit';

describe('CD Edit', () => {
  const fetchCD = jest.fn();

  describe('View', () => {
    test('default', () => {
      renderComponentWithBrowserRouter(<CDEdit id="1" fetchCD={fetchCD} />);

      const heading = screen.getByRole('heading', { innerHTML: 'Edit CD' });
      expect(heading).toBeInTheDocument();
      expect(fetchCD).toHaveBeenCalledTimes(1);
    });
  });

  describe('Typing', () => {
    const mockHandleCDEdit = jest.fn();

    test('updates title', () => {
      renderComponentWithBrowserRouter(
        <CDEdit id="1" fetchCD={fetchCD} handleCDEdit={mockHandleCDEdit} />
      );

      const titleInput = screen.getByLabelText('Title');

      userEvent.type(titleInput, 'test title');

      expect(titleInput).toHaveValue('test title');
    });

    test('updates artist', () => {
      renderComponentWithBrowserRouter(
        <CDEdit id="1" fetchCD={fetchCD} handleCDEdit={mockHandleCDEdit} />
      );

      const authorEl = screen.getByLabelText('Artist');

      userEvent.type(authorEl, 'test artist');

      expect(authorEl).toHaveValue('test artist');
    });

    test('updates duration', () => {
      renderComponentWithBrowserRouter(
        <CDEdit id="1" fetchCD={fetchCD} handleCDEdit={mockHandleCDEdit} />
      );

      const durationEL = screen.getByLabelText('Duration');

      userEvent.type(durationEL, '123');

      expect(durationEL).toHaveValue(123);
    });
  });

  describe('Clicking', () => {
    test('save button triggers handleBookEdit', () => {
      const mockHandleCDEdit = jest.fn();

      renderComponentWithBrowserRouter(
        <CDEdit id="1" fetchCD={fetchCD} handleCDEdit={mockHandleCDEdit} />
      );

      const saveButton = screen.getByRole('button', { innerHTML: 'Save' });
      expect(saveButton).toBeInTheDocument();

      user.click(saveButton);
      expect(mockHandleCDEdit).toHaveBeenCalledTimes(1);
    });
  });
});
