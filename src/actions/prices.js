import { v4 as uuid } from 'uuid';
import database from '../firebase/firebase';

// ADD_COIN_PRICE
export const addCoinPrice = ({
    symbol = '',
    exchange = '',
    currentPrice = 0,
    lastPrice = 0,
    tradingPair = '',
    createdAt = 0
    } = {}) => ({
        type: 'ADD_COIN_PRICE',
        symbol,
        exchange,
        currentPrice,
        lastPrice,
        tradingPair,
        createdAt
});

// Start Add Coin Price
export const startAddCoinPrice = (coinPriceData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
                symbol = '',
                exchange = '',
                currentPrice = 0,
                lastPrice = 0,
                tradingPair = '',
                createdAt = 0
            } = coinPriceData;
            const coinPrice = { symbol, exchange, currentPrice, lastPrice, tradingPair, createdAt };
            
            return database.ref(`users/${uid}/prices`).push(coinPrice).then((ref) => {
                dispatch(addCoinPrice(
                    {
                        id: ref.key,
                        ...coinPrice
                    }
                ))
            });
        };
    };

// REMOVE_COIN_PRICE
export const removeCoinPrice = ({id} = {}) => ({
    type: 'REMOVE_COIN_PRICE',
    id
});

export const startRemoveCoinPrice = ({id} = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/prices/${id}`).remove().then(() => {
            dispatch(removeCoinPrice({id}));
        });
    };
};

// EDIT_COIN_PRICE
export const editCoinPrice = (id, updates) => ({
    type: 'EDIT_COIN_PRICE',
    id,
    updates
});

export const startEditCoinPrice = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/prices/${id}`).update(updates).then(()=>{
            dispatch(editCoinPrice(id, updates));
        });
    };
};

// SET_COIN_PRICES
// actual action
export const setCoinPrices = (coinPrices) => ({
    type: 'SET_COIN_PRICES',
    coinPrices
});

// START_SET_COIN_PRICES
//async
export const startSetCoinPrices = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/prices`).once('value').then((snapshot) => {
            const coinPrices = [];
            snapshot.forEach((childSnapshot) => {
                coinPrices.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            
            dispatch(setCoinPrices(coinPrices));
        });
    };
};