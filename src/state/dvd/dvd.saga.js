import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { ApiRequest, HttpVerb } from '@neslotech/ui-utils';

import { addDVD, addDVDTrigger, updateDVD, updateDVDTrigger } from './dvd.reducer';

import HEADERS from '../headers';

const API_HOME = 'http://localhost:8080/api/dvds';

function* addDVDSaga({payload}) {
  try {
    const { endpoint, axiosOptions } = new ApiRequest(
      API_HOME,
      HttpVerb.POST,
      HEADERS,
      payload
    );

    const response = yield call(axios, endpoint, axiosOptions);
    yield put(addDVD(response.data));
  } catch (error) {
    console.warn(error);
  }
}

function* watchForAddDVD() {
  yield takeLatest(addDVDTrigger.type, addDVDSaga);
}

function* updateDVDSaga({payload}) {
  try {
    const { endpoint, axiosOptions } = new ApiRequest(
      `${API_HOME}/${payload.id}`,
      HttpVerb.PUT,
      HEADERS,
      payload
    );

    const response = yield call(axios, endpoint, axiosOptions);
    yield put(updateDVD(response.data));
  } catch (error) {
    console.log(error);
  }
}

function* watchForUpdateDVD() {
  yield takeLatest(updateDVDTrigger.type, updateDVDSaga);
}

function* dvdSaga() {
  yield all([watchForAddDVD(), watchForUpdateDVD()]);
}

export default dvdSaga;
