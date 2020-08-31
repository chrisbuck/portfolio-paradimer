import React from 'react';
import HoldingsList from './HoldingsList';
import HoldingsListFilters from './HoldingsListFilters';
import HoldingsSummary from './HoldingsSummary';

const HoldingsPage = () => (
    <div>
        <HoldingsSummary />
        <HoldingsListFilters />
        <HoldingsList />
    </div>
);

export default HoldingsPage;