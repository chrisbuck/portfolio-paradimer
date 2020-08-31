import React from 'react';
import numeral from 'numeral';
import { connect } from 'react-redux';
import database from '../firebase/firebase';

// Firebase
const updateCurrentPrice = (id, uid, currentPrice) => {
    let updates = {
        currentPrice
    };
    return database.ref(`users/${uid}/holdings/${id}`).update(updates).then(()=>{
        console.log('Current Price Edited in Firebase');
    });
};
const updateCurrentValue = (id, uid, currentValue) => {
    let updates = {
        currentValue
    };
    return database.ref(`users/${uid}/holdings/${id}`).update(updates).then(()=>{
        console.log('Current Value Edited in Firebase');
    });
};
const updateCurrentDelta = (id, uid, delta) => {
    let updates = {
        delta
    };
    return database.ref(`users/${uid}/holdings/${id}`).update(updates).then(()=>{
        console.log('Current Delta Edited in Firebase');
    });
};

// Binance
const getBinancePrice = async (symbol, tradingPair) => {
    let unitPrice = await fetch(`https://paradimer-external.herokuapp.com/binance/avgprice?symbol=${symbol}&pair=${tradingPair}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then((data) => {
        console.log(data);
        return(data.json());
    }).then((response) => {
        let price = response.price;
        console.log('Binance price:', price);
        return parseFloat(price);
    });

    return unitPrice;
};

//Bittrex
const getBittrexPrice = async (symbol, tradingPair) => {
    let unitPrice = await fetch(`https://paradimer-external.herokuapp.com/bittrex/getticker?market=${tradingPair}-${symbol}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then((data) => {
        return(data.json());
    }).then((price) => {
        return price.Last;
    });

    return unitPrice;
};

//Coinbase
const getCoinbasePrice = async( symbol ) => {
    let unitPrice = await fetch(`https://paradimer-external.herokuapp.com/coinbase/spotprice?symbol=${symbol}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then((response) => {
        return(response.json());
    }).then((response) => {
        return response.data.amount;
    });

    return unitPrice;
};

//HitBTC
const getHitBTCPrice = async( symbol ) => {
    let unitPrice = await fetch(`https://paradimer-external.herokuapp.com/hitbtc/ticker?symbol=${symbol}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then((response) => {
        return(response.json());
    }).then((response) => {
        return parseFloat(response.last);
    });

    return unitPrice;
};

