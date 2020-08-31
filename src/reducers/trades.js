const tradesReducerDefaultState = [];

const tradesReducer = (state = tradesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_TRADE':
            return [
                ...state,
                action.trade
            ];
        case 'REMOVE_TRADE':
            return state.filter(({id}) => id !== action.id);
        case 'EDIT_TRADE':
            return state.map((trade) => {
                if( trade.id === action.id ){
                    return {
                        ...trade,
                        ...action.updates
                    };
                } else {
                    return trade;
                }
            });
        case 'SET_TRADES':
            return action.trades;
        default:
            return state;
    }
};

export default tradesReducer;