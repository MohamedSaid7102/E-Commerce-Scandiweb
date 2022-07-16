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

// return a deepclone without a reference for objects
export function getObjectDeepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function getArrayDeepClone(arr) {
  return arr.map((item) =>
    typeof item === 'object' ? JSON.parse(JSON.stringify(item)) : item
  );
}
// Get all occerunce of item in an array
export function getAllIndexesInArrayOfObjects(arr, val, attr) {
  let indexes = [],
    i;
  for (i = 0; i < arr.length; i++) if (arr[i][attr] === val) indexes.push(i);
  return indexes;
}
// Check selectedAttributes if exists, or setDefaults
export function checkSelectedAttributes(obj) {
  return obj.selectedAttributes ? obj : setDefaults(obj);
}

// test if touch screen or not
export function isTouchDevice() {
  return window.matchMedia('(pointer: coarse)').matches;
}
