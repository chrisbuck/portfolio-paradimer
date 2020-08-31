import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
//APIs
import { getBittrexPrice, getBinancePrice, getCoinbasePrice } from '../apis/apis';


//moment -- momentjs.com/docs/#/displaying
//airbnb.io > react-dates

export default class HoldingForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            symbol: props.holding ? props.holding.symbol : '',
            exchange: props.holding ? props.holding.exchange : '',
            wallet: props.holding ? props.holding.wallet : '',
            qty: props.holding ? props.holding.qty : '',
            basis: props.holding ? props.holding.basis : '',
            basisPrice: props.holding ? props.holding.basisPrice : '',
            currentPrice: props.holding ? props.holding.currentPrice : '',
            currentValue: props.holding ? props.holding.currentValue : '',
            tradingPair: props.holding ? props.holding.tradingPair : '',
            delta: props.holding ? props.holding.delta : '',
            createdAt: props.holding ? moment(props.holding.createdAt) : moment(),
            calendarFocused: false,
            textStyle: 'text-neutral',
            error: ''
        };
    }
    
    //Prepopulate (external API calls)
    prepopulateCurrentPrice = async (symbol, exchange) => {
        let currentPrice = 0;
        if( symbol === '' || exchange === '' ){
            return true;
        } else {
            let tradingPair = this.state.tradingPair;
            if( tradingPair === '' ){
                return true;
            } else {
                switch( exchange ){
                    case 'Binance':
                        currentPrice = await getBinancePrice(symbol, tradingPair);
                        this.setState({currentPrice: currentPrice});
                        break;
                    case 'Bittrex':
                        currentPrice = await getBittrexPrice(symbol, tradingPair);
                        this.setState({currentPrice: currentPrice});
                        break;
                    case 'Coinbase':
                        currentPrice = await getCoinbasePrice(symbol);
                        this.setState({currentPrice: currentPrice});
                        break;
                    default:
                        return true;
                }
            }
        }
    }

    //Populate on mount
    populateBasisPrice = () => {
        let basisPrice = this.state.basisPrice;
        let basis = this.state.basis;
        let qty = this.state.qty;
        if( !basisPrice ){
            if( basis !== '' && qty !== '' ){
                basisPrice = basis / qty;
            }
        }
        
        console.log(basisPrice);
        return basisPrice;
    };

    //Change
    onSymbolChange = (e) => {
        const symbol = e.target.value;
        const exchange = this.state.exchange;
        this.prepopulateCurrentPrice(symbol, exchange);
        this.setState({symbol: symbol});
    };
    onExchangeChange = (e) => {
        const exchange = e.target.value;
        const symbol = this.state.symbol;
        this.prepopulateCurrentPrice(symbol, exchange);
        this.setState({exchange: exchange});
    };
    onWalletChange = (e) => {
        const wallet = e.target.value;
        this.setState({wallet: wallet});
    };
    onQtyChange = (e) => {
        const qty = e.target.value;
        this.setState({qty: qty});
    }
    onBasisChange = (e) => {
        const basis = e.target.value;
        this.setState({basis: basis});
    };
    onBasisPriceChange = (e) => {
        const basisPrice = e.target.value;
        this.setState({basisPrice: basisPrice});
    };
    onCurrentPriceChange = (e) => {
        const currentPrice = e.target.value;
        this.setState({currentPrice: currentPrice});
    };
    onCurrentValueChange = (e) => {
        const currentValue = e.target.value;
        this.setState({currentValue: currentValue});
    };
    // onLastPriceChange = (e) => {
    //     const lastPrice = e.target.value;
    //     this.setState({lastPrice: lastPrice});
    // };
    onTradingPairChange = (e) => {
        const tradingPair = e.target.value;
        const symbol = this.state.symbol;
        const exchange = this.state.exchange;
        this.setState({tradingPair: tradingPair});
        this.prepopulateCurrentPrice(symbol, exchange);
    };

    onDateChange = (createdAt) => {
        if( createdAt ){
            this.setState(() => ({ createdAt }));
        }
    };

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };

    onSubmit = (e) => {
        e.preventDefault();

        if(!this.state.symbol){
            this.setState(() => ({error: 'Please provide a symbol to track a coin.'}));
        } else {
            // clear the error
            this.setState(() => ({error: ''}));
            this.props.onSubmit({
                symbol: this.state.symbol,
                exchange: this.state.exchange,
                wallet: this.state.wallet,
                qty: this.state.qty,
                basis: this.state.basis,
                basisPrice: this.state.basisPrice,
                currentPrice: parseFloat(this.state.currentPrice, 10),
                currentValue: this.state.currentValue,
                tradingPair: this.state.tradingPair,
                delta: this.state.delta,
                createdAt: this.state.createdAt.valueOf()
            });
        }
    };

    getUpdatedPrice = () => {
        const exchange = this.state.exchange;
        const symbol = this.state.symbol;
        const tradingPair = this.state.tradingPair;
        const currentPrice = this.state.currentPrice;
        switch( exchange ){
            case 'Binance':
                return getBinancePrice(symbol, tradingPair);
            case 'Bittrex':
                return getBittrexPrice(symbol, tradingPair);
            case 'Coinbase':
                return getCoinbasePrice(symbol);
            default:
                return{
                    currentPrice
                };
        }
    };

    async componentDidMount(){
        const basis = this.state.basis;
        const qty = this.state.qty;
        const basisPrice = this.populateBasisPrice();
        const currentPrice = await this.getUpdatedPrice();

        let textStyle = 'text-neutral';

        // if( basisPrice > 0 && basisPrice > currentPrice ){
        //     textStyle = 'text-loss';
        // } else if ( basisPrice > 0 && basisPrice < currentPrice ){
        //     textStyle = 'text-gain';
        // }

        this.setState({ 
            basisPrice,
            currentPrice,
            textStyle
        });
    }
    render() {

        return (
            // <div>
            //     
                <form className="form" onSubmit={this.onSubmit}>
                    { this.state.error && <p className="form__error">{this.state.error}</p>}
                    <input 
                        type="text"
                        placeholder="Symbol"
                        autoFocus
                        className="text-input"
                        value={this.state.symbol}
                        onChange={this.onSymbolChange}
                    />
                    <input 
                        type="text"
                        placeholder="Exchange"
                        autoFocus
                        className="text-input"
                        value={this.state.exchange}
                        onChange={this.onExchangeChange}
                    />
                    <input 
                        type="text"
                        placeholder="Wallet"
                        autoFocus
                        className="text-input"
                        value={this.state.wallet}
                        onChange={this.onWalletChange}
                    />
                    <input
                        type="number"
                        placeholder="Quantity"
                        className="text-input"
                        value={this.state.qty}
                        onChange={this.onQtyChange}
                    />
                    <label><span>Basis</span></label>
                    <input
                        type="number"
                        placeholder="Basis"
                        className="text-input"
                        value={this.state.basis}
                        onChange={this.onBasisChange}
                    />
                    <input 
                        type="number"
                        placeholder="BasisPrice"
                        className="text-input"
                        value={this.state.basisPrice}
                        onChange={this.onBasisPriceChange}
                    />
                    <label><span>Current</span></label>
                    <input
                        type="number"
                        placeholder="Current Price"
                        className="text-input"
                        value={this.state.currentPrice}
                        onChange={this.onCurrentPriceChange}
                    />
                    <input
                        type="number"
                        placeholder="Current Value"
                        className="text-input"
                        value={this.state.currentValue}
                        onChange={this.onCurrentValueChange}
                    />
                    <input 
                        type="text"
                        placeholder="Trading Pair"
                        autoFocus
                        className="text-input"
                        value={this.state.tradingPair}
                        onChange={this.onTradingPairChange}
                    />
                    <SingleDatePicker 
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false }
                    />
                    <div><button className="button">Save Coin</button></div>
                </form>
            //</div>
        );
    }
}

/*
                    <input
                        type="number"
                        placeholder="Current Price"
                        className={ `text-input ${this.state.textStyle}` }
                        value={this.state.currentPrice}
                        onChange={this.onCurrentPriceChange}
                    />
                    */