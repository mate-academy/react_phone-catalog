import React, { useContext } from 'react';
import './AddToCart.scss';
import classNames from 'classnames';
import { CartContext } from '../../context/cartContext';
import { ProductContext } from '../../context/productContext';
import { FavouritesContext } from '../../context/favouritesContext';
import { Message } from '../../types/Message';
import { getProductById } from '../../utils/getProductById';

type Props = {
  productId: string;
  typeOfPage: string;
};

export const AddToCart: React.FC<Props> = ({ productId, typeOfPage }) => {
  const { products, dispatch } = useContext(ProductContext);

  const product = getProductById(products, productId);

  const { cartList, cartDispatch } = useContext(CartContext);

  const isInCart = cartList.some(item => item.itemId === productId);

  const addToCart = () => {
    if (product) {
      const newProduct = {
        ...product,
        quantity: 1,
      };

      cartDispatch({ type: 'ADD_TO_CART', payload: newProduct });
      dispatch({ type: 'setMessage', payload: Message.addToCart });
    }
  };

  const { favourites, setFavourites } = useContext(FavouritesContext);

  const isFav = favourites.some(item => item.itemId === productId);

  const handleFavClick = () => {
    if (isFav) {
      setFavourites(favourites.filter(item => item.itemId !== productId));
      dispatch({ type: 'setMessage', payload: Message.dislike });
    } else if (product) {
      setFavourites([...favourites, product]);
      dispatch({ type: 'setMessage', payload: Message.like });
    }
  };

  return (
    <div
      className={classNames('add-bttns', {
        'add-bttns-details': typeOfPage === 'productDetails',
      })}
    >
      <button
        className={classNames('add-bttns-cart', {
          'add-bttns-cart_is-added': isInCart,
          'add-bttns-cart-details': typeOfPage === 'productDetails',
        })}
        onClick={addToCart}
        disabled={isInCart}
      >
        {isInCart ? 'Added' : 'Add to cart'}
      </button>

      <button
        className={classNames('add-bttns-fav', {
          'add-bttns-fav-details': typeOfPage === 'productDetails',
        })}
        onClick={handleFavClick}
      >
        <div
          className={classNames('add-bttns-fav_add icon', {
            'add-bttns-fav_is-fav': isFav,
          })}
        />
      </button>
    </div>
  );
};
