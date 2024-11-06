import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { ApiRequest, HttpVerb, formatDate } from '@neslotech/ui-utils';

import { API_URL } from '../../util/api-url';

import bookSaga, {
  addBookSaga,
  editBookSaga,
  loadBooksSaga,
  removeBookSaga,
  watchForAddBook,
  watchForEditBook,
  watchForLoadBooks,
  watchForRemoveBook
} from './book.saga';

import { addBook, editBook, loadBooks, removeBook, setBooks } from './book.reducer';

jest.mock('axios');

describe('Book Saga', () => {
  const mockHeader = { Authorization: 'Bearer ' };

  jest.spyOn(console, 'warn').mockImplementation(() => {});

  const book = {
    id: 1,
    title: 'A book about things',
    author: 'A. Person',
    duration: 123,
    publishedDate: formatDate(new Date(), 'fr-CA')
  };

  test('rootSaga value is correct', () => {
    const generator = bookSaga();

    expect(generator.next().value).toEqual(
      all([watchForLoadBooks(), watchForAddBook(), watchForEditBook(), watchForRemoveBook()])
    );
  });

  describe('Load Books', () => {
    test('watch', () => {
      const generator = watchForLoadBooks();

      const step = generator.next().value;
      expect(step).toEqual(takeLatest(loadBooks.type, loadBooksSaga));
    });

    test('with no error', () => {
      const generator = loadBooksSaga();

      const mockResponse = {
        data: {
          ...book
        }
      };

      const { endpoint, axiosOptions } = new ApiRequest(
        `${API_URL}/books`,
        HttpVerb.GET,
        mockHeader
      );

      let step = generator.next().value;
      expect(step).toEqual(call(axios, endpoint, axiosOptions));

      step = generator.next(mockResponse).value;
      expect(step).toEqual(put(setBooks(mockResponse.data)));
    });

    test('with error', () => {
      axios.get.mockRejectedValueOnce(new Error('Something went wrong fetching the books'));

      const { endpoint, axiosOptions } = new ApiRequest(
        `${API_URL}/books`,
        HttpVerb.GET,
        mockHeader
      );

      const generator = loadBooksSaga();

      let step = generator.next().value;
      expect(step).toEqual(call(axios, endpoint, axiosOptions));

      step = generator.next().value;
      expect(step).toEqual(console.warn('Something went wrong fetching the books'));
    });
  });

  describe('Add book', () => {
    test('watch', () => {
      const generator = watchForAddBook();

      const step = generator.next().value;
      expect(step).toEqual(takeLatest(addBook.type, addBookSaga));
    });

    test('with no error', () => {
      const generator = addBookSaga({ payload: book });

      const { endpoint, axiosOptions } = new ApiRequest(
        `${API_URL}/books`,
        HttpVerb.POST,
        mockHeader,
        book
      );

      let step = generator.next().value;
      expect(step).toEqual(call(axios, endpoint, axiosOptions));

      step = generator.next().value;
      expect(step).toEqual(put(loadBooks()));
    });

    test('with error', () => {
      jest.spyOn(console, 'warn').mockImplementation(() => {});

      const { endpoint, axiosOptions } = new ApiRequest(
        `${API_URL}/books`,
        HttpVerb.POST,
        mockHeader,
        book
      );

      const generator = addBookSaga({ payload: book });

      let step = generator.next().value;
      expect(step).toEqual(call(axios, endpoint, axiosOptions));

      generator.throw(new Error('Something went wrong when adding a book'));
      expect(console.warn).toHaveBeenCalledWith(
        new Error('Something went wrong when adding a book')
      );
    });
  });

  describe('Edit Book', () => {
    test('watch', () => {
      const generator = watchForEditBook();

      const step = generator.next().value;
      expect(step).toEqual(takeLatest(editBook.type, editBookSaga));
    });

    test('with no error', () => {
      const generator = editBookSaga({ payload: book });

      const { endpoint, axiosOptions } = new ApiRequest(
        `${API_URL}/books/${book.id}`,
        HttpVerb.PUT,
        mockHeader,
        book
      );

      let step = generator.next().value;
      expect(step).toEqual(call(axios, endpoint, axiosOptions));

      step = generator.next().value;
      expect(step).toEqual(put(loadBooks()));
    });

    test('with error', () => {
      jest.spyOn(console, 'warn').mockImplementation(() => {});

      const { endpoint, axiosOptions } = new ApiRequest(
        `${API_URL}/books/${book.id}`,
        HttpVerb.PUT,
        mockHeader,
        book
      );

      const generator = editBookSaga({ payload: book });

      let step = generator.next().value;
      expect(step).toEqual(call(axios, endpoint, axiosOptions));

      generator.throw(new Error('Something went wrong when updating the book'));
      expect(console.warn).toHaveBeenCalledWith(
        new Error('Something went wrong when updating the book')
      );
    });
  });

  describe('Remove Book', () => {
    test('watch', () => {
      const generator = watchForRemoveBook();

      const step = generator.next().value;
      expect(step).toEqual(takeLatest(removeBook.type, removeBookSaga));
    });

    test('with no errors', () => {
      const generator = removeBookSaga({ payload: book.id });

      const { endpoint, axiosOptions } = new ApiRequest(
        `${API_URL}/books/${book.id}`,
        HttpVerb.DELETE,
        mockHeader
      );

      let step = generator.next().value;
      expect(step).toEqual(call(axios, endpoint, axiosOptions));

      step = generator.next().value;
      expect(step).toEqual(put(loadBooks()));
    });

    test('with error', () => {
      const generator = removeBookSaga({ payload: book.id });

      const { endpoint, axiosOptions } = new ApiRequest(
        `${API_URL}/books/${book.id}`,
        HttpVerb.DELETE,
        mockHeader
      );

      let step = generator.next().value;
      expect(step).toEqual(call(axios, endpoint, axiosOptions));

      generator.throw(new Error('Something went wrong when trying to remove the book'));
      expect(console.warn).toHaveBeenCalledWith(
        new Error('Something went wrong when trying to remove the book')
      );
    });
  });

  console.warn.mockRestore();
});
