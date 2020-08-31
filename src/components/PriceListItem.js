import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import { CurrentPriceListItem } from '../apis/apis';
import { connect } from 'react-redux';
//import { removeExpense } from '../actions/expenses';
import { startEditCoinPrice } from '../actions/prices';

//const PriceListItem = ({ id, symbol, exchange, currentPrice, lastPrice, tradingPair, createdAt }) => (
const PriceListItem = (props) => (
        <Link className="list-item" to={`/edit/${props.id}`}>
            <div>
                <h3 className="list-item__title">{props.symbol}</h3>
                <span className="list-item__sub-title">{moment(props.createdAt).format('MMM Do, YYYY')}</span>
            </div>
            <div className={`exchange-${props.exchange.toLowerCase()}`}>
                <h3 className="list-item__data">{props.exchange}</h3>
            </div>
            <CurrentPriceListItem 
                symbol={props.symbol} 
                exchange={props.exchange}
                currentPrice={props.currentPrice}
                lastPrice={props.lastPrice}
                tradingPair={props.tradingPair} 
                onChange={(props) => {
                    dispatch(startEditCoinPrice(props.id, props))
                }}
            />
        </Link>
);

//export default connect()(ExpenseListItem);  //Don't need a function. connect just gives access to dispatch.
//export default PriceListItem;
// const mapStateToProps = (state, props) => {
//     return {
//         coinPrice: state.coinPrices.find((coinPrice) => coinPrice.id === props.match.params.id)
//     }
// }

export default connect()(PriceListItem);