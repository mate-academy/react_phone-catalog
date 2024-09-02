import React, { useContext, useMemo } from 'react';
import styles from './AddToCartButton.module.scss';
import { ProductsContext } from '../../context/ProductsContext';
import { CartContext } from '../../context/CartContext';
import { Product, ProductDetailed } from '../../types/types';

interface AddToCartProps {
  product: Product | ProductDetailed;
}

export const AddToCartButton: React.FC<AddToCartProps> = ({ product }) => {
  const { goods } = useContext(ProductsContext);
  const { cartItems, updateCartItems } = useContext(CartContext);

  const matchedProduct = useMemo(() => {
    if ('itemId' in product) {
      return product;
    }
    return goods?.find(item => item.itemId === product.id) ?? null;
  }, [product, goods]);

  const handleAddToCart = () => {
    if (matchedProduct) {
      const existingItem = cartItems?.find(
        cartItem => cartItem.product?.itemId === matchedProduct.itemId,
      );

      if (!existingItem) {
        const newCartItems = cartItems
          ? [...cartItems, { product: matchedProduct, amount: 1 }]
          : [{ product: matchedProduct, amount: 1 }];
        updateCartItems(newCartItems);
      }
    }
  };

  const isProductInCart = cartItems?.some(
    cartItem => cartItem.product?.itemId === matchedProduct?.itemId,
  );

  return (
    <>
      {isProductInCart ? (
        <div className={styles.inCartStatus}>Added to cart</div>
      ) : (
        <button className={styles.addToCartButton} onClick={handleAddToCart}>
          Add to cart
        </button>
      )}
    </>
  );
};
