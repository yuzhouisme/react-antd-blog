import { handleActions } from 'redux-actions';
import { combineReducer } from 'redux';

const posts = handleActions({
  ['posts/get'](state) {
    return { ...state, loading: true, };
  },
  ['posts/get/success'](state, action) {
    return { ...state, list: action.payload.data, visitors: action.payload.visitingCount, loading: false, };
  },
  ['posts/get/failed'](state, action) {
    return { ...state, err: action.err, loading: false, };
  },
}, {
  list: [],
  loading: false,
});

export default posts;
