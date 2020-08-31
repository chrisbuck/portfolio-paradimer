import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import selectPrices from '../selectors/prices';
import selectPricesTotal from '../selectors/prices-total';

export const PricesSummary = ({pricesCount, pricesTotal}) => {
    const priceWord = pricesCount === 1 ? 'coin' : 'coins';
    const formattedPricesTotal = numeral(pricesTotal / 100).format('$0,0.00');
    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Viewing <span>{pricesCount}</span> {priceWord} totalling <span>{formattedPricesTotal}</span></h1>
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Coin</Link>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const visibleCoins = selectPrices(state.coinPrices, state.filters);
    //const visibleCoins = selectPrices(state.coinPrices);

    return{
        pricesCount: visibleCoins.length,
        pricesTotal: selectPricesTotal(visibleCoins)
    };
};

export default connect(mapStateToProps)(PricesSummary);