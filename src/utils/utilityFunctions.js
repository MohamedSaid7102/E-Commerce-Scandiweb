export function checkObjectsEquality(x, y) {
  const ok = Object.keys,
    tx = typeof x,
    ty = typeof y;
  return x && y && tx === 'object' && tx === ty
    ? ok(x).length === ok(y).length &&
        ok(x).every((key) => checkObjectsEquality(x[key], y[key]))
    : x === y;
}

export function checkArraysEquality(firstArr, secondArr) {
  return firstArr.toString() === secondArr.toString();
}

export function getPrice(prices, currency) {
  return prices.filter((price) =>
    checkObjectsEquality(price.currency, currency)
  )[0];
}
