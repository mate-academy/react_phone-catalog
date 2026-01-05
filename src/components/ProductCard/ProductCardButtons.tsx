import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import vaforiteImg from './../../images/icons/Favourites (Heart Like).svg';
import vaforiteImgSelected from './../../images/icons/Favourites (Heart Like)_2.svg';
import { useCartFavorite } from '../../context/CartFavoriteContext';
import { ProductAllType } from '../../types/Product';

type Props = {
  product: ProductAllType;
};

export const ProductCardButtons: FC<Props> = ({ product }) => {
  const [isAddToCart, setIsAddToCart] = useState<boolean>(false);
  const [isAddToFavorite, setIsAddToFavorite] = useState<boolean>(false);

  const { toggleFavorite, addToCart, cartItems, favoriteItems } =
    useCartFavorite();

  useEffect(() => {
    const isInFavorite = favoriteItems.find(item => item.id === product.id);
    setIsAddToFavorite(!!isInFavorite);

    const isInCart = cartItems.find(item => item.id === product.id);
    setIsAddToCart(!!isInCart);
  }, [favoriteItems, cartItems]);

  const handleAddToCard = () => {
    setIsAddToCart(true);
    addToCart(product);
    console.log(cartItems);
  };

  const handleToggleFavorite = () => {
    setIsAddToFavorite(prev => !prev);
    toggleFavorite(product);
  };

  return (
    <div className="card__buttons">
      <button
        onClick={() => handleAddToCard()}
        className={classNames('card__add', {
          card__add_selected: isAddToCart,
        })}
      >
        {isAddToCart ? 'Added' : 'Add to cart'}
      </button>
      <button
        className="card__favorite card__favorite_selected"
        onClick={() => handleToggleFavorite()}
      >
        {isAddToFavorite ? (
          <img src={vaforiteImgSelected} alt="" />
        ) : (
          <img src={vaforiteImg} alt="" />
        )}
      </button>
    </div>
  );
};
