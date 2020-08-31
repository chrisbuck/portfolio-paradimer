export default (coinPrices) => {
    return coinPrices
        .map((coinPrice) => coinPrice.currentPrice)
        .reduce((sum, value) => sum + value, 0);
}