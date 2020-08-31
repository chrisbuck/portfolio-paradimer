import React from 'react';
import { connect } from 'react-redux'; 
import HoldingListItem from './HoldingListItem';
import selectHoldings from '../selectors/holdings';

const HoldingsList = (props) => (
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Holdings</div>
            <div className="show-for-desktop">Coin</div>
            <div className="show-for-desktop">Exchange</div>
            <div className="show-for-desktop">Qty</div>
            <div className="show-for-desktop">Basis</div>
            <div className="list-item__block">
                <div className="show-for-desktop">Current Value</div>
                <div className="show-for-desktop">Delta</div>
            </div>
        </div>
        <div className="list-body">
            {   
                props.holdings.length === 0 ? (
                    <div className="list-item list-item--message">
                        <span>No current holdings</span>
                    </div>
                ) : (
                    props.holdings.map( (holding) => {
                        return <HoldingListItem key={holding.id} {...holding} />
                    })
                )
            }
        </div>
    </div>
);

const mapStateToProps = (state) => {
    //define what info from store we want our component to access

    return {
        holdings: selectHoldings(state.holdings, state.filters)
    };
};

export default connect(mapStateToProps)(HoldingsList);