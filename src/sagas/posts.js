import {
  takeLatest
} from 'redux-saga';
import {
  take,
  call,
  put,
  fork,
  cancel
} from 'redux-saga/effects';
import {
  getAll
} from '../services/posts';
import {
  message
} from 'antd';

function* getPosts() {
  try {
    const {
      jsonResult
    } = yield call(getAll);
    if (jsonResult.data) {
      yield put({
        type: 'posts/get/success',
        payload: jsonResult.data,
      });
    }
  } catch (err) {
    message.error(err);
    yield put({
      type: 'posts/get/failed',
      err,
    });
  }
}

function* watchPostsGet() {
  yield takeLatest('posts/get', getPosts)
}

export default function*() {
  yield fork(watchPostsGet);
  yield put({
    type: 'posts/get',
  });
}
