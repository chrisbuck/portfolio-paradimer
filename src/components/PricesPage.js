import React from 'react';
import PriceList from './PriceList';
import PriceListFilters from './PriceListFilters';
import PricesSummary from './PricesSummary';

const PricesPage = () => (
    <div>
        <PricesSummary />
        <PriceListFilters />
        <PriceList />
    </div>
);

export default PricesPage;