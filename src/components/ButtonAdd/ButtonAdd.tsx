import React, { useContext } from 'react';
import './ButtonAdd.scss';
import { ProductsContext } from '../context/ProductsContext';
import { Product } from '../types/Product';

type Props = {
  addedProduct: Product;
};

export const ButtonAdd: React.FC<Props> = ({ addedProduct }) => {
  const { cartProducts, addToCart } = useContext(ProductsContext);
  const isAddedToCart =
    cartProducts.some(pr => pr.id === addedProduct.id) || undefined;

  return (
    <button
      disabled={isAddedToCart}
      className="button-add"
      onClick={() => addToCart(addedProduct)}
    >
      {isAddedToCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
