import {createStore, combineReducers, applyMiddleware} from 'redux';

// import saga middleware
import createSagaMiddleware from 'redux-saga';

//import reducers
import AuthorsReducer from './reducers/AuthorsReducer';
import StatsReducer from './reducers/StatsReducer';
import CalcSum from './reducers/CalcSum';
import ActiveAuthorsReducer from './reducers/ActiveAuthorsReducer';

//import saga
import rootSaga from'./saga'

//initialize saga middleware
const sagaMiddleware = createSagaMiddleware();

//initialize combineReducers
const appReducer = combineReducers({
    authors: AuthorsReducer,
    stats: StatsReducer,
    calc: CalcSum,
    active: ActiveAuthorsReducer,
});

//restore initial state
const rootReducer = (state, action) => {
    if (action.type === 'RESET') {
        state = undefined
    }

    return appReducer(state, action)
};

//create store
const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware),
);
//run saga
sagaMiddleware.run(rootSaga);

export default store;