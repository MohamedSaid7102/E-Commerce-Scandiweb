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

export function setDefaults(product) {
  // All this logic bacause backend doens't contain 'qty' & 'selectedAttributes' property
  // set qty if not set
  if (!product.qty) product.qty = 1;
  // If it's already exists return prodcut as it is.
  if (product.selectedAttributes) return product;

  let selectedAttributes = [];

  // If it doesn't has any attributes, make selectedAttributes = [].
  if (product.attributes.length === 0)
    return { ...product, selectedAttributes };

  // If it doese has attributes, make selectedAttributes the first selected from each attribute.
  product.attributes.forEach((attribute) =>
    selectedAttributes.push({ ...attribute, items: attribute.items[0] })
  );

  return { ...product, selectedAttributes };
}
