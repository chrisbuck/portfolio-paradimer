import moment from 'moment';

// Get visible
const getVisibleHoldings = (holdings, {text, sortBy, startDate, endDate }) => {
    return holdings.filter((holding) => {
        const createdAtMoment = moment(holding.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
        const textMatch = holding.symbol.toLowerCase().includes(text.toLowerCase());

        //return startDateMatch && endDateMatch && textMatch;
        return textMatch;
    }).sort((a, b) => {
        if( sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if ( sortBy === 'price' ){
            return a.currentPrice < b.currentPrice ? 1 : -1;
        } else if ( sortBy === 'name' ){
            return a.symbol > b.symbol ? 1 : -1;
        }
    });
};

export default getVisibleHoldings;