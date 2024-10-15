import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { ApiRequest, HttpVerb } from '@neslotech/ui-utils';

import { API_URL } from '../../util/api-url';

import { addBook, editBook, loadBooks, removeBook, setBooks } from './book.reducer';

import HEADERS from '../headers';

function* loadBooksSaga() {
  try {
    const { endpoint, axiosOptions } = new ApiRequest(`${API_URL}/books`, HttpVerb.GET, HEADERS);

    const response = yield call(axios, endpoint, axiosOptions);
    yield put(setBooks(response.data));
  } catch (error) {
    console.warn(error);
  }
}

function* watchForLoadBooks() {
  yield takeLatest(loadBooks.type, loadBooksSaga);
}

function* addBookSaga({ payload }) {
  try {
    const { endpoint, axiosOptions } = new ApiRequest(
      `${API_URL}/books`,
      HttpVerb.POST,
      HEADERS,
      payload
    );

    yield call(axios, endpoint, axiosOptions);
    yield put(loadBooks());
  } catch (error) {
    console.warn(error);
  }
}

function* watchForAddBook() {
  yield takeLatest(addBook.type, addBookSaga);
}

function* editBookSaga({ payload }) {
  try {
    const { endpoint, axiosOptions } = new ApiRequest(
      `${API_URL}/books/${payload.id}`,
      HttpVerb.PUT,
      HEADERS,
      payload
    );

    yield call(axios, endpoint, axiosOptions);
    yield put(loadBooks());
  } catch (error) {
    console.warn(error);
  }
}

function* watchForEditBook() {
  yield takeLatest(editBook.type, editBookSaga);
}

function* removeBookSaga({ payload }) {
  try {
    const { endpoint, axiosOptions } = new ApiRequest(
      `${API_URL}/books/${payload}`,
      HttpVerb.DELETE,
      HEADERS
    );
    yield call(axios, endpoint, axiosOptions);
    yield put(loadBooks());
  } catch (error) {
    console.warn(error);
  }
}

function* watchForRemoveBook() {
  yield takeLatest(removeBook.type, removeBookSaga);
}

function* bookSaga() {
  yield all([watchForLoadBooks(), watchForAddBook(), watchForEditBook(), watchForRemoveBook()]);
}

export default bookSaga;
