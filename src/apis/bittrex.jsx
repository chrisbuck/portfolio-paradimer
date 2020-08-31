import React from 'react';

const Bittrex = (props) => {
    return 0;
};

class BittrexPrice extends React.Component {
    constructor(props){
        super(props);
        const params = this.props;
        this.state = {
            symbol: params.symbol,
            qty: 0,
            priceUnits: params.priceUnits,
            currentPrice: 0
        };
    }
    
    async componentDidMount(){
        let symbol = this.state.symbol;
        let priceUnits = this.state.priceUnits;
        let priceData = await fetch(`https://paradimer-external.herokuapp.com/bittrex/getticker?market=${priceUnits}-${symbol}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((data) => {
             return(data.json());
        });
        const currentPrice = await priceData.Last;
        this.setState({currentPrice: currentPrice});
    }
    render(){
        const currentPrice = this.state.currentPrice;
        return(
            <p>{currentPrice}</p>
        );
    }
}

//export { methodRouter };
// // Binance
// function bnPrice(symbol) {
//     var baseUrl = 'https://api.binance.com/api/v3/avgPrice?symbol=';
//     var query = encodeURIComponent( symbol + 'USDT' );
//     var reply = UrlFetchApp.fetch(baseUrl + query);
//     var response = JSON.parse(reply);
//     var output = response.price;
//     return output;
//   }
  
//   // Bittrex
//   function bxPrice(symbol, pair) {
    
//     var baseUrl = 'https://api.bittrex.com/api/v1.1/public/getticker?market=';
    
//     var query = encodeURIComponent( 'USD-' + symbol );
//     if( pair !== undefined ){
//       query = pair + '-' + symbol;
//     }
//     var reply = UrlFetchApp.fetch(baseUrl + query);
//     var response = JSON.parse(reply);
//     var result = response.result;
//     var output = result.Last;
//     return output;
//   }
  
//   // Coinbase
//   function cbPrice(symbol){
//     var baseUrl = 'https://api.coinbase.com/v2/prices/';
//     var query = encodeURIComponent( symbol + '-USD/spot' );
//     var reply = UrlFetchApp.fetch(baseUrl + query);
//     var response = JSON.parse(reply);
//     var output = response.data.amount;
//     return output;
//     ;
//   }

// var fetchData = async(url = '') => {
//     const response = await fetch( url, {method: 'GET', mode: 'no-cors'});
//     return response.json();
// }
// var fetchPrice = async(url = '') => {
//     let mydata = await fetch(url, {mode: 'no-cors'})
//         .then(response => {
//         return response.text()
//         })
//         .then((data) => {
//         return(data ? JSON.parse(data) : {})
//         })
//         .catch((error) => {
//             console.log(error);
//         });
//     return mydata
// };
// var currentPrice = async (symbol, pair) => {
//     var baseUrl = 'https://api.bittrex.com/api/v1.1/public/getticker?market=';
    
//     var query = encodeURIComponent( 'USD-' + symbol );
//     if( pair !== undefined ){
//         query = pair + '-' + symbol;
//     }
//     var reply = await fetchPrice(baseUrl + query);
//     console.log(reply);
//     var response = JSON.parse(reply);
//     var result = response.result;
//     var output = result.Last;
//     console.log(output);
//     return output;
// };

// const bittrex = async (symbol, method) => {
//     switch(method){
//         case 'CURRENT_VALUE':
//             var latestPrice = currentPrice(symbol, 'BTC');
//             return latestPrice;
//         default:
//             return 0;
//     }
// };

export default Bittrex;