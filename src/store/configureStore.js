import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import holdingsReducer from '../reducers/holdings';
import pricesReducer from '../reducers/prices';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    //Store creation
    /* 
        Function that creates a store. The function is exported. 
        So kind of like a constructor. We can call it when we want, but we won't create the store until the function is called.
    */
        const store = createStore(
        combineReducers({
            coinPrices: pricesReducer,
            holdings: holdingsReducer,
            filters: filtersReducer,
            auth: authReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
};

