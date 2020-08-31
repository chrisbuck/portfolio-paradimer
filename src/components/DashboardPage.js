import React from 'react';
import PriceList from './PriceList';
import PriceListFilters from './PriceListFilters';
import PricesSummary from './PricesSummary';
/*
<ExpensesSummary />
<ExpenseListFilters />
*/
const DashboardPage = () => (
    <div>
        <PricesSummary />
        <PriceListFilters />
        <PriceList />
    </div>
);

export default DashboardPage;