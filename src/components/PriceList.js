import React from 'react';
import { connect } from 'react-redux'; 
import PriceListItem from './PriceListItem';
import selectPrices from '../selectors/prices';

const PriceList = (props) => (
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Coins</div>
            <div className="show-for-desktop">Coin</div>
            <div className="show-for-desktop">Exchange</div>
            <div className="list-item__block">
                <div className="show-for-desktop">Current Price</div>
                <div className="show-for-desktop">Last Price</div>
                <div className="show-for-desktop">Percent Change</div>
            </div>
        </div>
        <div className="list-body">
            {   
                props.coinPrices.length === 0 ? (
                    <div className="list-item list-item--message">
                        <span>No current prices</span>
                    </div>
                ) : (
                    props.coinPrices.map( (coinPrice) => {
                        return <PriceListItem key={coinPrice.id} {...coinPrice} />
                    })
                )
            }
        </div>
    </div>
);

const mapStateToProps = (state) => {
    //define what info from store we want our component to access

    return {
        coinPrices: selectPrices(state.coinPrices, state.filters)
    };
};

export default connect(mapStateToProps)(PriceList);