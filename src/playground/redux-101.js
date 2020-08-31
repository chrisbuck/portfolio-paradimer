import { createStore } from 'redux';

//action generators

// const add = ({data}) => {
//     return data.a + data.b;
// };
// console.log(add({ a: 1, b: 12}));

const incrementCount = ({ incrementBy = 1} = {}) => ({
    //Need default for /incremendBy, because if trying to access a property on an object that doesn't exist returns undefined.
    type: 'INCREMENT',
    //incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
    //incrementBy: incrementBy
    incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const setCount = ({count}) => ({
    type: 'SET',
    count
});

const resetCount = () => ({
    type: 'RESET'
});

// Reducers
// 1. Reducers are pure function
// Dont want to change variables or rely on variables outside of the reducer scope
// 2. Never change state or action
// Mutate the state on the new object. Don't change directly.
const countReducer = (state = {count: 0}, action) =>{
    switch( action.type ){
        case 'INCREMENT':
            //const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1; //rendered unnecessary by action generator
            return {
                //count: state.count + incrementBy
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            //const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
            return {
                //count: state.count - decrementBy
                count: state.count - action.decrementBy
            };
        case 'SET':
            return {
                count: action.count
            };
        case 'RESET':
            return {
                count: 0
            };
        default:
            return state;
    } 
};
// const store = createStore((state = {count: 0}, action) =>{
//     switch( action.type ){
//         case 'INCREMENT':
//             //const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1; //rendered unnecessary by action generator
//             return {
//                 //count: state.count + incrementBy
//                 count: state.count + action.incrementBy
//             };
//         case 'DECREMENT':
//             //const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
//             return {
//                 //count: state.count - decrementBy
//                 count: state.count - action.decrementBy
//             };
//         case 'SET':
//             return {
//                 count: action.count
//             };
//         case 'RESET':
//             return {
//                 count: 0
//             };
//         default:
//             return state;
//     } 
// });

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(incrementCount({ incrementBy: 5}));

store.dispatch(incrementCount());

store.dispatch(resetCount());

// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 5
// });

// store.dispatch({
//     type: 'INCREMENT'
// });

store.dispatch(decrementCount());

store.dispatch(decrementCount({decrementBy: 10}));

store.dispatch(setCount({ count: 101 }));
