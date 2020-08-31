import moment from 'moment';

// Get visible expenses
const getVisibleCoinPrices = (coinPrices, {text, sortBy, startDate, endDate }) => {
    return coinPrices.filter((coinPrice) => {
        const createdAtMoment = moment(coinPrice.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
        const textMatch = coinPrice.symbol.toLowerCase().includes(text.toLowerCase());

        //return startDateMatch && endDateMatch && textMatch;
        return textMatch;
    }).sort((a, b) => {
        if( sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if ( sortBy === 'amount' ){
            return a.currentPrice < b.currentPrice ? 1 : -1;
        } else if ( sortBy === 'name' ){
            return a.symbol > b.symbol ? 1 : -1;
        }
    });
};

export default getVisibleCoinPrices;