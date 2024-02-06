/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext } from 'react';
import { MainContext } from '../../context';
import './product-card-actions.scss';
import { Product } from '../../types/Product';
import { CartItem } from '../../types/CartItem';

type Props = {
  product: Product,
};

export const ProductCardActions: React.FC<Props> = ({ product }) => {
  const {
    setCartItems,
    setFavouritesItems,
  } = useContext(MainContext);

  const addToCard = (selectedProduct: Product) => {
    const cartItem: CartItem = {
      id: +selectedProduct.id,
      qnty: 1,
      product: selectedProduct,
    };

    setCartItems((prev) => {
      return [...prev, cartItem];
    });
  };

  const addToFavourites = (selectedProduct: Product) => {
    setFavouritesItems((prev) => {
      return [...prev, selectedProduct];
    });
  };

  return (
    <>
      <button
        type="button"
        className="add-to-card primary__button button"
        onClick={() => addToCard(product)}
      >
        Add to cart
      </button>
      <button
        type="button"
        className="add-to-favourite button icon"
        onClick={() => addToFavourites(product)}
      />
    </>
  );
};
