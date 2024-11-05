import axios from 'axios';
import { all, call, put } from 'redux-saga/effects';

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

import { loadBooks, setBooks } from './book.reducer';

describe('Book Saga', () => {
  const mockHeader = { Authorization: 'Bearer ' };

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
    test('with no errors', () => {
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
      expect(step).toStrictEqual(put(setBooks(mockResponse.data)));
    });
  });

  describe('Add book', () => {
    test('with no errors', () => {
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
  });

  describe('Edit Book', () => {
    test('with no erros', () => {
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
  });

  describe('Remove Book', () => {
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
  });
});
