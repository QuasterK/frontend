import { put, all, takeLatest } from 'redux-saga/effects'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchAuthors() {
    try {
        const authors = yield fetch('http://127.0.0.1:8080/authors')
            .then(response => response.json());


        yield put({type: "AUTHOR_FETCH_SUCCEEDED", getAuthors: authors});
    } catch (e) {
        yield put({type: "AUTHOR_FETCH_FAILED", message: e.message});
    }
}

function* mySaga() {
    yield takeLatest("GET_AUTHORS", fetchAuthors);
}

export default function* rootSaga(){
    yield all([
        mySaga(),
    ])
}