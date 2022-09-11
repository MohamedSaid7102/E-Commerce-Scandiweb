# Scandiweb 🚀

## E-Commerce website: visit it from [here](https://scandiweb-clint-shelf.herokuapp.com/).

# For Scandiweb evaluator, please evaluate ``` master ``` branch, not ``` my-own-feature branch ```.

## V1.0

## Things I added:

- Blurred transparent navbar.
- Bottom border for dropdown cart items.
- Remove from cart button, to allow user to remove items from cart

## Notes

- To enable attribute select in cart dropdown & cart 'checkout' just make `disableAttributeChange={false}` in `<CartItem/>` component in both `<Cart />` and `<CartDropdown/>` Components.

## Things I added:

- Removed some images from the product that contains the girl image, For Religious purposes.

### Style:

Instead of dividing style into multiple style sheets, I mad basic general styles into `index.css` and app style inside `app.css`, I divided the style sheet by component, If you are looking for the `<Hello />` component style you will find it in the `app.css` between:

```
// Hello Start

{
  // Style...
}

// Hello End
```

and included responsiveness as a sepert file
so remember to search with the component name for easy access.

## Backend ['GraphQL' endpoint](https://github.com/scandiweb/junior-react-endpoint)

