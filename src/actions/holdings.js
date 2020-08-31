import { v4 as uuid } from 'uuid';
import database from '../firebase/firebase';

// ADD_HOLDING
export const addHolding = ({
    symbol = '',
    exchange = '',
    wallet = '',
    qty = 0,
    basis = 0,
    basisPrice = 0,
    currentPrice = 0,
    currentValue = 0,
    tradingPair = '',
    delta = 0,
    createdAt = 0
    } = {}) => ({
        type: 'ADD_HOLDING',
        symbol,
        exchange,
        wallet,
        qty,
        basis,
        basisPrice,
        currentPrice,
        currentValue,
        tradingPair,
        delta,
        createdAt
});

// Start Add HOLDING
export const startAddHolding = (holdingData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
                symbol = '',
                exchange = '',
                wallet = '',
                qty = 0,
                basis = 0,
                basisPrice = 0,
                currentPrice = 0,
                currentValue = 0,
                tradingPair = '',
                delta = 0,
                createdAt = 0
            } = holdingData;
            const holding = { symbol, exchange, wallet, qty, basis, basisPrice, currentPrice, currentValue, tradingPair, delta, createdAt };
            
            return database.ref(`users/${uid}/holdings`).push(holding).then((ref) => {
                dispatch(addHolding(
                    {
                        id: ref.key,
                        ...holding
                    }
                ))
            });
        };
    };

// REMOVE_HOLDING
export const removeHolding = ({id} = {}) => ({
    type: 'REMOVE_HOLDING',
    id
});

export const startRemoveHolding = ({id} = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/holdings/${id}`).remove().then(() => {
            dispatch(removeHolding({id}));
        });
    };
};

// EDIT_HOLDING
export const editHolding = (id, updates) => ({
    type: 'EDIT_HOLDING',
    id,
    updates
});

export const startEditHolding = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/holdings/${id}`).update(updates).then(()=>{
            dispatch(editHolding(id, updates));
        });
    };
};

// SET_HOLDINGS
export const setHoldings = (holdings) => ({
    type: 'SET_HOLDINGS',
    holdings
});

// START_SET_COIN_PRICES
export const startSetHoldings = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/holdings`).once('value').then((snapshot) => {
            const holdings = [];
            snapshot.forEach((childSnapshot) => {
                holdings.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            
            dispatch(setHoldings(holdings));
        });
    };
};