/* REDUCERS:
    - Determine which action is being called.
    - Determine the appropriate response to return.
    - Don't manipulate the incoming data. Replicate the incoming data, outputting new data (arrays/objects)
*/

//Coin Prices Reducer

const coinPricesReducerDefaultState = [];

const coinPricesReducer = (state = coinPricesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_COIN_PRICE':
            return [
                ...state,
                action.coinPrice
            ];
        case 'REMOVE_COIN_PRICE':
            return state.filter(({id}) => id !== action.id);
        case 'EDIT_COIN_PRICE':
            return state.map((coinPrice) => {
                if( coinPrice.id === action.id ){
                    return {
                        ...coinPrice,
                        ...action.updates
                    };
                } else {
                    return coinPrice;
                }
            });
        case 'SET_COIN_PRICES':
            return action.coinPrices;
        default:
            return state;
    }
};

export default coinPricesReducer;