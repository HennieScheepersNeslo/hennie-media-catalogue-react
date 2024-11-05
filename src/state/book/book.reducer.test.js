import { formatDate } from '@neslotech/ui-utils';

import bookReducer, {
  addBook,
  editBook,
  initialState,
  loadBooks,
  removeBook,
  setBooks
} from './book.reducer';

describe('Book Reducer', () => {
  const books = [
    {
      id: 1,
      title: 'A Book',
      author: 'A. Person',
      duration: 110,
      publishedDate: formatDate(new Date(), 'fr-CA')
    }
  ];

  test('initialState is correct', () => {
    expect(bookReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  test('loads book', () => {
    const expectedState = { ...initialState, loading: true };

    expect(bookReducer(initialState, loadBooks)).toStrictEqual(expectedState);
  });

  test('sets books', () => {
    const expectedState = { books, loading: false };

    expect(bookReducer(initialState, setBooks(books))).toStrictEqual(expectedState);
  });

  test('adding book sets loading to true', () => {
    const expectedState = { ...initialState, loading: true };

    expect(bookReducer(initialState, addBook)).toStrictEqual(expectedState);
  });

  test('editing book sets loading to true', () => {
    const expectedState = { ...initialState, loading: true };

    expect(bookReducer(initialState, editBook)).toStrictEqual(expectedState);
  });

  test('removing book sets loading to true', () => {
    const expectedState = { ...initialState, loading: true };

    expect(bookReducer(initialState, removeBook)).toStrictEqual(expectedState);
  });
});
