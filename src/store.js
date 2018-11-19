import {createStore, combineReducers} from 'redux';

//initialize combineReducers
const rootReducer = combineReducers({

});

//create store
const store = createStore(
    rootReducer,
);

export default store;