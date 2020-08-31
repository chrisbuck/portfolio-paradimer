import React from 'react';
import { connect } from 'react-redux';
import PriceForm from './PriceForm';
import { startEditCoinPrice, startRemoveCoinPrice } from '../actions/prices';

const EditPricePage = (props) => {
    console.log(props);
    return(
    <div>
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Edit Coin</h1>
            </div>
        </div>
        <div className="content-container">
            <PriceForm
                coinPrice={props.coinPrice}
                onSubmit={(coinPrice) => {
                    // Dispatch the action to edit the expense
                    props.dispatch(startEditCoinPrice(props.coinPrice.id, coinPrice));
                    // Redirect to the dashboard
                    props.history.push('/');
                    console.log('updated', coinPrice);
                }}
            />
            <button className="button button--secondary" onClick={() => {
                props.dispatch(startRemoveCoinPrice({id: props.coinPrice.id}));
                props.history.push('/');
            }} >Remove Coin</button>
        </div>
    </div>
    )
};

const mapStateToProps = (state, props) => {
    return {
        coinPrice: state.coinPrices.find((coinPrice) => coinPrice.id === props.match.params.id)
    }
};

export default connect(mapStateToProps)(EditPricePage);