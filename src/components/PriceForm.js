import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
//APIs
import { getBittrexPrice, getBinancePrice } from '../apis/apis';


//moment -- momentjs.com/docs/#/displaying
//airbnb.io > react-dates

export default class PriceForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            symbol: props.coinPrice ? props.coinPrice.symbol : '',
            exchange: props.coinPrice ? props.coinPrice.exchange : '',
            currentPrice: props.coinPrice ? props.coinPrice.currentPrice : 0,
            lastPrice: props.coinPrice ? props.coinPrice.lastPrice : 0,
            lastAction: props.coinPrice ? props.coinPrice.lastAction : '',
            tradingPair: props.coinPrice ? props.coinPrice.tradingPair : '',
            createdAt: props.coinPrice ? moment(props.coinPrice.createdAt) : moment(),
            calendarFocused: false,
            textStyle: 'text-neutral',
            error: ''
        };
    }
    
    onSymbolChange = (e) => {
        const symbol = e.target.value;
        //this.setState(() => ({symbol}));
        this.setState({symbol: symbol});
    };
    onExchangeChange = (e) => {
        const exchange = e.target.value;
        this.setState({exchange: exchange});
    };
    onCurrentPriceChange = (e) => {
        const currentPrice = e.target.value;
        this.setState({currentPrice: currentPrice});
    };
    onLastPriceChange = (e) => {
        const lastPrice = e.target.value;
        this.setState({lastPrice: lastPrice});
    };
    onLastActionChange = (e) => {
        const lastAction = e.target.value;
        this.setState({lastAction: lastAction});
    };
    onTradingPairChange = (e) => {
        const tradingPair = e.target.value;
        this.setState({tradingPair: tradingPair});
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
                currentPrice: parseFloat(this.state.currentPrice, 10),
                lastPrice: this.state.lastPrice,
                lastAction: this.state.lastAction,
                tradingPair: this.state.tradingPair,
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
            default:
                return{
                    currentPrice
                };
        }
    };

    async componentDidMount(){
        const lastPrice = this.state.lastPrice;
        const currentPrice = await this.getUpdatedPrice();
        let textStyle = 'text-neutral';

        if( lastPrice > 0 && lastPrice > currentPrice ){
            textStyle = 'text-loss';
        } else if ( lastPrice > 0 && lastPrice < currentPrice ){
            textStyle = 'text-gain';
        }
        this.setState({
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
                        type="number"
                        placeholder="Current Price"
                        className="text-input"
                        value={this.state.currentPrice}
                        onChange={this.onCurrentPriceChange}
                    />
                    <input
                        type="number"
                        placeholder="Last Price"
                        className="text-input"
                        value={this.state.lastPrice}
                        onChange={this.onLastPriceChange}
                    />
                    <select className="select-input" defaultValue={this.state.lastAction} onChange={this.state.onLastActionChange}>
                        <option value="" checked={this.state.lastAction === '' ? true : false}></option>
                        <option value="Long" checked={this.state.lastAction === 'Long' ? true : false}>Long</option>
                        <option value="Short" checked={this.state.lastAction === 'Short' ? true : false}>Short</option>
                    </select>
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