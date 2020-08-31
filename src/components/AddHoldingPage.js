import React from 'react';
import HoldingForm from './HoldingForm';
import { connect } from 'react-redux';
import { startAddHolding } from '../actions/holdings';

const AddHoldingPage = (props) => (
    <div>
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Add Coin</h1>
            </div>
        </div>
        <div className="content-container">
            <HoldingForm 
                onSubmit={(holding) => {
                    props.dispatch(startAddHolding(holding));
                    props.history.push('/holdings');
                }}
            />
        </div>
    </div>
);

export default connect()(AddHoldingPage);