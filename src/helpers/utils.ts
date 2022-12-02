import React, { useState } from 'react';

export const useLocalStorage = <T>(key: string, defaultValue: []): [
  value: T[],
  setValue: React.Dispatch<React.SetStateAction<T[]>>,
] => {
  const valueFromStorage: T[] = JSON.parse(
    localStorage.getItem(key) || '[]',
  );
  const [value, setValue] = useState<T[]>(
    valueFromStorage.length === 0 ? defaultValue : valueFromStorage,
  );

  return [value, setValue];
};

export const getItemSaverFunction = (
  key: string,
  savedProducts: Product[],
  saveToState: React.Dispatch<React.SetStateAction<Product[]>>,
) => {
  return (newProduct: Product) => {
    let newProducts: Product[];
    const copyOfProducts = [...savedProducts];
    const savedProduct = savedProducts.find(
      item => item.id === newProduct.id,
    );
    const savedProductIndex = savedProduct
      ? savedProducts.indexOf(savedProduct)
      : -1;
    const isChangingQuantity = (
      savedProduct?.quantity !== newProduct.quantity
    ) && newProduct?.quantity;

    if (isChangingQuantity && savedProductIndex >= 0) {
      copyOfProducts[savedProductIndex].quantity = newProduct.quantity;
    }

    if (savedProduct) {
      newProducts = copyOfProducts.filter(
        (product) => {
          if (isChangingQuantity) {
            return true;
          }

          return product.id !== newProduct.id;
        },
      );
    } else {
      const useProduct = key === 'cart'
        ? { ...newProduct, quantity: 1 }
        : { ...newProduct };

      newProducts = [
        ...savedProducts,
        useProduct,
      ];
    }

    saveToState(newProducts);
    localStorage.setItem(key, JSON.stringify(newProducts));
  };
};

export const getSortedProducts = (products: Product[], sortBy: string) => {
  switch (sortBy) {
    case 'discount-value':
      return products.sort((a, b) => {
        const discountValueA = a.price * (a.discount / 100);
        const discountValueB = b.price * (b.discount / 100);

        return discountValueB - discountValueA;
      });
    case 'age':
      return products.sort((a, b) => a.age - b.age);
    case 'name':
      return products.sort((a, b) => a.name.localeCompare(b.name));
    case 'price':
      return products.sort((a, b) => {
        const finalValueA = a.price - a.price * (a.discount / 100);
        const finalValueB = b.price - b.price * (b.discount / 100);

        return finalValueA - finalValueB;
      });
    default:
      return products;
  }
};

export const capitalize = (input: string) => {
  return `${input.charAt(0).toUpperCase()}${input.slice(1).toLowerCase()}`;
};
