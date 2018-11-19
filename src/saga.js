import { put, all, takeLatest } from 'redux-saga/effects'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchAuthors() {
    try {
        const author = yield fetch('http://127.0.0.1:8080')
            .then(response => response.json())
            .then(json => console.log(json.authors))
        yield put({type: "AUTHOR_FETCH_SUCCEEDED", author: author});
    } catch (e) {
        yield put({type: "AUTHOR_FETCH_FAILED", message: e.message});
    }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
// function* mySaga() {
//     yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
// }

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* mySaga() {
    yield takeLatest("AUTHOR_FETCH_REQUESTED", fetchAuthors);
}

export default function* rootSaga(){
    yield all([
        mySaga(),
    ])
}