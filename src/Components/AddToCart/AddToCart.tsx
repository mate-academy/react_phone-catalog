import React, { useContext } from 'react';
import { Product } from '../../types/Product';
import { CartContext } from '../../context/CartContext';

import './AddToCart.scss';

type Props = {
  product: Product;
};

export const AddToCart: React.FC<Props> = ({ product }) => {
  const { cartProducts, setCartProducts } = useContext(CartContext);

  const isInCard = cartProducts.some(
    cartProduct => cartProduct.id === product.id,
  );

  const handleAddToCard = (newProduct: Product) => {
    let updatedCard: Product[];

    if (cartProducts.some(cartProduct => cartProduct.id === newProduct.id)) {
      return;
    } else {
      const productWithQuantity = { ...newProduct, quantity: 1 };

      updatedCard = [productWithQuantity, ...cartProducts];
    }

    setCartProducts(updatedCard);
  };

  return (
    <>
      {isInCard ? (
        <button
          className="button-add
          button-add__active"
          onClick={() => handleAddToCard(product)}
        >
          Added to card
        </button>
      ) : (
        <button className="button-add" onClick={() => handleAddToCard(product)}>
          Add to card
        </button>
      )}
    </>
  );
};