//Kucoin
const getBitcoinKucoin = async() =>{
    let unitPrice = await fetch(`https://paradimer-external.herokuapp.com/kucoin/spotprice?symbol=BTC&pair=USDT`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then((data) => {
        return(data.json());
    }).then((jsonData) => {
        let data = jsonData;
        let askPrice = parseFloat(data.bestAsk);
        let bidPrice = parseFloat(data.bestBid);
        let price = (askPrice + bidPrice) / 2;
        return price;
    });

    return unitPrice;
}
const getKucoinPrice = async (symbol, tradingPair) => {
    let btcPrice = 0;
    if( tradingPair === 'BTC' ){
        btcPrice = await getBitcoinKucoin();
        console.log(btcPrice);
    }
    let unitPrice = await fetch(`https://paradimer-external.herokuapp.com/kucoin/spotprice?symbol=${symbol}&pair=${tradingPair}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then((data) => {
        return(data.json());
    }).then((jsonData) => {
        let data = jsonData;
        let askPrice = parseFloat(data.bestAsk);
        let bidPrice = parseFloat(data.bestBid);
        let price = ( askPrice + bidPrice ) / 2;
        let usdPrice = price;
        if( tradingPair === 'BTC' ){
            usdPrice = price * btcPrice;
        }
        return usdPrice;
    });

    return unitPrice;
};

class CurrentPriceListItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            symbol: props.symbol ? props.symbol : '',
            exchange: props.exchange ? props.exchange : '',
            currentPrice: props.currentPrice ? props.currentPrice : 0,
            lastPrice: props.lastPrice ? props.lastPrice : 0,
            tradingPair: props.tradingPair ? props.tradingPair : ''
        };
    }
    async componentDidMount(){
        const symbol = this.state.symbol;
        const exchange = this.state.exchange;
        const tradingPair = this.state.tradingPair;
        const currentPrice = this.state.currentPrice;
        let updatedPrice = currentPrice;
        switch(exchange){
            case 'Binance':
                updatedPrice = await getBinancePrice(symbol, tradingPair);
                console.log('Binance', updatedPrice);
                this.setState({currentPrice: updatedPrice});
                break;
            case 'Bittrex':
                updatedPrice = await getBittrexPrice(symbol, tradingPair);
                console.log('Updated Bittrex Price', updatedPrice);
                this.setState({currentPrice: updatedPrice});
                break
            case 'Coinbase':
                updatedPrice = await getCoinbasePrice(symbol);
                console.log('Coinbase', updatedPrice);
                this.setState({currentPrice: updatedPrice});
                break;
            case 'KuCoin':
                updatedPrice = await getKucoinPrice(symbol, tradingPair);
                console.log('KuCoin Price', updatedPrice);
                this.setState({currentPrice: updatedPrice});
                break;
            default:
                break;
        }
    }
    render(){
        const currentPrice = this.state.currentPrice;
        const lastPrice = this.state.lastPrice;
        let priceStyle = '';
        if( currentPrice > lastPrice ){
            priceStyle = ' text-gain';
        } else if ( currentPrice < lastPrice ){
            priceStyle = ' text-loss';
        }
        let changeStyle = '';
        let pctChange = (currentPrice - lastPrice)/lastPrice;
        if(pctChange < 0){
            changeStyle = 'percent-loss';
        } else if ( pctChange > 0 ){
            changeStyle = 'percent-gain';
        }
        return(
            <div className="list-item__block">
                <div>
                    <h3 className={'list-item__data' + priceStyle}>{numeral(currentPrice).format('$0,0.000000')}</h3>
                </div>
                <div>
                    <h3 className="list-item__data">{numeral(lastPrice).format('$0,0.000000')}</h3>
                </div>
                <div>
                    <h3 className={'list-item__data' + priceStyle}>{numeral(pctChange).format('0,000.0%')}</h3>
                </div>
            </div>
        );
    }
};

class HoldingValue extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            symbol: props.symbol ? props.symbol : '',
            exchange: props.exchange ? props.exchange : '',
            qty: props.qty ? props.qty : 0,
            basis: props.basis ? props.basis : 0,
            basisPrice: props.basisPrice ? props.basisPrice : 0,
            currentPrice: props.currentPrice ? props.currentPrice : 0,
            currentValue: props.currentValue ? props.currentValue : 0,
            tradingPair: props.tradingPair ? props.tradingPair : '',
            delta: props.delta ? props.delta : 0,
            uid: props.uid
        };
    }
    async componentDidMount(){
        const holding = this.state.holding;
        const id = this.state.id;
        console.log(id);
        const uid = this.state.uid;
        console.log(uid);
        const symbol = this.state.symbol;
        const exchange = this.state.exchange;
        const qty = this.state.qty;
        const basis = this.state.basis;
        const basisPrice = this.state.basisPrice;
        const tradingPair = this.state.tradingPair;
        const currentPrice = this.state.currentPrice;
        const currentValue = this.state.currentValue;
        const delta = this.state.delta;
        let updatedPrice = currentPrice;
        let updatedValue = currentValue;
        let updatedDelta = delta;
        let updatedBasisPrice = basisPrice;

        switch(exchange){
            case 'Binance':
                updatedPrice = await getBinancePrice(symbol, tradingPair);
                updatedValue = updatedPrice * qty;
                updatedDelta = updatedValue - basis;
                updatedBasisPrice = basis / qty;
                console.log('Updated Binance Price', updatedPrice);
                await updateCurrentPrice(id, uid, updatedPrice);
                await updateCurrentValue(id, uid, updatedValue);
                await updateCurrentDelta(id, uid, updatedDelta);
                this.setState({
                    basisPrice: updatedBasisPrice,
                    currentPrice: updatedPrice,
                    currentValue: updatedValue,
                    delta: updatedDelta
                });
                break;
            case 'Bittrex':
                updatedPrice = await getBittrexPrice(symbol, tradingPair);
                updatedValue = updatedPrice * qty;
                updatedDelta = updatedValue - basis;
                updatedBasisPrice = basis / qty;
                console.log('Updated Bittrex Price', updatedPrice);
                await updateCurrentPrice(id, uid, updatedPrice);
                await updateCurrentValue(id, uid, updatedValue);
                await updateCurrentDelta(id, uid, updatedDelta);
                this.setState({
                    basisPrice: updatedBasisPrice,
                    currentPrice: updatedPrice,
                    currentValue: updatedValue,
                    delta: updatedDelta
                });
                break;
            case 'Coinbase':
                updatedPrice = await getCoinbasePrice(symbol);
                updatedValue = updatedPrice * qty;
                updatedDelta = updatedValue - basis;
                updatedBasisPrice = basis / qty;
                console.log('Updated Coinbase Price', updatedPrice);
                await updateCurrentPrice(id, uid, updatedPrice);
                await updateCurrentValue(id, uid, updatedValue);
                await updateCurrentDelta(id, uid, updatedDelta);
                this.setState({
                    basisPrice: updatedBasisPrice,
                    currentPrice: updatedPrice,
                    currentValue: updatedValue,
                    delta: updatedDelta
                });
                break;
            case 'HitBTC':
                updatedPrice = await getHitBTCPrice(symbol);
                updatedValue = updatedPrice * qty;
                updatedDelta = updatedValue - basis;
                updatedBasisPrice = basis / qty;
                console.log('Updated HitBTC Price', updatedPrice);
                await updateCurrentPrice(id, uid, updatedPrice);
                await updateCurrentValue(id, uid, updatedValue);
                await updateCurrentDelta(id, uid, updatedDelta);
                this.setState({
                    basisPrice: updatedBasisPrice,
                    currentPrice: updatedPrice,
                    currentValue: updatedValue,
                    delta: updatedDelta
                });
                break;
            case 'KuCoin':
                updatedPrice = await getKucoinPrice(symbol, tradingPair);
                updatedValue = updatedPrice * qty;
                updatedDelta = updatedValue - basis;
                updatedBasisPrice = basis / qty;
                console.log('Updated KuCoin Price', updatedPrice);
                await updateCurrentPrice(id, uid, updatedPrice);
                await updateCurrentValue(id, uid, updatedValue);
                await updateCurrentDelta(id, uid, updatedDelta);
                this.setState({
                    basisPrice: updatedBasisPrice,
                    currentPrice: updatedPrice,
                    currentValue: updatedValue,
                    delta: updatedDelta
                });
                break;
            default:
                break;
        }
    }
    render(){
        const currentValue = this.state.currentValue;
        const currentPrice = this.state.currentPrice;
        const basis = this.state.basis;
        const delta = this.state.delta;
        let valueStyle = '';
        if( currentValue > basis ){
            valueStyle = ' text-gain';
        } else if ( currentValue < basis ){
            valueStyle = ' text-loss';
        }
        let changeStyle = '';
        let pctChange = (currentValue - basis)/basis;
        if(pctChange < 0){
            changeStyle = 'percent-loss';
        } else if ( pctChange > 0 ){
            changeStyle = 'percent-gain';
        }
        return(
            <div className="list-item__block">
                <div>
                    <h3 className={'list-item__data' + valueStyle}>{numeral(currentValue).format('$0,000.00')}</h3>
                    <h3 className={'list-item__data' + valueStyle}>{numeral(currentPrice).format('$0,000.000000')}</h3>
                </div>
                <div>
                    <h3 className={'list-item__data' + valueStyle}>{numeral(delta).format('$0,000.00')}</h3>
                    <h3 className={'list-item__data' + valueStyle}>{numeral(pctChange).format('0,000.0%')}</h3>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        uid: state.auth.uid
    }
}
const CurrentHoldingValue = connect(mapStateToProps)(HoldingValue);
export { getBittrexPrice, getBinancePrice, getCoinbasePrice, CurrentPriceListItem, CurrentHoldingValue };

class BittrexValue extends React.Component {
    constructor(props){
        super(props);
        const params = this.props;
        this.state = {
            symbol: params.symbol,
            qty: params.qty,
            priceUnits: params.priceUnits,
            currentValue: 0
        };
    }
    
    async componentDidMount(){
        let symbol = this.state.symbol;
        let priceUnits = this.state.priceUnits;
        let dollarPrice = 0;
        let btcPrice = 0;
        let currentValue = this.state.currentValue;
        let qty = this.state.qty;

        let unitPrice = await fetch(`https://paradimer-external.herokuapp.com/bittrex/getticker?market=${priceUnits}-${symbol}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((data) => {
            return(data.json());
        }).then((price) => {
            return price.Last;
        });

        if( priceUnits === 'BTC' ){
            btcPrice = await fetch('https://paradimer-external.herokuapp.com/bittrex/getticker?market=USD-BTC', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then((data) => {
                return(data.json());
            }).then((price) => {
                return price.Last;
            });

            dollarPrice = btcPrice * unitPrice;
        } else {
            dollarPrice = unitPrice;
        }

        currentValue = dollarPrice * qty;

        this.setState({currentValue: currentValue});
    }
    render(){
        const currentValue = this.state.currentValue;
        return(
            <p>{numeral(currentValue).format('$0,0.00')}</p>
        );
    }
}
