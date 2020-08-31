import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import { CurrentHoldingValue } from '../apis/apis';
import { connect } from 'react-redux';
//import { removeExpense } from '../actions/expenses';
import { startEditHolding } from '../actions/holdings';
import Calculator from './HoldingCalculator';

//const HoldingListItem = ({ id, symbol, exchange, currentPrice, lastPrice, tradingPair, createdAt }) => (
const plusButtonEvent = (e) => {
    e.preventDefault();
    return(
        <Calculator />
    );
}

class HoldingListItem extends React.Component {
    constructor(props){
        super(props);
        let params = this.props;
        this.state = {
            id: params.id,
            symbol: params.symbol,
            exchange: params.exchange,
            wallet: params.wallet,
            qty: params.qty,
            basis: params.basis,
            basisPrice: params.basisPrice,
            tradingPair: params.tradingPair,
            delta: params.delta,
            createdAt: params.createdAt
        }
    }
    render(){
        return(
            <div>
                <Link className="list-item" to={`/holdings/edit/${this.state.id}`}>
                    <div>
                        <h3 className="list-item__title">{this.state.symbol}</h3>
                        <span className="list-item__sub-title">{moment(this.state.createdAt).format('MMM Do, YYYY')}</span>
                    </div>
                    <div className={`exchange-${this.state.exchange.toLowerCase()}`}>
                        <h3 className="list-item__data">{this.state.exchange}</h3>
                    </div>
                    <div>
                        <h3 className="list-item__data">{this.state.qty}</h3>
                    </div>
                    <div>
                        <h3 className="list-item__data">{numeral(this.state.basis).format('$0,0.00')}</h3>
                        { this.state.basis && parseFloat(this.state.basis) > 0 ? (
                            <h3 className="list-item__data">{numeral(this.state.basis / this.state.qty).format('$0,000.000000')}</h3>
                        ) : ''}
                    </div>
                    <CurrentHoldingValue 
                        id={this.state.id}
                        symbol={this.state.symbol}
                        exchange={this.state.exchange}
                        wallet={this.state.wallet}
                        qty={this.state.qty}
                        basis={this.state.basis}
                        basisPrice={this.state.basisPrice}
                        currentPrice={this.state.currentPrice}
                        currentValue={this.state.currentValue}
                        tradingPair={this.state.tradingPair}
                        delta={this.state.delta}
                        createdAt={this.state.createdAt}
                    />
                </Link>
                <div>
                    <Calculator holding={this.state} id={this.state.id} />
                </div>
            </div>
        );
    }
}

//export default connect()(ExpenseListItem);  //Don't need a function. connect just gives access to dispatch.
//export default HoldingListItem;
// const mapStateToProps = (state, props) => {
//     return {
//         coinPrice: state.coinPrices.find((coinPrice) => coinPrice.id === props.match.params.id)
//     }
// }

export default connect()(HoldingListItem);