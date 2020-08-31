import React from 'react';
import PriceForm from './PriceForm';
import { connect } from 'react-redux';
import { startAddCoinPrice } from '../actions/prices';

const AddCoinPricePage = (props) => (
    <div>
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Add Coin</h1>
            </div>
        </div>
        <div className="content-container">
            <PriceForm 
                onSubmit={(coinPrice) => {
                    props.dispatch(startAddCoinPrice(coinPrice));
                    props.history.push('/');
                }}
            />
        </div>
    </div>
);

export default connect()(AddCoinPricePage);