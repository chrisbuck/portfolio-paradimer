import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetCoinPrices } from './actions/prices';
import { startSetHoldings } from './actions/holdings';
import { login, logout } from './actions/auth';
//import getVisiblePrices from './selectors/prices';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

const store = configureStore();

// store.dispatch(addExpense({ description: 'Water bill', amount: 4500} ));
// store.dispatch(addExpense({ description: 'Gas bill', createdAt: 1000 } ));
// store.dispatch(addExpense({ description: 'Rent', amount: 109500 } ));
// store.dispatch(setTextFilter('water'));

// setTimeout(() => {
//     store.dispatch(setTextFilter('bill'));
// }, 3000);

// const state = store.getState();
// const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
// console.log(visibleExpenses);

//console.log(store.getState());

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if(user){
        store.dispatch(login(user.uid));
        store.dispatch(startSetCoinPrices()).then(() =>{
            store.dispatch(startSetHoldings());
            renderApp();
            if ( history.location.pathname === '/' ) {
                history.push('/dashboard');
            }
        });
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});