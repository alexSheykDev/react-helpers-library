/**
 * A helper function that calculates the total price.
 *
 * @param {number[]} prices - An array of item prices.
 * @returns {number} The total price of all items.
 */
function calculateTotalPrice(prices: Array<number>) {
  return prices.reduce((acc: number, price: number): number => acc + price, 0);
}