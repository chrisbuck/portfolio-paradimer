/* REDUCERS:
    - Determine which action is being called.
    - Determine the appropriate response to return.
    - Don't manipulate the incoming data. Replicate the incoming data, outputting new data (arrays/objects)
*/

//Coin Prices Reducer

const holdingsReducerDefaultState = [];

const holdingsReducer = (state = holdingsReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_HOLDING':
            return [
                ...state,
                action.holding
            ];
        case 'REMOVE_HOLDING':
            return state.filter(({id}) => id !== action.id);
        case 'EDIT_HOLDING':
            return state.map((holding) => {
                if( holding.id === action.id ){
                    return {
                        ...holding,
                        ...action.updates
                    };
                } else {
                    return holding;
                }
            });
        case 'SET_HOLDINGS':
            return action.holdings;
        default:
            return state;
    }
};

export default holdingsReducer;