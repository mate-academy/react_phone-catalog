/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext } from 'react';
import classNames from 'classnames';
import { MainContext } from '../../context';
import './product-card-actions.scss';
import { Product } from '../../types/Product';
import { CartItem } from '../../types/CartItem';

type Props = {
  product: Product,
};

export const ProductCardActions: React.FC<Props> = ({ product }) => {
  const {
    cartItems,
    favoutitesItems,
    setCartItems,
    setFavouritesItems,
  } = useContext(MainContext);

  const addToCard = (selectedProduct: Product) => {
    const cartItem: CartItem = {
      id: +selectedProduct.id,
      qnty: 1,
      product: selectedProduct,
    };

    if (cartItems.some(item => item.product === selectedProduct)) {
      return;
    }

    setCartItems((prev) => [...prev, cartItem]);
  };

  const addToFavourites = (selectedProduct: Product) => {
    if (favoutitesItems.some(item => item === selectedProduct)) {
      return;
    }

    setFavouritesItems((prev) => [...prev, selectedProduct]);
  };

  return (
    <>
      <button
        type="button"
        name="add-to-card"
        className={classNames(
          'add-to-card primary__button button',
          {
            selected: cartItems.some(
              item => item.product === product,
            ),
          },
        )}
        onClick={() => addToCard(product)}
      >
        Add to cart
      </button>
      <button
        type="button"
        name="add-to-favourite"
        onClick={() => addToFavourites(product)}
        className={classNames(
          'add-to-favourite button icon',
          {
            selected: favoutitesItems.some(
              item => item === product,
            ),
          },
        )}
      />
    </>
  );
};
