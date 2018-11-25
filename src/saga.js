import { put, all, takeLatest } from 'redux-saga/effects'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchAuthors() {
    try {
        const authors = yield fetch('http://127.0.0.1:8080/authors')
            .then(response => response.json())

        yield put({type: "AUTHOR_FETCH_SUCCEEDED", getAuthors: authors});
    } catch (e) {
        yield put({type: "AUTHOR_FETCH_FAILED", message: e.message});
    }
}
function* fetchStats(id) {
    try{
        const stats = yield fetch(`http://127.0.0.1:8080/stats/${id.id}`)
            .then(res => res.json())
        const newStats = {
            name: id.id,
            words: stats
        };
        yield put({type:'STATS_FETCH_SUCCEEDED', getStats: newStats})
    } catch (e) {
        yield put({type: 'STATS_FETCH_FAILED', message: e.message})
    }
}
function* mySaga() {
    yield takeLatest("GET_AUTHORS", fetchAuthors);
    yield takeLatest('GET_STATS', fetchStats);
}

export default function* rootSaga(){
    yield all([
        mySaga(),
    ])
}