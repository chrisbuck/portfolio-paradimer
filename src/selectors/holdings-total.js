const totalPrices = (holdings) => {
    return holdings
        .map((holding) => holding.currentPrice)
        .reduce((sum, value) => sum + value, 0);
}

const totalValue = (holdings) => {
    return holdings
        .map((holding) => holding.currentValue)
        .reduce((sum, value) => sum + value, 0)
}

const totalDelta = (holdings) => {
    return holdings
        .map((holding) => holding.delta)
        .reduce((sum, value) => sum + value, 0)
}
export {totalPrices, totalValue, totalDelta};