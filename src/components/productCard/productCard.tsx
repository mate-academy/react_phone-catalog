import React from 'react';
import s from './productCard.module.scss';
import favorite from '../../modules/Navbar/NavbarImg/Vector (Stroke).svg';
import heartLike from '../../modules/Navbar/NavbarImg/Heart Like.svg';
import { CardItem } from '../../types/СardItem';
import { useFavorites } from '../Context/FavoriteContext';
import { useCart } from '../Context/CartContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  item: CardItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const { cart, toggleCart } = useCart();

  const isFav = favorites.some(fav => fav.id === item.id);
  const isInCart = cart.some(row => row.item.id === item.id);

  return (
    <div className={s.card}>
      <Link to={item.link} className={s.card__link}>
        <img src={item.img} alt={item.name} className={s.card__img} />
        <h3 className={s.card__title}>{item.name}</h3>
        <div className={s.card__price}>
          <span className={s.card__priceNew}>{item.price}$</span>
          {item.oldPrice && item.oldPrice > item.price && (
            <span className={s.card__priceOld}>{item.oldPrice}$</span>
          )}
        </div>
        <div className={s.card__text}>
          Screen
          <span className={s.card__addText}>{item.screen}</span>{' '}
        </div>
        <div className={s.card__text}>
          Capacity
          <span className={s.card__addText}>{item.capacity}</span>{' '}
        </div>
        <div className={s.card__text}>
          RAM
          <span className={s.card__addText}> {item.ram}</span>
        </div>
      </Link>
      <div className={s.card__action}>
        <button
          className={
            isInCart
              ? s.card__button + ' ' + s.card__button_added
              : s.card__button
          }
          onClick={() => toggleCart(item)}
        >
          {isInCart ? 'Added' : 'Add to cart'}
        </button>
        <button
          className={
            isFav
              ? s.card__favorite + ' ' + s.card__favorite_added
              : s.card__favorite
          }
          onClick={() => toggleFavorite(item)}
        >
          <img
            src={isFav ? heartLike : favorite}
            alt="Favorite"
            className={
              isFav ? s.favoriteImg + ' ' + s.favoriteImg_added : s.favoriteImg
            }
          />
        </button>
      </div>
    </div>
  );
};
