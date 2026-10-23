# Features

This document describes features confirmed by the code reviewed so far. Details will be expanded after reviewing the relevant page and API files.

## Cart

The cart context supports adding and removing products, checking whether a product is in the cart, changing quantities, and clearing the cart. Cart IDs and quantities persist in `localStorage`.

## Favorites

The favorites context supports toggling favorite products and checking whether a product is a favorite. Favorite IDs persist in `localStorage`.

## Product color utility

`src/utils/` contains a color helper:

- `normalizeColor(name)` converts the name to lowercase and removes spaces and hyphens.
- `getColorHex(name)` returns the mapped hexadecimal color value, or `#cccccc` when the color is not recognized.

The mapping includes common product colors such as black, blue, gold, green, red, silver, white, and others.
