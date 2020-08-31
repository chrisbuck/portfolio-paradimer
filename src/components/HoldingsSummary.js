import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import selectHoldings from '../selectors/holdings';
import { totalValue, totalDelta } from '../selectors/holdings-total';

export const HoldingsSummary = ({holdingsCount, holdingsTotal, totalDelta}) => {
    const holdingsWord = holdingsCount === 1 ? 'coin' : 'coins';
    const formattedHoldingsTotal = numeral(holdingsTotal).format('$0,000.00');
    let gainLossWord = totalDelta > 0 ? 'gain' : 'loss';
    if( totalDelta === 0 ){
        gainLossWord = 'break even';
    }
    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Viewing <span>{holdingsCount}</span> {holdingsWord} totalling <span>{formattedHoldingsTotal}</span> for a <span>{gainLossWord}</span> of {numeral(totalDelta).format('$0,000.00')}</h1>
                <div className="page-header__actions">
                    <Link className="button" to="/holdings/add">Add Coin</Link>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const visibleCoins = selectHoldings(state.holdings, state.filters);
    //const visibleCoins = selectPrices(state.coinPrices);

    return{
        holdingsCount: visibleCoins.length,
        holdingsTotal: totalValue(visibleCoins),
        totalDelta: totalDelta(visibleCoins)
    };
};

export default connect(mapStateToProps)(HoldingsSummary);