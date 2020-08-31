import React from 'react';
import PriceList from '../components/PriceList';
import { PriceListFilters } from '../components/PriceListFilters';
//import TradeListFilters from './TradeListFilters';
//import TradesSummary from './TradesSummary';

const PricesPage = () => (
    <div>
        <PriceListFilters />
        <PriceList />
    </div>
);

/*
    <TradesSummary />
    <TradeListFilters />
    <TradeList />
        */
export default PricesPage;