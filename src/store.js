import {createStore, combineReducers, applyMiddleware} from 'redux';

// import saga middleware
import createSagaMiddleware from 'redux-saga';

//import reducers

//import saga
import rootSaga from'./saga'

//initialize saga middleware
const sagaMiddleware = createSagaMiddleware();

//initialize combineReducers
const rootReducer = combineReducers({

});

//create store
const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware),
);

//run saga
sagaMiddleware.run(rootSaga);

export default store;