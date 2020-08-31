import React from 'react';
import { connect } from 'react-redux';
import PriceForm from '../components/PriceForm';
import { startAddCoinPrice } from '../actions/prices';

const AddPricePage = (props) => (
    <div>
        <h1>Track a Price</h1>
        <PriceForm
            onSubmit={(coinPrice) => {
                props.dispatch(startAddCoinPrice(coinPrice));
                props.history.push('/');
            }}
        />
    </div>
)

export default connect()(AddPricePage);

// const AddExpensePage = (props) => (
//     <div>
//         <h1>Add Expense</h1>
//         <ExpenseForm 
//             onSubmit={(expense) => {
//                 props.dispatch(addExpense(expense));
//                 props.history.push('/');
//             }}
//         />
//     </div>
// );

// export default connect()(AddExpensePage);